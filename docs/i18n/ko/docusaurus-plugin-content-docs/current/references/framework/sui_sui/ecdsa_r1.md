---
title: Module sui::ecdsa_r1
sidebar_label: ecdsa_r1
---



-  [Constants](#@Constants_0)
-  [Function `secp256r1_ecrecover`](#sui_ecdsa_r1_secp256r1_ecrecover)
-  [Function `secp256r1_verify`](#sui_ecdsa_r1_secp256r1_verify)


<pre><code></code></pre>



<h2 id="@Constants_0">Constants</h2>

signature에서 public key를 복구할 수 없으면 발생하는 오류이다.


<pre><code><b>const</b> <a href="../sui_sui/ecdsa_r1#sui_ecdsa_r1_EFailToRecoverPubKey">EFailToRecoverPubKey</a>: u64 = 0;
</code></pre>

signature가 유효하지 않으면 발생하는 오류이다.


<pre><code><b>const</b> <a href="../sui_sui/ecdsa_r1#sui_ecdsa_r1_EInvalidSignature">EInvalidSignature</a>: u64 = 1;
</code></pre>

ecrecover와 secp256k1_verify에서 유효한 hash 함수 이름이다.


<pre><code><b>const</b> <a href="../sui_sui/ecdsa_r1#sui_ecdsa_r1_KECCAK256">KECCAK256</a>: u8 = 0;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui/ecdsa_r1#sui_ecdsa_r1_SHA256">SHA256</a>: u8 = 1;
</code></pre>



<h2 id="sui_ecdsa_r1_secp256r1_ecrecover">Function <code>secp256r1_ecrecover</code></h2>

@param signature: Secp256r1로 서명된 (r, s, v) 형태의 65바이트 signature이다.
RFC6979를 사용한 signature 생성의 참조 구현은 다음과 같다:
https://github.com/MystenLabs/fastcrypto/blob/74aec4886e62122a5b769464c2bea5f803cf8ecc/fastcrypto/src/secp256r1/mod.rs
허용되는 v 값은 {0, 1, 2, 3}이다.
@param msg: signature가 서명한 대상 메시지이며, hash되지 않은 원시 메시지이다.
@param hash: 서명 시 메시지를 hash하는 데 사용한 hash 함수 이름을 나타내는 u8이다.

signature가 유효하면 대응하는 복구된 Secpk256r1 public
key를 반환하고, 그렇지 않으면 오류를 발생시킨다.
이는 Ethereum의 ecrecover와 유사하며 Secp256r1 signature에만
적용할 수 있다.
<code><a href="../sui_sui/ecdsa_r1#sui_ecdsa_r1_EFailToRecoverPubKey">EFailToRecoverPubKey</a></code> 또는 <code><a href="../sui_sui/ecdsa_r1#sui_ecdsa_r1_EInvalidSignature">EInvalidSignature</a></code>로 중단될 수 있다.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/ecdsa_r1#sui_ecdsa_r1_secp256r1_ecrecover">secp256r1_ecrecover</a>(signature: &vector&lt;u8&gt;, msg: &vector&lt;u8&gt;, <a href="../sui_sui/hash#sui_hash">hash</a>: u8): vector&lt;u8&gt;
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>native</b> <b>fun</b> <a href="../sui_sui/ecdsa_r1#sui_ecdsa_r1_secp256r1_ecrecover">secp256r1_ecrecover</a>(
    signature: &vector&lt;u8&gt;,
    msg: &vector&lt;u8&gt;,
    <a href="../sui_sui/hash#sui_hash">hash</a>: u8,
): vector&lt;u8&gt;;
</code></pre>



</details>

<h2 id="sui_ecdsa_r1_secp256r1_verify">Function <code>secp256r1_verify</code></h2>

@param signature: Secp256r1로 서명된 (r, s) 형태의 64바이트 signature이다.
이는 recovery id가 없는 비복구형 signature이다.
RFC6979를 사용한 signature 생성의 참조 구현은 다음과 같다:
https://github.com/MystenLabs/fastcrypto/blob/74aec4886e62122a5b769464c2bea5f803cf8ecc/fastcrypto/src/secp256r1/mod.rs
@param public_key: signature를 검증할 public key이다.
@param msg: signature가 서명한 대상 메시지이며, hash되지 않은 원시 메시지이다.
@param hash: 서명 시 메시지를 hash하는 데 사용한 hash 함수 이름을 나타내는 u8이다.

signature가 pubkey와 hash된 메시지에 대해 유효하면 true를 반환한다.
그렇지 않으면 false를 반환한다.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/ecdsa_r1#sui_ecdsa_r1_secp256r1_verify">secp256r1_verify</a>(signature: &vector&lt;u8&gt;, public_key: &vector&lt;u8&gt;, msg: &vector&lt;u8&gt;, <a href="../sui_sui/hash#sui_hash">hash</a>: u8): bool
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>native</b> <b>fun</b> <a href="../sui_sui/ecdsa_r1#sui_ecdsa_r1_secp256r1_verify">secp256r1_verify</a>(
    signature: &vector&lt;u8&gt;,
    public_key: &vector&lt;u8&gt;,
    msg: &vector&lt;u8&gt;,
    <a href="../sui_sui/hash#sui_hash">hash</a>: u8,
): bool;
</code></pre>



</details>
