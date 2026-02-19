---
title: Module sui::clock
sidebar_label: clock
---

<code><a href="../sui_sui/clock#sui_clock_Clock">Clock</a></code>를 통해 move call에서 시간에 접근하는 API이다.
<code><a href="../sui_sui/clock#sui_clock_Clock">Clock</a></code>은 genesis 중 0x6에서 생성되는 고유 shared object이다.


-  [Struct `Clock`](#sui_clock_Clock)
-  [Constants](#@Constants_0)
-  [Function `timestamp_ms`](#sui_clock_timestamp_ms)
-  [Function `create`](#sui_clock_create)
-  [Function `consensus_commit_prologue`](#sui_clock_consensus_commit_prologue)


<pre><code><b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/bcs#std_bcs">std::bcs</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/string#std_string">std::string</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
<b>use</b> <a href="../sui_sui/address#sui_address">sui::address</a>;
<b>use</b> <a href="../sui_sui/hex#sui_hex">sui::hex</a>;
<b>use</b> <a href="../sui_sui/object#sui_object">sui::object</a>;
<b>use</b> <a href="../sui_sui/party#sui_party">sui::party</a>;
<b>use</b> <a href="../sui_sui/transfer#sui_transfer">sui::transfer</a>;
<b>use</b> <a href="../sui_sui/tx_context#sui_tx_context">sui::tx_context</a>;
<b>use</b> <a href="../sui_sui/vec_map#sui_vec_map">sui::vec_map</a>;
</code></pre>



<h2 id="sui_clock_Clock">Struct <code>Clock</code></h2>

Move call에 시간을 노출하는 싱글턴 shared object이다.
이 object는 주소 0x6에 있으며 entry 함수에서는
immutable reference를 통해 읽기 전용으로만 접근할 수 있다.

<code><a href="../sui_sui/clock#sui_clock_Clock">Clock</a></code>을 mutable
reference 또는 값으로 받으려는 entry 함수는 검증에 실패하며 정직한 validator는
immutable reference로 전달된 경우가 아니면 <code><a href="../sui_sui/clock#sui_clock_Clock">Clock</a></code>을
입력 매개변수로 사용하는 transaction에 서명하거나 실행하지 않는다.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/clock#sui_clock_Clock">Clock</a> <b>has</b> key
</code></pre>



<details>
<summary>Fields</summary>


<dl>
<dt>
<code>id: <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a></code>
</dt>
<dd>
</dd>
<dt>
<code><a href="../sui_sui/clock#sui_clock_timestamp_ms">timestamp_ms</a>: u64</code>
</dt>
<dd>
 clock의 timestamp이며,
 합의가 schedule을 커밋할 때마다 system
 transaction으로 자동 설정되거나 testing 중에는
 <code>sui::clock::increment_for_testing</code>으로 설정된다.
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

sender가 system address인 @0x0이 아니면 발생하는 오류이다.


<pre><code><b>const</b> <a href="../sui_sui/clock#sui_clock_ENotSystemAddress">ENotSystemAddress</a>: u64 = 0;
</code></pre>



<h2 id="sui_clock_timestamp_ms">Function <code>timestamp_ms</code></h2>

<code><a href="../sui_sui/clock#sui_clock">clock</a></code>의 현재 timestamp를 과거 임의 시점을 기준으로 한
밀리초 누적 합계로 반환한다.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/clock#sui_clock_timestamp_ms">timestamp_ms</a>(<a href="../sui_sui/clock#sui_clock">clock</a>: &<a href="../sui_sui/clock#sui_clock_Clock">sui::clock::Clock</a>): u64
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/clock#sui_clock_timestamp_ms">timestamp_ms</a>(<a href="../sui_sui/clock#sui_clock">clock</a>: &<a href="../sui_sui/clock#sui_clock_Clock">Clock</a>): u64 {
    <a href="../sui_sui/clock#sui_clock">clock</a>.<a href="../sui_sui/clock#sui_clock_timestamp_ms">timestamp_ms</a>
}
</code></pre>



</details>

<h2 id="sui_clock_create">Function <code>create</code></h2>

싱글턴 Clock을 생성하고 공유하는 함수이며 이 함수는
genesis 동안 정확히 한 번 호출된다.


<pre><code><b>fun</b> <a href="../sui_sui/clock#sui_clock_create">create</a>(ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>fun</b> <a href="../sui_sui/clock#sui_clock_create">create</a>(ctx: &TxContext) {
    <b>assert</b>!(ctx.sender() == @0x0, <a href="../sui_sui/clock#sui_clock_ENotSystemAddress">ENotSystemAddress</a>);
    <a href="../sui_sui/transfer#sui_transfer_share_object">transfer::share_object</a>(<a href="../sui_sui/clock#sui_clock_Clock">Clock</a> {
        id: <a href="../sui_sui/object#sui_object_clock">object::clock</a>(),
        // 0으로 초기화되지만, <b>move</b> call에서 관측되기 전에
        // system transaction으로 실제 timestamp로 설정된다.
        <a href="../sui_sui/clock#sui_clock_timestamp_ms">timestamp_ms</a>: 0,
    })
}
</code></pre>



</details>

<h2 id="sui_clock_consensus_commit_prologue">Function <code>consensus_commit_prologue</code></h2>



<pre><code><b>fun</b> <a href="../sui_sui/clock#sui_clock_consensus_commit_prologue">consensus_commit_prologue</a>(<a href="../sui_sui/clock#sui_clock">clock</a>: &<b>mut</b> <a href="../sui_sui/clock#sui_clock_Clock">sui::clock::Clock</a>, <a href="../sui_sui/clock#sui_clock_timestamp_ms">timestamp_ms</a>: u64, ctx: &<a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>)
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>fun</b> <a href="../sui_sui/clock#sui_clock_consensus_commit_prologue">consensus_commit_prologue</a>(<a href="../sui_sui/clock#sui_clock">clock</a>: &<b>mut</b> <a href="../sui_sui/clock#sui_clock_Clock">Clock</a>, <a href="../sui_sui/clock#sui_clock_timestamp_ms">timestamp_ms</a>: u64, ctx: &TxContext) {
    // Validator는 sender를 0x0으로 설정한 특수 system call을 수행한다.
    <b>assert</b>!(ctx.sender() == @0x0, <a href="../sui_sui/clock#sui_clock_ENotSystemAddress">ENotSystemAddress</a>);
    <a href="../sui_sui/clock#sui_clock">clock</a>.<a href="../sui_sui/clock#sui_clock_timestamp_ms">timestamp_ms</a> = <a href="../sui_sui/clock#sui_clock_timestamp_ms">timestamp_ms</a>
}
</code></pre>



</details>
