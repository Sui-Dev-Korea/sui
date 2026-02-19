---
title: Module sui::sui
sidebar_label: sui
---

Coin<SUI>는 Sui에서 가스를 지불하는 데 사용되는 토큰이다.
9개의 소수 자릿수를 가지며, 최소 단위(10^-9)는 "mist"라고 한다.


-  [Struct `SUI`](#sui_sui_SUI)
-  [Constants](#@Constants_0)
-  [Function `new`](#sui_sui_new)
-  [Function `transfer`](#sui_sui_transfer)


<pre><code><b>use</b> <a href="../sui_std/address#std_address">std::address</a>;
<b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/bcs#std_bcs">std::bcs</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/string#std_string">std::string</a>;
<b>use</b> <a href="../sui_std/type_name#std_type_name">std::type_name</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
<b>use</b> <a href="../sui_sui/accumulator#sui_accumulator">sui::accumulator</a>;
<b>use</b> <a href="../sui_sui/address#sui_address">sui::address</a>;
<b>use</b> <a href="../sui_sui/bag#sui_bag">sui::bag</a>;
<b>use</b> <a href="../sui_sui/balance#sui_balance">sui::balance</a>;
<b>use</b> <a href="../sui_sui/coin#sui_coin">sui::coin</a>;
<b>use</b> <a href="../sui_sui/config#sui_config">sui::config</a>;
<b>use</b> <a href="../sui_sui/deny_list#sui_deny_list">sui::deny_list</a>;
<b>use</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field">sui::dynamic_field</a>;
<b>use</b> <a href="../sui_sui/dynamic_object_field#sui_dynamic_object_field">sui::dynamic_object_field</a>;
<b>use</b> <a href="../sui_sui/event#sui_event">sui::event</a>;
<b>use</b> <a href="../sui_sui/hex#sui_hex">sui::hex</a>;
<b>use</b> <a href="../sui_sui/object#sui_object">sui::object</a>;
<b>use</b> <a href="../sui_sui/party#sui_party">sui::party</a>;
<b>use</b> <a href="../sui_sui/table#sui_table">sui::table</a>;
<b>use</b> <a href="../sui_sui/transfer#sui_transfer">sui::transfer</a>;
<b>use</b> <a href="../sui_sui/tx_context#sui_tx_context">sui::tx_context</a>;
<b>use</b> <a href="../sui_sui/types#sui_types">sui::types</a>;
<b>use</b> <a href="../sui_sui/url#sui_url">sui::url</a>;
<b>use</b> <a href="../sui_sui/vec_map#sui_vec_map">sui::vec_map</a>;
<b>use</b> <a href="../sui_sui/vec_set#sui_vec_set">sui::vec_set</a>;
</code></pre>



<h2 id="sui_sui_SUI">Struct <code>SUI</code></h2>

코인의 이름이다.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/sui#sui_sui_SUI">SUI</a> <b>has</b> drop
</code></pre>



<details>
<summary>Fields</summary>


<dl>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

<pre><code><b>const</b> <a href="../sui_sui/sui#sui_sui_EAlreadyMinted">EAlreadyMinted</a>: u64 = 0;
</code></pre>

sender가 system address인 @0x0이 아니면 발생하는 오류이다.


<pre><code><b>const</b> <a href="../sui_sui/sui#sui_sui_ENotSystemAddress">ENotSystemAddress</a>: u64 = 1;
</code></pre>

mist가 Sui 토큰의
10^-9이라는 사실에 기반한 Sui 토큰당 Mist 양이다.


<pre><code><b>const</b> <a href="../sui_sui/sui#sui_sui_MIST_PER_SUI">MIST_PER_SUI</a>: u64 = 1000000000;
</code></pre>

전체 Sui 공급량을 전체 Sui 토큰 단위(100억)로 나타낸 값이다.


<pre><code><b>const</b> <a href="../sui_sui/sui#sui_sui_TOTAL_SUPPLY_SUI">TOTAL_SUPPLY_SUI</a>: u64 = 10000000000;
</code></pre>

전체 Sui 공급량을 Mist 단위(100억 * 10^9)로 나타낸 값이다.


<pre><code><b>const</b> <a href="../sui_sui/sui#sui_sui_TOTAL_SUPPLY_MIST">TOTAL_SUPPLY_MIST</a>: u64 = 10000000000000000000;
</code></pre>



<h2 id="sui_sui_new">Function <code>new</code></h2>

<code><a href="../sui_sui/sui#sui_sui_SUI">SUI</a></code> Coin을 등록하여 해당 <code>Supply</code>를 획득한다.
이 함수는 genesis 생성 중 한 번만 호출되어야 한다.


<pre><code><b>fun</b> <a href="../sui_sui/sui#sui_sui_new">new</a>(ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>fun</b> <a href="../sui_sui/sui#sui_sui_new">new</a>(ctx: &<b>mut</b> TxContext): Balance&lt;<a href="../sui_sui/sui#sui_sui_SUI">SUI</a>&gt; {
    <b>assert</b>!(ctx.sender() == @0x0, <a href="../sui_sui/sui#sui_sui_ENotSystemAddress">ENotSystemAddress</a>);
    <b>assert</b>!(ctx.epoch() == 0, <a href="../sui_sui/sui#sui_sui_EAlreadyMinted">EAlreadyMinted</a>);
    <b>let</b> (treasury, metadata) = <a href="../sui_sui/coin#sui_coin_create_currency">coin::create_currency</a>(
        <a href="../sui_sui/sui#sui_sui_SUI">SUI</a> {},
        9,
        b"<a href="../sui_sui/sui#sui_sui_SUI">SUI</a>",
        b"Sui",
        // TODO: 적절한 설명과 로고 <a href="../sui_sui/url#sui_url">url</a>을 추가한다.
        b"",
        option::none(),
        ctx,
    );
    <a href="../sui_sui/transfer#sui_transfer_public_freeze_object">transfer::public_freeze_object</a>(metadata);
    <b>let</b> <b>mut</b> supply = treasury.treasury_into_supply();
    <b>let</b> total_sui = supply.increase_supply(<a href="../sui_sui/sui#sui_sui_TOTAL_SUPPLY_MIST">TOTAL_SUPPLY_MIST</a>);
    supply.destroy_supply();
    total_sui
}
</code></pre>



</details>

<h2 id="sui_sui_transfer">Function <code>transfer</code></h2>



<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui/transfer#sui_transfer">transfer</a>(c: <a href="../sui_sui/coin#sui_coin_Coin">sui::coin::Coin</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;, recipient: <b>address</b>)
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>entry</b> <b>fun</b> <a href="../sui_sui/transfer#sui_transfer">transfer</a>(c: <a href="../sui_sui/coin#sui_coin_Coin">coin::Coin</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">SUI</a>&gt;, recipient: <b>address</b>) {
    <a href="../sui_sui/transfer#sui_transfer_public_transfer">transfer::public_transfer</a>(c, recipient)
}
</code></pre>



</details>
