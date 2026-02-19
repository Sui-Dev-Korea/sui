---
title: Module sui::ecvrf
sidebar_label: ecvrf
---



-  [Constants](#@Constants_0)
-  [Function `ecvrf_verify`](#sui_ecvrf_ecvrf_verify)


<pre><code></code></pre>



<h2 id="@Constants_0">Constants</h2>

<pre><code><b>const</b> <a href="../sui_sui/ecvrf#sui_ecvrf_EInvalidHashLength">EInvalidHashLength</a>: u64 = 1;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui/ecvrf#sui_ecvrf_EInvalidPublicKeyEncoding">EInvalidPublicKeyEncoding</a>: u64 = 2;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui/ecvrf#sui_ecvrf_EInvalidProofEncoding">EInvalidProofEncoding</a>: u64 = 3;
</code></pre>



<h2 id="sui_ecvrf_ecvrf_verify">Function <code>ecvrf_verify</code></h2>

@param hash: 검증할 ECVRF의 hash/output이다.
@param alpha_string: output 생성에 사용된 ECVRF의 입력/seed이다.
@param public_key: output 생성에 사용된 private key에 대응하는 public key이다.
@param proof: output의 유효성 proof이다.
Ristretto ECVRF의 proof를 검증한다.
proof가 유효하고 주어진 output에 대응하면 true를 반환한다.
<code><a href="../sui_sui/ecvrf#sui_ecvrf_EInvalidHashLength">EInvalidHashLength</a></code>, <code><a href="../sui_sui/ecvrf#sui_ecvrf_EInvalidPublicKeyEncoding">EInvalidPublicKeyEncoding</a></code>, 또는 <code><a href="../sui_sui/ecvrf#sui_ecvrf_EInvalidProofEncoding">EInvalidProofEncoding</a></code>으로 중단될 수 있다.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/ecvrf#sui_ecvrf_ecvrf_verify">ecvrf_verify</a>(<a href="../sui_sui/hash#sui_hash">hash</a>: &vector&lt;u8&gt;, alpha_string: &vector&lt;u8&gt;, public_key: &vector&lt;u8&gt;, proof: &vector&lt;u8&gt;): bool
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>native</b> <b>fun</b> <a href="../sui_sui/ecvrf#sui_ecvrf_ecvrf_verify">ecvrf_verify</a>(
    <a href="../sui_sui/hash#sui_hash">hash</a>: &vector&lt;u8&gt;,
    alpha_string: &vector&lt;u8&gt;,
    public_key: &vector&lt;u8&gt;,
    proof: &vector&lt;u8&gt;,
): bool;
</code></pre>



</details>
