---
title: Module sui::accumulator_settlement
sidebar_label: accumulator_settlement
---



-  [Constants](#@Constants_0)
-  [Function `settlement_prologue`](#sui_accumulator_settlement_settlement_prologue)
-  [Function `settle_u128`](#sui_accumulator_settlement_settle_u128)
-  [Function `record_settlement_sui_conservation`](#sui_accumulator_settlement_record_settlement_sui_conservation)


<pre><code><b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/bcs#std_bcs">std::bcs</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/string#std_string">std::string</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
<b>use</b> <a href="../sui_sui/accumulator#sui_accumulator">sui::accumulator</a>;
<b>use</b> <a href="../sui_sui/accumulator_metadata#sui_accumulator_metadata">sui::accumulator_metadata</a>;
<b>use</b> <a href="../sui_sui/address#sui_address">sui::address</a>;
<b>use</b> <a href="../sui_sui/bag#sui_bag">sui::bag</a>;
<b>use</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field">sui::dynamic_field</a>;
<b>use</b> <a href="../sui_sui/hex#sui_hex">sui::hex</a>;
<b>use</b> <a href="../sui_sui/object#sui_object">sui::object</a>;
<b>use</b> <a href="../sui_sui/party#sui_party">sui::party</a>;
<b>use</b> <a href="../sui_sui/transfer#sui_transfer">sui::transfer</a>;
<b>use</b> <a href="../sui_sui/tx_context#sui_tx_context">sui::tx_context</a>;
<b>use</b> <a href="../sui_sui/vec_map#sui_vec_map">sui::vec_map</a>;
</code></pre>



<h2 id="@Constants_0">Constants</h2>

<pre><code><b>const</b> <a href="../sui_sui/accumulator_settlement#sui_accumulator_settlement_ENotSystemAddress">ENotSystemAddress</a>: u64 = 0;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui/accumulator_settlement#sui_accumulator_settlement_EInvalidSplitAmount">EInvalidSplitAmount</a>: u64 = 1;
</code></pre>



<h2 id="sui_accumulator_settlement_settlement_prologue">Function <code>settlement_prologue</code></h2>

settlement transaction이 고유한
digest를 갖도록 보장하기 위해 settlement transaction에서 호출된다.


<pre><code><b>fun</b> <a href="../sui_sui/accumulator_settlement#sui_accumulator_settlement_settlement_prologue">settlement_prologue</a>(_epoch: u64, _checkpoint_height: u64, _idx: u64, input_sui: u64, output_sui: u64, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>fun</b> <a href="../sui_sui/accumulator_settlement#sui_accumulator_settlement_settlement_prologue">settlement_prologue</a>(
    _epoch: u64,
    _checkpoint_height: u64,
    _idx: u64,
    // 사용자 transaction에서 수신한 총 입력 <a href="../sui_sui/sui#sui_sui">sui</a>
    input_sui: u64,
    // 사용자 transaction에서 인출한 총 출력 <a href="../sui_sui/sui#sui_sui">sui</a>
    output_sui: u64,
    ctx: &TxContext,
) {
    <b>assert</b>!(ctx.sender() == @0x0, <a href="../sui_sui/accumulator_settlement#sui_accumulator_settlement_ENotSystemAddress">ENotSystemAddress</a>);
    <a href="../sui_sui/accumulator_settlement#sui_accumulator_settlement_record_settlement_sui_conservation">record_settlement_sui_conservation</a>(input_sui, output_sui);
}
</code></pre>



</details>

<h2 id="sui_accumulator_settlement_settle_u128">Function <code>settle_u128</code></h2>



<pre><code><b>fun</b> <a href="../sui_sui/accumulator_settlement#sui_accumulator_settlement_settle_u128">settle_u128</a>&lt;T&gt;(accumulator_root: &<b>mut</b> <a href="../sui_sui/accumulator#sui_accumulator_AccumulatorRoot">sui::accumulator::AccumulatorRoot</a>, owner: <b>address</b>, merge: u128, split: u128, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>fun</b> <a href="../sui_sui/accumulator_settlement#sui_accumulator_settlement_settle_u128">settle_u128</a>&lt;T&gt;(
    accumulator_root: &<b>mut</b> AccumulatorRoot,
    owner: <b>address</b>,
    merge: u128,
    split: u128,
    ctx: &<b>mut</b> TxContext,
) {
    <b>assert</b>!(ctx.sender() == @0x0, <a href="../sui_sui/accumulator_settlement#sui_accumulator_settlement_ENotSystemAddress">ENotSystemAddress</a>);
    // 이 함수를 호출하기 전에 merge와 split은 상계되어 있어야 한다.
    <b>assert</b>!((merge == 0 ) != (split == 0), <a href="../sui_sui/accumulator_settlement#sui_accumulator_settlement_EInvalidSplitAmount">EInvalidSplitAmount</a>);
    <b>let</b> name = accumulator_key&lt;T&gt;(owner);
    <b>if</b> (accumulator_root.has_accumulator&lt;T, U128&gt;(name)) {
        <b>let</b> is_zero = {
            <b>let</b> value: &<b>mut</b> U128 = accumulator_root.borrow_accumulator_mut(name);
            value.update(merge, split);
            value.is_zero()
        };
        <b>if</b> (is_zero) {
            <b>let</b> value = accumulator_root.remove_accumulator&lt;T, U128&gt;(name);
            destroy_u128(value);
            accumulator_root.remove_metadata&lt;T&gt;(owner);
        }
    } <b>else</b> {
        // 필드가 아직 존재하지 않으면 split할 수 없다.
        <b>assert</b>!(split == 0, <a href="../sui_sui/accumulator_settlement#sui_accumulator_settlement_EInvalidSplitAmount">EInvalidSplitAmount</a>);
        <b>let</b> value = create_u128(merge);
        accumulator_root.add_accumulator(name, value);
        accumulator_root.create_metadata&lt;T&gt;(owner, ctx);
    };
}
</code></pre>



</details>

<h2 id="sui_accumulator_settlement_record_settlement_sui_conservation">Function <code>record_settlement_sui_conservation</code></h2>

SUI 보존을 추적하기 위해 settlement transaction에서 호출된다.


<pre><code><b>fun</b> <a href="../sui_sui/accumulator_settlement#sui_accumulator_settlement_record_settlement_sui_conservation">record_settlement_sui_conservation</a>(input_sui: u64, output_sui: u64)
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>native</b> <b>fun</b> <a href="../sui_sui/accumulator_settlement#sui_accumulator_settlement_record_settlement_sui_conservation">record_settlement_sui_conservation</a>(input_sui: u64, output_sui: u64);
</code></pre>



</details>
