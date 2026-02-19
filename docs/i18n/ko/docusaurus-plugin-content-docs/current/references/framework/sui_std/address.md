---
title: Module std::address
sidebar_label: address
---

address 길이가 플랫폼별 매개변수이므로 해당 길이를 얻는 방법을 제공한다.


-  [Function `length`](#std_address_length)


<pre><code></code></pre>



<h2 id="std_address_length">Function <code>length</code></h2>

native 함수로 변환되어야 한다.
현재 구현은 Sui에서만 동작한다.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/address#std_address_length">length</a>(): <a href="../sui_std/u64#std_u64">u64</a>
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/address#std_address_length">length</a>(): <a href="../sui_std/u64#std_u64">u64</a> {
    32
}
</code></pre>



</details>
