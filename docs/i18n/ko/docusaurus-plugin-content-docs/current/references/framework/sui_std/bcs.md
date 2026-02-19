---
title: Module std::bcs
sidebar_label: bcs
---

Move 값을 BCS(Binary Canonical Serialization)의 바이너리 표현으로 변환하는 유틸리티이다. BCS는 온체인에 게시되는 Move resource와 기타 비모듈 값의 바이너리 인코딩이다. BCS의 자세한 내용은 https://github.com/diem/bcs#binary-canonical-serialization-bcs 를 참조한다.


-  [Function `to_bytes`](#std_bcs_to_bytes)


<pre><code></code></pre>



<h2 id="std_bcs_to_bytes">Function <code>to_bytes</code></h2>

<code>v</code>의 BCS(Binary Canonical Serialization) 형식 바이너리 표현을 반환한다.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_std/bcs#std_bcs_to_bytes">to_bytes</a>&lt;MoveValue&gt;(v: &MoveValue): <a href="../sui_std/vector#std_vector">vector</a>&lt;<a href="../sui_std/u8#std_u8">u8</a>&gt;
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>native</b> <b>fun</b> <a href="../sui_std/bcs#std_bcs_to_bytes">to_bytes</a>&lt;MoveValue&gt;(v: &MoveValue): <a href="../sui_std/vector#std_vector">vector</a>&lt;<a href="../sui_std/u8#std_u8">u8</a>&gt;;
</code></pre>



</details>
