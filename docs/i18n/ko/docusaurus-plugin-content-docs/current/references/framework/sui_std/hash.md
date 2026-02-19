---
title: Module std::hash
sidebar_label: hash
---

바이트 벡터용 SHA hash를 정의하는 모듈이다.

이 모듈의 함수는 Move runtime과 Move prover의 prelude 모두에서 네이티브로 선언된다.


-  [Function `sha2_256`](#std_hash_sha2_256)
-  [Function `sha3_256`](#std_hash_sha3_256)


<pre><code></code></pre>



<h2 id="std_hash_sha2_256">Function <code>sha2_256</code></h2>



<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/hash#std_hash_sha2_256">sha2_256</a>(data: <a href="../sui_std/vector#std_vector">vector</a>&lt;<a href="../sui_std/u8#std_u8">u8</a>&gt;): <a href="../sui_std/vector#std_vector">vector</a>&lt;<a href="../sui_std/u8#std_u8">u8</a>&gt;
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>native</b> <b>fun</b> <a href="../sui_std/hash#std_hash_sha2_256">sha2_256</a>(data: <a href="../sui_std/vector#std_vector">vector</a>&lt;<a href="../sui_std/u8#std_u8">u8</a>&gt;): <a href="../sui_std/vector#std_vector">vector</a>&lt;<a href="../sui_std/u8#std_u8">u8</a>&gt;;
</code></pre>



</details>

<h2 id="std_hash_sha3_256">Function <code>sha3_256</code></h2>



<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/hash#std_hash_sha3_256">sha3_256</a>(data: <a href="../sui_std/vector#std_vector">vector</a>&lt;<a href="../sui_std/u8#std_u8">u8</a>&gt;): <a href="../sui_std/vector#std_vector">vector</a>&lt;<a href="../sui_std/u8#std_u8">u8</a>&gt;
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>native</b> <b>fun</b> <a href="../sui_std/hash#std_hash_sha3_256">sha3_256</a>(data: <a href="../sui_std/vector#std_vector">vector</a>&lt;<a href="../sui_std/u8#std_u8">u8</a>&gt;): <a href="../sui_std/vector#std_vector">vector</a>&lt;<a href="../sui_std/u8#std_u8">u8</a>&gt;;
</code></pre>



</details>
