---
title: Module sui::hash
sidebar_label: hash
---

hash 함수를 정의하는 모듈이다.
Sha-256과 Sha3-256은 standard library의 std::hash 모듈에서도 사용할 수 있다는 점에 유의한다.


-  [Function `blake2b256`](#sui_hash_blake2b256)
-  [Function `keccak256`](#sui_hash_keccak256)


<pre><code></code></pre>



<h2 id="sui_hash_blake2b256">Function <code>blake2b256</code></h2>

@param data: hash할 임의의 바이너리 데이터이다.
입력 바이트를 Blake2b-256으로 hash하여 32바이트를 반환한다.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/hash#sui_hash_blake2b256">blake2b256</a>(data: &vector&lt;u8&gt;): vector&lt;u8&gt;
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>native</b> <b>fun</b> <a href="../sui_sui/hash#sui_hash_blake2b256">blake2b256</a>(data: &vector&lt;u8&gt;): vector&lt;u8&gt;;
</code></pre>



</details>

<h2 id="sui_hash_keccak256">Function <code>keccak256</code></h2>

@param data: hash할 임의의 바이너리 데이터이다.
입력 바이트를 keccak256으로 hash하여 32바이트를 반환한다.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/hash#sui_hash_keccak256">keccak256</a>(data: &vector&lt;u8&gt;): vector&lt;u8&gt;
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>native</b> <b>fun</b> <a href="../sui_sui/hash#sui_hash_keccak256">keccak256</a>(data: &vector&lt;u8&gt;): vector&lt;u8&gt;;
</code></pre>



</details>
