---
title: Module sui_system::validator_wrapper
sidebar_label: validator_wrapper
---



-  [Struct `ValidatorWrapper`](#sui_system_validator_wrapper_ValidatorWrapper)
-  [Constants](#@Constants_0)
-  [Function `create_v1`](#sui_system_validator_wrapper_create_v1)
-  [Function `load_validator_maybe_upgrade`](#sui_system_validator_wrapper_load_validator_maybe_upgrade)
-  [Function `destroy`](#sui_system_validator_wrapper_destroy)
-  [Function `upgrade_to_latest`](#sui_system_validator_wrapper_upgrade_to_latest)
-  [Function `version`](#sui_system_validator_wrapper_version)


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
<b>use</b> <a href="../sui_sui/versioned#sui_versioned">sui::versioned</a>;
<b>use</b> <a href="../sui_sui_system/staking_pool#sui_system_staking_pool">sui_system::staking_pool</a>;
<b>use</b> <a href="../sui_sui_system/validator#sui_system_validator">sui_system::validator</a>;
<b>use</b> <a href="../sui_sui_system/validator_cap#sui_system_validator_cap">sui_system::validator_cap</a>;
</code></pre>



<h2 id="sui_system_validator_wrapper_ValidatorWrapper">Struct <code>ValidatorWrapper</code></h2>



<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper_ValidatorWrapper">ValidatorWrapper</a> <b>has</b> store
</code></pre>



<details>
<summary>Fields</summary>


<dl>
<dt>
<code>inner: <a href="../sui_sui/versioned#sui_versioned_Versioned">sui::versioned::Versioned</a></code>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="@Constants_0">Constants</h2>

<pre><code><b>const</b> <a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper_EInvalidVersion">EInvalidVersion</a>: u64 = 0;
</code></pre>



<h2 id="sui_system_validator_wrapper_create_v1">Function <code>create_v1</code></h2>



<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper_create_v1">create_v1</a>(<a href="../sui_sui_system/validator#sui_system_validator">validator</a>: <a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper_ValidatorWrapper">sui_system::validator_wrapper::ValidatorWrapper</a>
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper_create_v1">create_v1</a>(<a href="../sui_sui_system/validator#sui_system_validator">validator</a>: Validator, ctx: &<b>mut</b> TxContext): <a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper_ValidatorWrapper">ValidatorWrapper</a> {
    <a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper_ValidatorWrapper">ValidatorWrapper</a> {
        inner: versioned::create(1, <a href="../sui_sui_system/validator#sui_system_validator">validator</a>, ctx),
    }
}
</code></pre>



</details>

<h2 id="sui_system_validator_wrapper_load_validator_maybe_upgrade">Function <code>load_validator_maybe_upgrade</code></h2>

이 함수는 항상 최신 지원 버전을 반환해야 한다.
내부 버전이 오래되었다면 제자리에서 지연 업그레이드한다.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper_load_validator_maybe_upgrade">load_validator_maybe_upgrade</a>(self: &<b>mut</b> <a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper_ValidatorWrapper">sui_system::validator_wrapper::ValidatorWrapper</a>): &<b>mut</b> <a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper_load_validator_maybe_upgrade">load_validator_maybe_upgrade</a>(self: &<b>mut</b> <a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper_ValidatorWrapper">ValidatorWrapper</a>): &<b>mut</b> Validator {
    self.<a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper_upgrade_to_latest">upgrade_to_latest</a>();
    self.inner.load_value_mut()
}
</code></pre>



</details>

<h2 id="sui_system_validator_wrapper_destroy">Function <code>destroy</code></h2>

wrapper를 파괴하고 내부 validator object를 가져온다.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper_destroy">destroy</a>(self: <a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper_ValidatorWrapper">sui_system::validator_wrapper::ValidatorWrapper</a>): <a href="../sui_sui_system/validator#sui_system_validator_Validator">sui_system::validator::Validator</a>
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper_destroy">destroy</a>(self: <a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper_ValidatorWrapper">ValidatorWrapper</a>): Validator {
    <a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper_upgrade_to_latest">upgrade_to_latest</a>(&self);
    <b>let</b> <a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper_ValidatorWrapper">ValidatorWrapper</a> { inner } = self;
    inner.<a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper_destroy">destroy</a>()
}
</code></pre>



</details>

<h2 id="sui_system_validator_wrapper_upgrade_to_latest">Function <code>upgrade_to_latest</code></h2>



<pre><code><b>fun</b> <a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper_upgrade_to_latest">upgrade_to_latest</a>(self: &<a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper_ValidatorWrapper">sui_system::validator_wrapper::ValidatorWrapper</a>)
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>fun</b> <a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper_upgrade_to_latest">upgrade_to_latest</a>(self: &<a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper_ValidatorWrapper">ValidatorWrapper</a>) {
    <b>let</b> <a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper_version">version</a> = self.<a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper_version">version</a>();
    // TODO: 새 버전이 추가되면 여기에서 명시적 업그레이드를 수행해야 한다.
    <b>assert</b>!(<a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper_version">version</a> == 1, <a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper_EInvalidVersion">EInvalidVersion</a>);
}
</code></pre>



</details>

<h2 id="sui_system_validator_wrapper_version">Function <code>version</code></h2>



<pre><code><b>fun</b> <a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper_version">version</a>(self: &<a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper_ValidatorWrapper">sui_system::validator_wrapper::ValidatorWrapper</a>): u64
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>fun</b> <a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper_version">version</a>(self: &<a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper_ValidatorWrapper">ValidatorWrapper</a>): u64 {
    self.inner.<a href="../sui_sui_system/validator_wrapper#sui_system_validator_wrapper_version">version</a>()
}
</code></pre>



</details>
