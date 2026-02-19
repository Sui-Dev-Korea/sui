---
title: Module sui::vdf
sidebar_label: vdf
---



-  [Constants](#@Constants_0)
-  [Function `hash_to_input`](#sui_vdf_hash_to_input)
-  [Function `hash_to_input_internal`](#sui_vdf_hash_to_input_internal)
-  [Function `vdf_verify`](#sui_vdf_vdf_verify)
-  [Function `vdf_verify_internal`](#sui_vdf_vdf_verify_internal)


<pre><code></code></pre>



<h2 id="@Constants_0">Constants</h2>

<pre><code><b>const</b> <a href="../sui_sui/vdf#sui_vdf_EInvalidInput">EInvalidInput</a>: u64 = 0;
</code></pre>



<h2 id="sui_vdf_hash_to_input">Function <code>hash_to_input</code></h2>

임의의 바이너리 <code>message</code>를 <code><a href="../sui_sui/vdf#sui_vdf_vdf_verify">vdf_verify</a></code> 입력으로 사용할 class group 원소로 hash한다.

이 함수는 현재 Devnet에서만 활성화된다.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/vdf#sui_vdf_hash_to_input">hash_to_input</a>(message: &vector&lt;u8&gt;): vector&lt;u8&gt;
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/vdf#sui_vdf_hash_to_input">hash_to_input</a>(message: &vector&lt;u8&gt;): vector&lt;u8&gt; {
    <a href="../sui_sui/vdf#sui_vdf_hash_to_input_internal">hash_to_input_internal</a>(message)
}
</code></pre>



</details>

<h2 id="sui_vdf_hash_to_input_internal">Function <code>hash_to_input_internal</code></h2>

<code><a href="../sui_sui/vdf#sui_vdf_hash_to_input">hash_to_input</a></code>의 내부 함수이다.


<pre><code><b>fun</b> <a href="../sui_sui/vdf#sui_vdf_hash_to_input_internal">hash_to_input_internal</a>(message: &vector&lt;u8&gt;): vector&lt;u8&gt;
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>native</b> <b>fun</b> <a href="../sui_sui/vdf#sui_vdf_hash_to_input_internal">hash_to_input_internal</a>(message: &vector&lt;u8&gt;): vector&lt;u8&gt;;
</code></pre>



</details>

<h2 id="sui_vdf_vdf_verify">Function <code>vdf_verify</code></h2>

주어진 반복 횟수로 VDF의 output과 proof를 검증한다.
<code>input</code>, <code>output</code>, <code>proof</code>는 모두 <code>b^2 - 4ac = discriminant</code>를 만족하는 <code>(a,b,c)</code> 삼중쌍으로 표현되는 class group 원소이다.
이들은 각각 a, b, c의 순서로 big-endian 2의 보수 인코딩 바이트 배열 삼중쌍을 BCS로 인코딩한 형태여야 한다.

이는 Wesolowski (2020),
'Efficient Verifiable Delay Functions.', J. Cryptol. 33에서 설명한 imaginary class group 기반 Wesolowski VDF 구성을 사용하며,
fastcrypto의 VDF 구현과 호환된다.

class group의 discriminant는 사전 계산되어 고정되어 있다.
이 값이 fastcrypto-vdf
crate에서 어떻게 생성되는지는 해당 crate를 참조한다.
Mainnet의 최종 discriminant 선택은 nothing-up-my-sleeve
절차로 계산되고 공지될 예정이다.

이 함수는 현재 Devnet에서만 활성화된다.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/vdf#sui_vdf_vdf_verify">vdf_verify</a>(input: &vector&lt;u8&gt;, output: &vector&lt;u8&gt;, proof: &vector&lt;u8&gt;, iterations: u64): bool
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/vdf#sui_vdf_vdf_verify">vdf_verify</a>(
    input: &vector&lt;u8&gt;,
    output: &vector&lt;u8&gt;,
    proof: &vector&lt;u8&gt;,
    iterations: u64,
): bool {
    <a href="../sui_sui/vdf#sui_vdf_vdf_verify_internal">vdf_verify_internal</a>(input, output, proof, iterations)
}
</code></pre>



</details>

<h2 id="sui_vdf_vdf_verify_internal">Function <code>vdf_verify_internal</code></h2>

<code><a href="../sui_sui/vdf#sui_vdf_vdf_verify_internal">vdf_verify_internal</a></code>의 내부 함수이다.


<pre><code><b>fun</b> <a href="../sui_sui/vdf#sui_vdf_vdf_verify_internal">vdf_verify_internal</a>(input: &vector&lt;u8&gt;, output: &vector&lt;u8&gt;, proof: &vector&lt;u8&gt;, iterations: u64): bool
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>native</b> <b>fun</b> <a href="../sui_sui/vdf#sui_vdf_vdf_verify_internal">vdf_verify_internal</a>(
    input: &vector&lt;u8&gt;,
    output: &vector&lt;u8&gt;,
    proof: &vector&lt;u8&gt;,
    iterations: u64,
): bool;
</code></pre>



</details>
