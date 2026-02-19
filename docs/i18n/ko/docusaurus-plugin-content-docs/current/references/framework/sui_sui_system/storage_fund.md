---
title: Module sui_system::storage_fund
sidebar_label: storage_fund
---



-  [Struct `StorageFund`](#sui_system_storage_fund_StorageFund)
-  [Function `new`](#sui_system_storage_fund_new)
-  [Function `advance_epoch`](#sui_system_storage_fund_advance_epoch)
-  [Function `total_object_storage_rebates`](#sui_system_storage_fund_total_object_storage_rebates)
-  [Function `total_balance`](#sui_system_storage_fund_total_balance)


<pre><code><b>use</b> <a href="../sui_std/address#std_address">std::address</a>;
<b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/bcs#std_bcs">std::bcs</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/string#std_string">std::string</a>;
<b>use</b> <a href="../sui_std/type_name#std_type_name">std::type_name</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
<b>use</b> <a href="../sui_sui/accumulator#sui_accumulator">sui::accumulator</a>;
<b>use</b> <a href="../sui_sui/address#sui_address">sui::address</a>;
<b>use</b> <a href="../sui_sui/bag#sui_bag">sui::bag</a>;
<b>use</b> <a href="../sui_sui/balance#sui_balance">sui::balance</a>;
<b>use</b> <a href="../sui_sui/coin#sui_coin">sui::coin</a>;
<b>use</b> <a href="../sui_sui/config#sui_config">sui::config</a>;
<b>use</b> <a href="../sui_sui/deny_list#sui_deny_list">sui::deny_list</a>;
<b>use</b> <a href="../sui_sui/dynamic_field#sui_dynamic_field">sui::dynamic_field</a>;
<b>use</b> <a href="../sui_sui/dynamic_object_field#sui_dynamic_object_field">sui::dynamic_object_field</a>;
<b>use</b> <a href="../sui_sui/event#sui_event">sui::event</a>;
<b>use</b> <a href="../sui_sui/hex#sui_hex">sui::hex</a>;
<b>use</b> <a href="../sui_sui/object#sui_object">sui::object</a>;
<b>use</b> <a href="../sui_sui/party#sui_party">sui::party</a>;
<b>use</b> <a href="../sui_sui/sui#sui_sui">sui::sui</a>;
<b>use</b> <a href="../sui_sui/table#sui_table">sui::table</a>;
<b>use</b> <a href="../sui_sui/transfer#sui_transfer">sui::transfer</a>;
<b>use</b> <a href="../sui_sui/tx_context#sui_tx_context">sui::tx_context</a>;
<b>use</b> <a href="../sui_sui/types#sui_types">sui::types</a>;
<b>use</b> <a href="../sui_sui/url#sui_url">sui::url</a>;
<b>use</b> <a href="../sui_sui/vec_map#sui_vec_map">sui::vec_map</a>;
<b>use</b> <a href="../sui_sui/vec_set#sui_vec_set">sui::vec_set</a>;
</code></pre>



<h2 id="sui_system_storage_fund_StorageFund">Struct <code>StorageFund</code></h2>

스토리지 기금을 나타내는 struct이며, 두 개의 <code>Balance</code>를 포함한다:
- <code><a href="../sui_sui_system/storage_fund#sui_system_storage_fund_total_object_storage_rebates">total_object_storage_rebates</a></code>는
현재 온체인에 저장된 모든 object의 <code>storage_rebate</code> 합과 같아야 한다는 불변식을 가진다.
이 불변식을 유지하기 위해 이
balance의 유입은 transaction에서 징수한 storage charge뿐이며 유출은
transaction의 storage rebate뿐이고, 여기에는 transaction sender에게 환불되는 부분과
환불되지 않고 분리되어 <code>non_refundable_balance</code>로 들어가는 부분이 모두 포함된다.
- <code>non_refundable_balance</code>는
기금에서 인출되지 않아야 하는 storage fund의 나머지 유입을 포함한다.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui_system/storage_fund#sui_system_storage_fund_StorageFund">StorageFund</a> <b>has</b> store
</code></pre>



<details>
<summary>Fields</summary>


<dl>
<dt>
<code><a href="../sui_sui_system/storage_fund#sui_system_storage_fund_total_object_storage_rebates">total_object_storage_rebates</a>: <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;</code>
</dt>
<dd>
</dd>
<dt>
<code>non_refundable_balance: <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;</code>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_system_storage_fund_new">Function <code>new</code></h2>

genesis 시점에 <code><a href="../sui_sui_system/sui_system#sui_system_sui_system">sui_system</a></code>이 호출한다.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/storage_fund#sui_system_storage_fund_new">new</a>(initial_fund: <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;): <a href="../sui_sui_system/storage_fund#sui_system_storage_fund_StorageFund">sui_system::storage_fund::StorageFund</a>
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/storage_fund#sui_system_storage_fund_new">new</a>(initial_fund: Balance&lt;SUI&gt;): <a href="../sui_sui_system/storage_fund#sui_system_storage_fund_StorageFund">StorageFund</a> {
    <a href="../sui_sui_system/storage_fund#sui_system_storage_fund_StorageFund">StorageFund</a> {
        // 시작 시점에는 아직 스토리지에 object가 없다.
        <a href="../sui_sui_system/storage_fund#sui_system_storage_fund_total_object_storage_rebates">total_object_storage_rebates</a>: balance::zero(),
        non_refundable_balance: initial_fund,
    }
}
</code></pre>



</details>

<h2 id="sui_system_storage_fund_advance_epoch">Function <code>advance_epoch</code></h2>

epoch 변경 시점에 storage fund의 유입과 유출을 처리하기 위해 <code><a href="../sui_sui_system/sui_system#sui_system_sui_system">sui_system</a></code>이 호출한다.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/storage_fund#sui_system_storage_fund_advance_epoch">advance_epoch</a>(self: &<b>mut</b> <a href="../sui_sui_system/storage_fund#sui_system_storage_fund_StorageFund">sui_system::storage_fund::StorageFund</a>, storage_charges: <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;, storage_fund_reinvestment: <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;, leftover_staking_rewards: <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;, storage_rebate_amount: u64, non_refundable_storage_fee_amount: u64): <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/storage_fund#sui_system_storage_fund_advance_epoch">advance_epoch</a>(
    self: &<b>mut</b> <a href="../sui_sui_system/storage_fund#sui_system_storage_fund_StorageFund">StorageFund</a>,
    storage_charges: Balance&lt;SUI&gt;,
    storage_fund_reinvestment: Balance&lt;SUI&gt;,
    leftover_staking_rewards: Balance&lt;SUI&gt;,
    storage_rebate_amount: u64,
    non_refundable_storage_fee_amount: u64,
): Balance&lt;SUI&gt; {
    // 재투자분과 잔여 보상은 환불 대상이 아니므로 non-refundable balance로 들어간다.
    self.non_refundable_balance.join(storage_fund_reinvestment);
    self.non_refundable_balance.join(leftover_staking_rewards);
    // 해당 epoch의 storage charge는 새로 생성된 object의 storage rebate와
    // epoch 중 수정된 object의 새로운 storage rebate에서 오므로
    // charge를 `<a href="../sui_sui_system/storage_fund#sui_system_storage_fund_total_object_storage_rebates">total_object_storage_rebates</a>`에 넣는다.
    self.<a href="../sui_sui_system/storage_fund#sui_system_storage_fund_total_object_storage_rebates">total_object_storage_rebates</a>.join(storage_charges);
    // storage rebate의 환불 불가 부분을 분리해 non-refundable balance에 넣는다.
    <b>let</b> non_refundable_storage_fee = self
        .<a href="../sui_sui_system/storage_fund#sui_system_storage_fund_total_object_storage_rebates">total_object_storage_rebates</a>
        .split(non_refundable_storage_fee_amount);
    self.non_refundable_balance.join(non_refundable_storage_fee);
    // `storage_rebates`에는 삭제된 object의 이미 환불된 rebate와 수정된 object의 기존 rebate가 포함되며
    // `<a href="../sui_sui_system/storage_fund#sui_system_storage_fund_total_object_storage_rebates">total_object_storage_rebates</a>`에서 빠져야 한다.
    <b>let</b> storage_rebate = self.<a href="../sui_sui_system/storage_fund#sui_system_storage_fund_total_object_storage_rebates">total_object_storage_rebates</a>.split(storage_rebate_amount);
    // storage rebate는 이미 개별 transaction sender의 gas coin으로 반환되었으므로
    // epoch 변경의 마지막 단계에서 소각될 balance를 반환한다.
    storage_rebate
}
</code></pre>



</details>

<h2 id="sui_system_storage_fund_total_object_storage_rebates">Function <code>total_object_storage_rebates</code></h2>



<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/storage_fund#sui_system_storage_fund_total_object_storage_rebates">total_object_storage_rebates</a>(self: &<a href="../sui_sui_system/storage_fund#sui_system_storage_fund_StorageFund">sui_system::storage_fund::StorageFund</a>): u64
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/storage_fund#sui_system_storage_fund_total_object_storage_rebates">total_object_storage_rebates</a>(self: &<a href="../sui_sui_system/storage_fund#sui_system_storage_fund_StorageFund">StorageFund</a>): u64 {
    self.<a href="../sui_sui_system/storage_fund#sui_system_storage_fund_total_object_storage_rebates">total_object_storage_rebates</a>.value()
}
</code></pre>



</details>

<h2 id="sui_system_storage_fund_total_balance">Function <code>total_balance</code></h2>



<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/storage_fund#sui_system_storage_fund_total_balance">total_balance</a>(self: &<a href="../sui_sui_system/storage_fund#sui_system_storage_fund_StorageFund">sui_system::storage_fund::StorageFund</a>): u64
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/storage_fund#sui_system_storage_fund_total_balance">total_balance</a>(self: &<a href="../sui_sui_system/storage_fund#sui_system_storage_fund_StorageFund">StorageFund</a>): u64 {
    self.<a href="../sui_sui_system/storage_fund#sui_system_storage_fund_total_object_storage_rebates">total_object_storage_rebates</a>.value() + self.non_refundable_balance.value()
}
</code></pre>



</details>
