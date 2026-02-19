---
title: Module sui::math
sidebar_label: math
---

DEPRECATED이며, 대신 각 정수 타입의 개별 모듈을 사용한다. 예: <code><a href="../sui_std/u64#std_u64">std::u64</a></code>.


-  [Function `max`](#sui_math_max)
-  [Function `min`](#sui_math_min)
-  [Function `diff`](#sui_math_diff)
-  [Function `pow`](#sui_math_pow)
-  [Function `sqrt`](#sui_math_sqrt)
-  [Function `sqrt_u128`](#sui_math_sqrt_u128)
-  [Function `divide_and_round_up`](#sui_math_divide_and_round_up)


<pre><code><b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/string#std_string">std::string</a>;
<b>use</b> <a href="../sui_std/u128#std_u128">std::u128</a>;
<b>use</b> <a href="../sui_std/u64#std_u64">std::u64</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
</code></pre>



<h2 id="sui_math_max">Function <code>max</code></h2>

DEPRECATED이며, 대신 <code><a href="../sui_std/u64#std_u64_max">std::u64::max</a></code>를 사용한다.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/math#sui_math_max">max</a>(x: u64, y: u64): u64
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/math#sui_math_max">max</a>(x: u64, y: u64): u64 {
    x.<a href="../sui_sui/math#sui_math_max">max</a>(y)
}
</code></pre>



</details>

<h2 id="sui_math_min">Function <code>min</code></h2>

DEPRECATED이며, 대신 <code><a href="../sui_std/u64#std_u64_min">std::u64::min</a></code>를 사용한다.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/math#sui_math_min">min</a>(x: u64, y: u64): u64
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/math#sui_math_min">min</a>(x: u64, y: u64): u64 {
    x.<a href="../sui_sui/math#sui_math_min">min</a>(y)
}
</code></pre>



</details>

<h2 id="sui_math_diff">Function <code>diff</code></h2>

DEPRECATED이며, 대신 <code><a href="../sui_std/u64#std_u64_diff">std::u64::diff</a></code>를 사용한다.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/math#sui_math_diff">diff</a>(x: u64, y: u64): u64
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/math#sui_math_diff">diff</a>(x: u64, y: u64): u64 {
    x.<a href="../sui_sui/math#sui_math_diff">diff</a>(y)
}
</code></pre>



</details>

<h2 id="sui_math_pow">Function <code>pow</code></h2>

DEPRECATED이며, 대신 <code><a href="../sui_std/u64#std_u64_pow">std::u64::pow</a></code>를 사용한다.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/math#sui_math_pow">pow</a>(base: u64, exponent: u8): u64
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/math#sui_math_pow">pow</a>(base: u64, exponent: u8): u64 {
    base.<a href="../sui_sui/math#sui_math_pow">pow</a>(exponent)
}
</code></pre>



</details>

<h2 id="sui_math_sqrt">Function <code>sqrt</code></h2>

DEPRECATED이며, 대신 <code><a href="../sui_std/u64#std_u64_sqrt">std::u64::sqrt</a></code>를 사용한다.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/math#sui_math_sqrt">sqrt</a>(x: u64): u64
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/math#sui_math_sqrt">sqrt</a>(x: u64): u64 {
    x.<a href="../sui_sui/math#sui_math_sqrt">sqrt</a>()
}
</code></pre>



</details>

<h2 id="sui_math_sqrt_u128">Function <code>sqrt_u128</code></h2>

DEPRECATED이며, 대신 <code><a href="../sui_std/u128#std_u128_sqrt">std::u128::sqrt</a></code>를 사용한다.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/math#sui_math_sqrt_u128">sqrt_u128</a>(x: u128): u128
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/math#sui_math_sqrt_u128">sqrt_u128</a>(x: u128): u128 {
    x.<a href="../sui_sui/math#sui_math_sqrt">sqrt</a>()
}
</code></pre>



</details>

<h2 id="sui_math_divide_and_round_up">Function <code>divide_and_round_up</code></h2>

DEPRECATED이며, 대신 <code><a href="../sui_std/u64#std_u64_divide_and_round_up">std::u64::divide_and_round_up</a></code>를 사용한다.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/math#sui_math_divide_and_round_up">divide_and_round_up</a>(x: u64, y: u64): u64
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/math#sui_math_divide_and_round_up">divide_and_round_up</a>(x: u64, y: u64): u64 {
    x.<a href="../sui_sui/math#sui_math_divide_and_round_up">divide_and_round_up</a>(y)
}
</code></pre>



</details>
