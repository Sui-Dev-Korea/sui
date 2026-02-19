---
title: Module sui_system::stake_subsidy
sidebar_label: stake_subsidy
---



-  [Struct `StakeSubsidy`](#sui_system_stake_subsidy_StakeSubsidy)
-  [Constants](#@Constants_0)
-  [Function `create`](#sui_system_stake_subsidy_create)
-  [Function `advance_epoch`](#sui_system_stake_subsidy_advance_epoch)
-  [Function `current_epoch_subsidy_amount`](#sui_system_stake_subsidy_current_epoch_subsidy_amount)
-  [Function `get_distribution_counter`](#sui_system_stake_subsidy_get_distribution_counter)


<pre><code><b>use</b> <a href="../sui_std/address#std_address">std::address</a>;
<b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/bcs#std_bcs">std::bcs</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/string#std_string">std::string</a>;
<b>use</b> <a href="../sui_std/type_name#std_type_name">std::type_name</a>;
<b>use</b> <a href="../sui_std/u64#std_u64">std::u64</a>;
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



<h2 id="sui_system_stake_subsidy_StakeSubsidy">Struct <code>StakeSubsidy</code></h2>



<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui_system/stake_subsidy#sui_system_stake_subsidy_StakeSubsidy">StakeSubsidy</a> <b>has</b> store
</code></pre>



<details>
<summary>Fields</summary>


<dl>
<dt>
<code>balance: <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;</code>
</dt>
<dd>
 시간이 지나며 인출될 stake subsidy를 위해 따로 배정된 SUI 잔액이다.
</dd>
<dt>
<code>distribution_counter: u64</code>
</dt>
<dd>
 stake subsidy가 분배된 횟수이다.
</dd>
<dt>
<code>current_distribution_amount: u64</code>
</dt>
<dd>
 분배당 인출할 stake subsidy 양이다.
 이 양은 시간이 지나며 감소한다.
</dd>
<dt>
<code>stake_subsidy_period_length: u64</code>
</dt>
<dd>
 분배량이 감소하기 전에 발생하는 분배 횟수이다.
</dd>
<dt>
<code>stake_subsidy_decrease_rate: u16</code>
</dt>
<dd>
 각 기간 종료 시 분배량이 감소하는 비율이다.
 basis point로 표현한다.
</dd>
<dt>
<code>extra_fields: <a href="../sui_sui/bag#sui_bag_Bag">sui::bag::Bag</a></code>
</dt>
<dd>
 정적으로 정의되지 않은 추가 필드이다.
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

<pre><code><b>const</b> <a href="../sui_sui_system/stake_subsidy#sui_system_stake_subsidy_ESubsidyDecreaseRateTooLarge">ESubsidyDecreaseRateTooLarge</a>: u64 = 0;
</code></pre>

<pre><code><b>const</b> <a href="../sui_sui_system/stake_subsidy#sui_system_stake_subsidy_BASIS_POINT_DENOMINATOR">BASIS_POINT_DENOMINATOR</a>: u128 = 10000;
</code></pre>



<h2 id="sui_system_stake_subsidy_create">Function <code>create</code></h2>



<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/stake_subsidy#sui_system_stake_subsidy_create">create</a>(balance: <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;, initial_distribution_amount: u64, stake_subsidy_period_length: u64, stake_subsidy_decrease_rate: u16, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui_system/stake_subsidy#sui_system_stake_subsidy_StakeSubsidy">sui_system::stake_subsidy::StakeSubsidy</a>
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/stake_subsidy#sui_system_stake_subsidy_create">create</a>(
    balance: Balance&lt;SUI&gt;,
    initial_distribution_amount: u64,
    stake_subsidy_period_length: u64,
    stake_subsidy_decrease_rate: u16,
    ctx: &<b>mut</b> TxContext,
): <a href="../sui_sui_system/stake_subsidy#sui_system_stake_subsidy_StakeSubsidy">StakeSubsidy</a> {
    // 비율은 100%보다 높을 수 없다.
    <b>assert</b>!(
        stake_subsidy_decrease_rate &lt;= <a href="../sui_sui_system/stake_subsidy#sui_system_stake_subsidy_BASIS_POINT_DENOMINATOR">BASIS_POINT_DENOMINATOR</a> <b>as</b> u16,
        <a href="../sui_sui_system/stake_subsidy#sui_system_stake_subsidy_ESubsidyDecreaseRateTooLarge">ESubsidyDecreaseRateTooLarge</a>,
    );
    <a href="../sui_sui_system/stake_subsidy#sui_system_stake_subsidy_StakeSubsidy">StakeSubsidy</a> {
        balance,
        distribution_counter: 0,
        current_distribution_amount: initial_distribution_amount,
        stake_subsidy_period_length,
        stake_subsidy_decrease_rate,
        extra_fields: bag::new(ctx),
    }
}
</code></pre>



</details>

<h2 id="sui_system_stake_subsidy_advance_epoch">Function <code>advance_epoch</code></h2>

epoch 카운터를 전진시키고 해당 epoch의 subsidy를 인출한다.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/stake_subsidy#sui_system_stake_subsidy_advance_epoch">advance_epoch</a>(self: &<b>mut</b> <a href="../sui_sui_system/stake_subsidy#sui_system_stake_subsidy_StakeSubsidy">sui_system::stake_subsidy::StakeSubsidy</a>): <a href="../sui_sui/balance#sui_balance_Balance">sui::balance::Balance</a>&lt;<a href="../sui_sui/sui#sui_sui_SUI">sui::sui::SUI</a>&gt;
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/stake_subsidy#sui_system_stake_subsidy_advance_epoch">advance_epoch</a>(self: &<b>mut</b> <a href="../sui_sui_system/stake_subsidy#sui_system_stake_subsidy_StakeSubsidy">StakeSubsidy</a>): Balance&lt;SUI&gt; {
    // 남은 stake subsidy 잔액을 초과 인출하지 않도록
    // 보상량과 남은 잔액 중 최소값을 취한다.
    <b>let</b> to_withdraw = self.current_distribution_amount.min(self.balance.value());
    // 이 epoch에 대한 subsidy를 인출한다.
    <b>let</b> <a href="../sui_sui_system/stake_subsidy#sui_system_stake_subsidy">stake_subsidy</a> = self.balance.split(to_withdraw);
    self.distribution_counter = self.distribution_counter + 1;
    // 현재 기간이 끝날 때만 subsidy 양을 감소시킨다.
    <b>if</b> (self.distribution_counter % self.stake_subsidy_period_length == 0) {
        <b>let</b> decrease_amount =
            self.current_distribution_amount <b>as</b> u128
            * (self.stake_subsidy_decrease_rate <b>as</b> u128) / <a href="../sui_sui_system/stake_subsidy#sui_system_stake_subsidy_BASIS_POINT_DENOMINATOR">BASIS_POINT_DENOMINATOR</a>;
        self.current_distribution_amount =
            self.current_distribution_amount - (decrease_amount <b>as</b> u64)
    };
    <a href="../sui_sui_system/stake_subsidy#sui_system_stake_subsidy">stake_subsidy</a>
}
</code></pre>



</details>

<h2 id="sui_system_stake_subsidy_current_epoch_subsidy_amount">Function <code>current_epoch_subsidy_amount</code></h2>

현재 epoch 종료 시 추가될 stake subsidy 양을 반환한다.


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/stake_subsidy#sui_system_stake_subsidy_current_epoch_subsidy_amount">current_epoch_subsidy_amount</a>(self: &<a href="../sui_sui_system/stake_subsidy#sui_system_stake_subsidy_StakeSubsidy">sui_system::stake_subsidy::StakeSubsidy</a>): u64
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="../sui_sui_system/stake_subsidy#sui_system_stake_subsidy_current_epoch_subsidy_amount">current_epoch_subsidy_amount</a>(self: &<a href="../sui_sui_system/stake_subsidy#sui_system_stake_subsidy_StakeSubsidy">StakeSubsidy</a>): u64 {
    self.current_distribution_amount.min(self.balance.value())
}
</code></pre>



</details>

<h2 id="sui_system_stake_subsidy_get_distribution_counter">Function <code>get_distribution_counter</code></h2>

발생한 분배 횟수를 반환한다.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/stake_subsidy#sui_system_stake_subsidy_get_distribution_counter">get_distribution_counter</a>(self: &<a href="../sui_sui_system/stake_subsidy#sui_system_stake_subsidy_StakeSubsidy">sui_system::stake_subsidy::StakeSubsidy</a>): u64
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/stake_subsidy#sui_system_stake_subsidy_get_distribution_counter">get_distribution_counter</a>(self: &<a href="../sui_sui_system/stake_subsidy#sui_system_stake_subsidy_StakeSubsidy">StakeSubsidy</a>): u64 {
    self.distribution_counter
}
</code></pre>



</details>
