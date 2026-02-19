---
title: Module sui::event
sidebar_label: event
---

Events 모듈이다.
transaction의 effects certificate 일부로 custom MoveEvent를 생성하고 전송하는 <code><a href="../sui_sui/event#sui_event_emit">sui::event::emit</a></code> 함수를 정의한다.

모든 MoveEvent는 다음 속성을 가진다:
- sender
- 타입 시그니처(<code>T</code>)
- event 데이터(<code>T</code>의 값)
- timestamp(노드 로컬)
- transaction digest

예시:
```
module my::marketplace {
use sui::event;
/* ... */
struct ItemPurchased has copy, drop {
item_id: ID, buyer: address
}
entry fun buy(/* .... */) {
/* ... */
event::emit(ItemPurchased { item_id: ..., buyer: .... })
}
}
```


-  [Function `emit`](#sui_event_emit)


<pre><code></code></pre>



<h2 id="sui_event_emit">Function <code>emit</code></h2>

custom Move event를 emit하여 데이터를 offchain으로 보낸다.

custom index를 만들고 특정 애플리케이션에 가장 알맞은 방식으로 onchain
activity를 추적하는 데 사용한다.

타입 <code>T</code>는 event를 인덱싱하는 주요 수단이며,
<code><a href="../sui_sui/event#sui_event_emit">emit</a>(MyEvent&lt;<b>phantom</b> T&gt;)</code>와 같이 phantom 매개변수를 포함할 수 있다.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui/event#sui_event_emit">emit</a>&lt;T: <b>copy</b>, drop&gt;(<a href="../sui_sui/event#sui_event">event</a>: T)
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>native</b> <b>fun</b> <a href="../sui_sui/event#sui_event_emit">emit</a>&lt;T: <b>copy</b> + drop&gt;(<a href="../sui_sui/event#sui_event">event</a>: T);
</code></pre>



</details>
