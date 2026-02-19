---
title: Module sui::borrow
sidebar_label: borrow
---

hot-potato-locked borrow 메커니즘을 제공하는 간단한 라이브러리이다.

Programmable transactions에서는
transaction 내에서 값을 빌려 사용하고 마지막에 되돌려 놓을 수 있다.
hot-potato <code><a href="../sui_sui/borrow#sui_borrow_Borrow">Borrow</a></code>는
object가 반환되었고 다른 object로 바꿔치기되지 않았음을 보장한다.


-  [Struct `Referent`](#sui_borrow_Referent)
-  [Struct `Borrow`](#sui_borrow_Borrow)
-  [Constants](#@Constants_0)
-  [Function `new`](#sui_borrow_new)
-  [Function `borrow`](#sui_borrow_borrow)
-  [Function `put_back`](#sui_borrow_put_back)
-  [Function `destroy`](#sui_borrow_destroy)


<pre><code><b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/bcs#std_bcs">std::bcs</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/string#std_string">std::string</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
<b>use</b> <a href="../sui_sui/address#sui_address">sui::address</a>;
<b>use</b> <a href="../sui_sui/hex#sui_hex">sui::hex</a>;
<b>use</b> <a href="../sui_sui/object#sui_object">sui::object</a>;
<b>use</b> <a href="../sui_sui/tx_context#sui_tx_context">sui::tx_context</a>;
</code></pre>



<h2 id="sui_borrow_Referent">Struct <code>Referent</code></h2>

<code>T</code>를 감싸고 borrow API를 제공하는 object이다.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/borrow#sui_borrow_Referent">Referent</a>&lt;T: key, store&gt; <b>has</b> store
</code></pre>



<details>
<summary>Fields</summary>


<dl>
<dt>
<code>id: <b>address</b></code>
</dt>
<dd>
</dd>
<dt>
<code>value: <a href="../sui_std/option#std_option_Option">std::option::Option</a>&lt;T&gt;</code>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_borrow_Borrow">Struct <code>Borrow</code></h2>

object를 빌린 뒤 반드시 되돌려 놓게 하는 hot potato이다.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/borrow#sui_borrow_Borrow">Borrow</a>
</code></pre>



<details>
<summary>Fields</summary>


<dl>
<dt>
<code>ref: <b>address</b></code>
</dt>
<dd>
</dd>
<dt>
<code>obj: <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a></code>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

<code><a href="../sui_sui/borrow#sui_borrow_Borrow">Borrow</a></code>가 <code><a href="../sui_sui/borrow#sui_borrow_Referent">Referent</a></code>와 일치하지 않는다.


<pre><code><b>const</b> <a href="../sui_sui/borrow#sui_borrow_EWrongBorrow">EWrongBorrow</a>: u64 = 0;
</code></pre>

<code><a href="../sui_sui/borrow#sui_borrow_Referent">Referent</a>.value</code>를 같은 타입의 다른 object로 바꿔치기하려는 시도이다.


<pre><code><b>const</b> <a href="../sui_sui/borrow#sui_borrow_EWrongValue">EWrongValue</a>: u64 = 1;
</code></pre>



<h2 id="sui_borrow_new">Function <code>new</code></h2>

새 <code><a href="../sui_sui/borrow#sui_borrow_Referent">Referent</a></code> struct를 생성한다.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/borrow#sui_borrow_new">new</a>&lt;T: key, store&gt;(value: T, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/borrow#sui_borrow_Referent">sui::borrow::Referent</a>&lt;T&gt;
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/borrow#sui_borrow_new">new</a>&lt;T: key + store&gt;(value: T, ctx: &<b>mut</b> TxContext): <a href="../sui_sui/borrow#sui_borrow_Referent">Referent</a>&lt;T&gt; {
    <a href="../sui_sui/borrow#sui_borrow_Referent">Referent</a> {
        id: ctx.fresh_object_address(),
        value: option::some(value),
    }
}
</code></pre>



</details>

<h2 id="sui_borrow_borrow">Function <code>borrow</code></h2>

<code><a href="../sui_sui/borrow#sui_borrow_Referent">Referent</a></code>에서 <code>T</code>를 빌리고, <code>T</code>와 <code><a href="../sui_sui/borrow#sui_borrow_Borrow">Borrow</a></code>
hot potato를 받는다.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/borrow#sui_borrow">borrow</a>&lt;T: key, store&gt;(self: &<b>mut</b> <a href="../sui_sui/borrow#sui_borrow_Referent">sui::borrow::Referent</a>&lt;T&gt;): (T, <a href="../sui_sui/borrow#sui_borrow_Borrow">sui::borrow::Borrow</a>)
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/borrow#sui_borrow">borrow</a>&lt;T: key + store&gt;(self: &<b>mut</b> <a href="../sui_sui/borrow#sui_borrow_Referent">Referent</a>&lt;T&gt;): (T, <a href="../sui_sui/borrow#sui_borrow_Borrow">Borrow</a>) {
    <b>let</b> value = self.value.extract();
    <b>let</b> id = <a href="../sui_sui/object#sui_object_id">object::id</a>(&value);
    (
        value,
        <a href="../sui_sui/borrow#sui_borrow_Borrow">Borrow</a> {
            ref: self.id,
            obj: id,
        },
    )
}
</code></pre>



</details>

<h2 id="sui_borrow_put_back">Function <code>put_back</code></h2>

object와 <code><a href="../sui_sui/borrow#sui_borrow_Borrow">Borrow</a></code> hot potato를 되돌려 놓는다.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/borrow#sui_borrow_put_back">put_back</a>&lt;T: key, store&gt;(self: &<b>mut</b> <a href="../sui_sui/borrow#sui_borrow_Referent">sui::borrow::Referent</a>&lt;T&gt;, value: T, <a href="../sui_sui/borrow#sui_borrow">borrow</a>: <a href="../sui_sui/borrow#sui_borrow_Borrow">sui::borrow::Borrow</a>)
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/borrow#sui_borrow_put_back">put_back</a>&lt;T: key + store&gt;(self: &<b>mut</b> <a href="../sui_sui/borrow#sui_borrow_Referent">Referent</a>&lt;T&gt;, value: T, <a href="../sui_sui/borrow#sui_borrow">borrow</a>: <a href="../sui_sui/borrow#sui_borrow_Borrow">Borrow</a>) {
    <b>let</b> <a href="../sui_sui/borrow#sui_borrow_Borrow">Borrow</a> { ref, obj } = <a href="../sui_sui/borrow#sui_borrow">borrow</a>;
    <b>assert</b>!(<a href="../sui_sui/object#sui_object_id">object::id</a>(&value) == obj, <a href="../sui_sui/borrow#sui_borrow_EWrongValue">EWrongValue</a>);
    <b>assert</b>!(self.id == ref, <a href="../sui_sui/borrow#sui_borrow_EWrongBorrow">EWrongBorrow</a>);
    self.value.fill(value);
}
</code></pre>



</details>

<h2 id="sui_borrow_destroy">Function <code>destroy</code></h2>

<code><a href="../sui_sui/borrow#sui_borrow_Referent">Referent</a></code> struct를 해체하고 값을 반환한다.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/borrow#sui_borrow_destroy">destroy</a>&lt;T: key, store&gt;(self: <a href="../sui_sui/borrow#sui_borrow_Referent">sui::borrow::Referent</a>&lt;T&gt;): T
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/borrow#sui_borrow_destroy">destroy</a>&lt;T: key + store&gt;(self: <a href="../sui_sui/borrow#sui_borrow_Referent">Referent</a>&lt;T&gt;): T {
    <b>let</b> <a href="../sui_sui/borrow#sui_borrow_Referent">Referent</a> { id: _, value } = self;
    value.destroy_some()
}
</code></pre>



</details>
