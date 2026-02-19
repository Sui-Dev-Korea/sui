---
title: Module sui::types
sidebar_label: types
---

Sui 타입 helper 및 유틸리티이다.


-  [Function `is_one_time_witness`](#sui_types_is_one_time_witness)


<pre><code></code></pre>



<h2 id="sui_types_is_one_time_witness">Function <code>is_one_time_witness</code></h2>

인자 타입이 one-time witness인지 검사하며, 이는 전체 코드 베이스에서 인스턴스가 하나뿐인 타입이다.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/types#sui_types_is_one_time_witness">is_one_time_witness</a>&lt;T: drop&gt;(_: &T): bool
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>native</b> <b>fun</b> <a href="../sui_sui/types#sui_types_is_one_time_witness">is_one_time_witness</a>&lt;T: drop&gt;(_: &T): bool;
</code></pre>



</details>
