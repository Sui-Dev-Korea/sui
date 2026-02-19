---
title: Module sui::url
sidebar_label: url
---

URL: 표준 Uniform Resource Locator 문자열이다.


-  [Struct `Url`](#sui_url_Url)
-  [Function `new_unsafe`](#sui_url_new_unsafe)
-  [Function `new_unsafe_from_bytes`](#sui_url_new_unsafe_from_bytes)
-  [Function `inner_url`](#sui_url_inner_url)
-  [Function `update`](#sui_url_update)


<pre><code><b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
</code></pre>



<h2 id="sui_url_Url">Struct <code>Url</code></h2>

표준 Uniform Resource Locator(URL) 문자열이다.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui/url#sui_url_Url">Url</a> <b>has</b> <b>copy</b>, drop, store
</code></pre>



<details>
<summary>Fields</summary>


<dl>
<dt>
<code><a href="../sui_sui/url#sui_url">url</a>: <a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a></code>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_url_new_unsafe">Function <code>new_unsafe</code></h2>

검증 없이 <code><a href="../sui_sui/url#sui_url_Url">Url</a></code>을 생성한다.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/url#sui_url_new_unsafe">new_unsafe</a>(<a href="../sui_sui/url#sui_url">url</a>: <a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>): <a href="../sui_sui/url#sui_url_Url">sui::url::Url</a>
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/url#sui_url_new_unsafe">new_unsafe</a>(<a href="../sui_sui/url#sui_url">url</a>: String): <a href="../sui_sui/url#sui_url_Url">Url</a> {
    <a href="../sui_sui/url#sui_url_Url">Url</a> { <a href="../sui_sui/url#sui_url">url</a> }
}
</code></pre>



</details>

<h2 id="sui_url_new_unsafe_from_bytes">Function <code>new_unsafe_from_bytes</code></h2>

바이트에서 검증 없이 <code><a href="../sui_sui/url#sui_url_Url">Url</a></code>을 생성한다.
참고: <code>bytes</code>가 유효한 ASCII가 아니면 중단된다.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/url#sui_url_new_unsafe_from_bytes">new_unsafe_from_bytes</a>(bytes: vector&lt;u8&gt;): <a href="../sui_sui/url#sui_url_Url">sui::url::Url</a>
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/url#sui_url_new_unsafe_from_bytes">new_unsafe_from_bytes</a>(bytes: vector&lt;u8&gt;): <a href="../sui_sui/url#sui_url_Url">Url</a> {
    <b>let</b> <a href="../sui_sui/url#sui_url">url</a> = bytes.to_ascii_string();
    <a href="../sui_sui/url#sui_url_Url">Url</a> { <a href="../sui_sui/url#sui_url">url</a> }
}
</code></pre>



</details>

<h2 id="sui_url_inner_url">Function <code>inner_url</code></h2>

내부 URL을 가져온다.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/url#sui_url_inner_url">inner_url</a>(self: &<a href="../sui_sui/url#sui_url_Url">sui::url::Url</a>): <a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/url#sui_url_inner_url">inner_url</a>(self: &<a href="../sui_sui/url#sui_url_Url">Url</a>): String {
    self.<a href="../sui_sui/url#sui_url">url</a>
}
</code></pre>



</details>

<h2 id="sui_url_update">Function <code>update</code></h2>

내부 URL을 갱신한다.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/url#sui_url_update">update</a>(self: &<b>mut</b> <a href="../sui_sui/url#sui_url_Url">sui::url::Url</a>, <a href="../sui_sui/url#sui_url">url</a>: <a href="../sui_std/ascii#std_ascii_String">std::ascii::String</a>)
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/url#sui_url_update">update</a>(self: &<b>mut</b> <a href="../sui_sui/url#sui_url_Url">Url</a>, <a href="../sui_sui/url#sui_url">url</a>: String) {
    self.<a href="../sui_sui/url#sui_url">url</a> = <a href="../sui_sui/url#sui_url">url</a>;
}
</code></pre>



</details>
