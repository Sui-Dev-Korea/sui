---
title: Module sui::hmac
sidebar_label: hmac
---



-  [Function `hmac_sha3_256`](#sui_hmac_hmac_sha3_256)


<pre><code></code></pre>



<h2 id="sui_hmac_hmac_sha3_256">Function <code>hmac_sha3_256</code></h2>

@param key: HMAC 키이며 임의의 바이트이다.
@param msg: 서명할 메시지이며 임의의 바이트이다.
HMAC-SHA3-256(key, msg)의 32바이트 다이제스트를 반환한다.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/hmac#sui_hmac_hmac_sha3_256">hmac_sha3_256</a>(key: &vector&lt;u8&gt;, msg: &vector&lt;u8&gt;): vector&lt;u8&gt;
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>native</b> <b>fun</b> <a href="../sui_sui/hmac#sui_hmac_hmac_sha3_256">hmac_sha3_256</a>(key: &vector&lt;u8&gt;, msg: &vector&lt;u8&gt;): vector&lt;u8&gt;;
</code></pre>



</details>
