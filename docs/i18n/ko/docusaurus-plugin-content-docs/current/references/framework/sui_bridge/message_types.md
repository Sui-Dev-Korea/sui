---
title: Module bridge::message_types
sidebar_label: message_types
---



-  [Constants](#@Constants_0)
-  [Function `token`](#bridge_message_types_token)
-  [Function `committee_blocklist`](#bridge_message_types_committee_blocklist)
-  [Function `emergency_op`](#bridge_message_types_emergency_op)
-  [Function `update_bridge_limit`](#bridge_message_types_update_bridge_limit)
-  [Function `update_asset_price`](#bridge_message_types_update_asset_price)
-  [Function `add_tokens_on_sui`](#bridge_message_types_add_tokens_on_sui)


<pre><code></code></pre>



<h2 id="@Constants_0">Constants</h2>

<pre><code><b>const</b> <a href="../sui_bridge/message_types#bridge_message_types_TOKEN">TOKEN</a>: u8 = 0;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/message_types#bridge_message_types_COMMITTEE_BLOCKLIST">COMMITTEE_BLOCKLIST</a>: u8 = 1;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/message_types#bridge_message_types_EMERGENCY_OP">EMERGENCY_OP</a>: u8 = 2;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/message_types#bridge_message_types_UPDATE_BRIDGE_LIMIT">UPDATE_BRIDGE_LIMIT</a>: u8 = 3;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/message_types#bridge_message_types_UPDATE_ASSET_PRICE">UPDATE_ASSET_PRICE</a>: u8 = 4;
</code></pre>

<pre><code><b>const</b> <a href="../sui_bridge/message_types#bridge_message_types_ADD_TOKENS_ON_SUI">ADD_TOKENS_ON_SUI</a>: u8 = 6;
</code></pre>



<h2 id="bridge_message_types_token">Function <code>token</code></h2>



<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message_types#bridge_message_types_token">token</a>(): u8
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message_types#bridge_message_types_token">token</a>(): u8 { <a href="../sui_bridge/message_types#bridge_message_types_TOKEN">TOKEN</a> }
</code></pre>



</details>

<h2 id="bridge_message_types_committee_blocklist">Function <code>committee_blocklist</code></h2>



<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message_types#bridge_message_types_committee_blocklist">committee_blocklist</a>(): u8
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message_types#bridge_message_types_committee_blocklist">committee_blocklist</a>(): u8 { <a href="../sui_bridge/message_types#bridge_message_types_COMMITTEE_BLOCKLIST">COMMITTEE_BLOCKLIST</a> }
</code></pre>



</details>

<h2 id="bridge_message_types_emergency_op">Function <code>emergency_op</code></h2>



<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message_types#bridge_message_types_emergency_op">emergency_op</a>(): u8
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message_types#bridge_message_types_emergency_op">emergency_op</a>(): u8 { <a href="../sui_bridge/message_types#bridge_message_types_EMERGENCY_OP">EMERGENCY_OP</a> }
</code></pre>



</details>

<h2 id="bridge_message_types_update_bridge_limit">Function <code>update_bridge_limit</code></h2>



<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message_types#bridge_message_types_update_bridge_limit">update_bridge_limit</a>(): u8
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message_types#bridge_message_types_update_bridge_limit">update_bridge_limit</a>(): u8 { <a href="../sui_bridge/message_types#bridge_message_types_UPDATE_BRIDGE_LIMIT">UPDATE_BRIDGE_LIMIT</a> }
</code></pre>



</details>

<h2 id="bridge_message_types_update_asset_price">Function <code>update_asset_price</code></h2>



<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message_types#bridge_message_types_update_asset_price">update_asset_price</a>(): u8
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message_types#bridge_message_types_update_asset_price">update_asset_price</a>(): u8 { <a href="../sui_bridge/message_types#bridge_message_types_UPDATE_ASSET_PRICE">UPDATE_ASSET_PRICE</a> }
</code></pre>



</details>

<h2 id="bridge_message_types_add_tokens_on_sui">Function <code>add_tokens_on_sui</code></h2>



<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message_types#bridge_message_types_add_tokens_on_sui">add_tokens_on_sui</a>(): u8
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_bridge/message_types#bridge_message_types_add_tokens_on_sui">add_tokens_on_sui</a>(): u8 { <a href="../sui_bridge/message_types#bridge_message_types_ADD_TOKENS_ON_SUI">ADD_TOKENS_ON_SUI</a> }
</code></pre>



</details>
