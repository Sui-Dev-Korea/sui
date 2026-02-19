---
title: Module sui::derived_object
sidebar_label: derived_object
---

부모 object의 UID에서 파생된 결정적 address를 갖는 object 생성 기능을 제공한다.
이 모듈은 부모 UID와 key를 기반으로 예측 가능한 address를 갖는 object를 생성하는 방법을 제공하며, 각 부모-key 조합의 고유성을 보장하는 네임스페이스를 생성하는데,
이는 보통 registry를 구축하는 방식이다.

주요 기능:
- 부모 object UID와 key 기반의 결정적 address 생성
- 파생 object는 부모와 독립적으로 존재하고 동작할 수 있음

생성된 파생 UID는 일단 생성되면 독립적이며 부모
object에서 sequencing을 요구하지 않는다.
부모에 영향을 주지 않고 사용할 수 있다.
부모는 중복을 방지하기 위해 어떤 파생 address가 claim되었는지의 기록만 유지한다.


-  [Struct `Claimed`](#sui_derived_object_Claimed)
-  [Struct `DerivedObjectKey`](#sui_derived_object_DerivedObjectKey)
-  [Enum `ClaimedStatus`](#sui_derived_object_ClaimedStatus)
-  [Constants](#@Constants_0)
-  [Function `claim`](#sui_derived_object_claim)
-  [Function `exists`](#sui_derived_object_exists)
-  [Function `derive_address`](#sui_derived_object_derive_address)


<pre><code><b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/bcs#std_bcs">std::bcs</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/string#std_string">std::string</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
<b>use</b> <a href="../sui_sui/address#sui_address">sui::address</a>;
<b>use</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field">sui::dynamic_field</a>;
<b>use</b> <a href="../sui_sui/hex#sui_hex">sui::hex</a>;
<b>use</b> <a href="../sui_sui/object#sui_object">sui::object</a>;
<b>use</b> <a href="../sui_sui/tx_context#sui_tx_context">sui::tx_context</a>;
</code></pre>



<h2 id="sui_derived_object_Claimed">Struct <code>Claimed</code></h2>

ID가 claim되었음을 표시하기 위해 부모 UID의 DF로 추가된다.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/derived_object#sui_derived_object_Claimed">Claimed</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>



<details>
<summary>Fields</summary>


<dl>
<dt>
<code>0: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a></code>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_derived_object_DerivedObjectKey">Struct <code>DerivedObjectKey</code></h2>

같은 UID를 두 번 생성하는 것(예: DF와 충돌)을 방지하기 위한 내부 key이다.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/derived_object#sui_derived_object_DerivedObjectKey">DerivedObjectKey</a>&lt;K: <b>copy</b>, drop, store&gt; <b>has</b> <b>copy</b>, drop, store
</code></pre>



<details>
<summary>Fields</summary>


<dl>
<dt>
<code>0: K</code>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_derived_object_ClaimedStatus">Enum <code>ClaimedStatus</code></h2>

claim된 UID의 가능한 값이다.
향후 업그레이드 용이성을 위해 enum으로 만든다.


<pre><code><b>public</b> <b>enum</b> <a href="../sui_sui/derived_object#sui_derived_object_ClaimedStatus">ClaimedStatus</a> <b>has</b> store
</code></pre>



<details>
<summary>Variants</summary>


<dl>
<dt>
Variant <code>Reserved</code>
</dt>
<dd>
 UID가 claim되었고 다시 claim하거나 사용할 수 없다.
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

동일한 부모-key 조합으로 object를 두 번 생성하려고 시도한다.


<pre><code>#[error]
<b>const</b> <a href="../sui_sui/derived_object#sui_derived_object_EObjectAlreadyExists">EObjectAlreadyExists</a>: vector&lt;u8&gt; = b"Derived <a href="../sui_sui/object#sui_object">object</a> is already claimed.";
</code></pre>



<h2 id="sui_derived_object_claim">Function <code>claim</code></h2>

부모 UID와 임의 key를 사용해 결정적 UID를 claim한다.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/derived_object#sui_derived_object_claim">claim</a>&lt;K: <b>copy</b>, drop, store&gt;(parent: &<b>mut</b> <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, key: K): <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/derived_object#sui_derived_object_claim">claim</a>&lt;K: <b>copy</b> + drop + store&gt;(parent: &<b>mut</b> UID, key: K): UID {
    <b>let</b> addr = <a href="../sui_sui/derived_object#sui_derived_object_derive_address">derive_address</a>(parent.to_inner(), key);
    <b>let</b> id = addr.to_id();
    <b>assert</b>!(!df::exists_(parent, <a href="../sui_sui/derived_object#sui_derived_object_Claimed">Claimed</a>(id)), <a href="../sui_sui/derived_object#sui_derived_object_EObjectAlreadyExists">EObjectAlreadyExists</a>);
    df::add(parent, <a href="../sui_sui/derived_object#sui_derived_object_Claimed">Claimed</a>(id), ClaimedStatus::Reserved);
    <a href="../sui_sui/object#sui_object_new_uid_from_hash">object::new_uid_from_hash</a>(addr)
}
</code></pre>



</details>

<h2 id="sui_derived_object_exists">Function <code>exists</code></h2>

주어진 부모에 대해 제공된 <code>key</code>가 claim되었는지 검사한다.
참고: UID가 <code><a href="../sui_sui/object#sui_object_delete">object::delete</a></code>로 삭제된 경우 이 함수는 항상 true를 반환한다.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/derived_object#sui_derived_object_exists">exists</a>&lt;K: <b>copy</b>, drop, store&gt;(parent: &<a href="../sui_sui/object#sui_object_UID">sui::object::UID</a>, key: K): bool
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/derived_object#sui_derived_object_exists">exists</a>&lt;K: <b>copy</b> + drop + store&gt;(parent: &UID, key: K): bool {
    <b>let</b> addr = <a href="../sui_sui/derived_object#sui_derived_object_derive_address">derive_address</a>(parent.to_inner(), key);
    df::exists_(parent, <a href="../sui_sui/derived_object#sui_derived_object_Claimed">Claimed</a>(addr.to_id()))
}
</code></pre>



</details>

<h2 id="sui_derived_object_derive_address">Function <code>derive_address</code></h2>

ID와 Key가 주어지면 파생 address를 계산한다.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/derived_object#sui_derived_object_derive_address">derive_address</a>&lt;K: <b>copy</b>, drop, store&gt;(parent: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>, key: K): <b>address</b>
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/derived_object#sui_derived_object_derive_address">derive_address</a>&lt;K: <b>copy</b> + drop + store&gt;(parent: ID, key: K): <b>address</b> {
    df::hash_type_and_key(parent.to_address(), <a href="../sui_sui/derived_object#sui_derived_object_DerivedObjectKey">DerivedObjectKey</a>(key))
}
</code></pre>



</details>
