---
title: Module bridge::crypto
sidebar_label: crypto
---



-  [Function `ecdsa_pub_key_to_eth_address`](#bridge_crypto_ecdsa_pub_key_to_eth_address)


<pre><code><b>use</b> <a href="../sui_sui/ecdsa_k1#sui_ecdsa_k1">sui::ecdsa_k1</a>;
<b>use</b> <a href="../sui_sui/hash#sui_hash">sui::hash</a>;
</code></pre>



<h2 id="bridge_crypto_ecdsa_pub_key_to_eth_address">Function <code>ecdsa_pub_key_to_eth_address</code></h2>



<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_bridge/crypto#bridge_crypto_ecdsa_pub_key_to_eth_address">ecdsa_pub_key_to_eth_address</a>(compressed_pub_key: &vector&lt;u8&gt;): vector&lt;u8&gt;
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_bridge/crypto#bridge_crypto_ecdsa_pub_key_to_eth_address">ecdsa_pub_key_to_eth_address</a>(compressed_pub_key: &vector&lt;u8&gt;): vector&lt;u8&gt; {
    // 공개 키 압축 해제
    <b>let</b> decompressed = ecdsa_k1::decompress_pubkey(compressed_pub_key);
    // 첫 번째 바이트를 건너뜀
    <b>let</b> (<b>mut</b> i, <b>mut</b> decompressed_64) = (1, vector[]);
    <b>while</b> (i &lt; 65) {
        decompressed_64.push_back(decompressed[i]);
        i = i + 1;
    };
    // 해시
    <b>let</b> hash = keccak256(&decompressed_64);
    // 마지막 20바이트를 취함
    <b>let</b> <b>mut</b> <b>address</b> = vector[];
    <b>let</b> <b>mut</b> i = 12;
    <b>while</b> (i &lt; 32) {
        <b>address</b>.push_back(hash[i]);
        i = i + 1;
    };
    <b>address</b>
}
</code></pre>



</details>
