---
title: Module sui::poseidon
sidebar_label: poseidon
---

poseidon hash 함수 인스턴스를 정의하는 모듈이다.
Devnet에서만 사용할 수 있다.


-  [Constants](#@Constants_0)
-  [Function `poseidon_bn254`](#sui_poseidon_poseidon_bn254)
-  [Function `poseidon_bn254_internal`](#sui_poseidon_poseidon_bn254_internal)


<pre><code><b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/bcs#std_bcs">std::bcs</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/string#std_string">std::string</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
<b>use</b> <a href="../sui_sui/address#sui_address">sui::address</a>;
<b>use</b> <a href="../sui_sui/bcs#sui_bcs">sui::bcs</a>;
<b>use</b> <a href="../sui_sui/hex#sui_hex">sui::hex</a>;
</code></pre>



<h2 id="@Constants_0">Constants</h2>

입력 중 하나라도 BN254 필드 크기보다 크거나 같으면 발생하는 오류이다.


<pre><code><b>const</b> <a href="../sui_sui/poseidon#sui_poseidon_ENonCanonicalInput">ENonCanonicalInput</a>: u64 = 0;
</code></pre>

빈 벡터를 입력으로 전달하면 발생하는 오류이다.


<pre><code><b>const</b> <a href="../sui_sui/poseidon#sui_poseidon_EEmptyInput">EEmptyInput</a>: u64 = 1;
</code></pre>

BN254 곡선의 필드 크기이다.


<pre><code><b>const</b> <a href="../sui_sui/poseidon#sui_poseidon_BN254_MAX">BN254_MAX</a>: u256 = 21888242871839275222246405745257275088548364400416034343698204186575808495617;
</code></pre>



<h2 id="sui_poseidon_poseidon_bn254">Function <code>poseidon_bn254</code></h2>

@param data: hash할 BN254 필드 원소 벡터이다.

입력을 poseidon_bn254로 hash하고 BN254 필드 원소를 반환한다.

각 원소는 canonical 표현의 BN254 필드 원소여야 하므로 BN254
스칼라 필드 크기 21888242871839275222246405745257275088548364400416034343698204186575808495617보다 작아야 한다.

이 함수는 현재 Devnet에서만 활성화된다.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/poseidon#sui_poseidon_poseidon_bn254">poseidon_bn254</a>(data: &vector&lt;u256&gt;): u256
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/poseidon#sui_poseidon_poseidon_bn254">poseidon_bn254</a>(data: &vector&lt;u256&gt;): u256 {
    <b>let</b> (<b>mut</b> i, <b>mut</b> b, l) = (0, vector[], data.length());
    <b>assert</b>!(l &gt; 0, <a href="../sui_sui/poseidon#sui_poseidon_EEmptyInput">EEmptyInput</a>);
    <b>while</b> (i &lt; l) {
        <b>let</b> field_element = &data[i];
        <b>assert</b>!(*field_element &lt; <a href="../sui_sui/poseidon#sui_poseidon_BN254_MAX">BN254_MAX</a>, <a href="../sui_sui/poseidon#sui_poseidon_ENonCanonicalInput">ENonCanonicalInput</a>);
        b.push_back(<a href="../sui_sui/bcs#sui_bcs_to_bytes">bcs::to_bytes</a>(&data[i]));
        i = i + 1;
    };
    <b>let</b> binary_output = <a href="../sui_sui/poseidon#sui_poseidon_poseidon_bn254_internal">poseidon_bn254_internal</a>(&b);
    <a href="../sui_sui/bcs#sui_bcs_new">bcs::new</a>(binary_output).peel_u256()
}
</code></pre>



</details>

<h2 id="sui_poseidon_poseidon_bn254_internal">Function <code>poseidon_bn254_internal</code></h2>

@param data: little-endian 표현의 BN254 필드 원소 벡터이다.

입력을 poseidon_bn254로 hash하고 little-endian 표현의 BN254 필드 원소를 반환한다.


<pre><code><b>fun</b> <a href="../sui_sui/poseidon#sui_poseidon_poseidon_bn254_internal">poseidon_bn254_internal</a>(data: &vector&lt;vector&lt;u8&gt;&gt;): vector&lt;u8&gt;
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>native</b> <b>fun</b> <a href="../sui_sui/poseidon#sui_poseidon_poseidon_bn254_internal">poseidon_bn254_internal</a>(data: &vector&lt;vector&lt;u8&gt;&gt;): vector&lt;u8&gt;;
</code></pre>



</details>
