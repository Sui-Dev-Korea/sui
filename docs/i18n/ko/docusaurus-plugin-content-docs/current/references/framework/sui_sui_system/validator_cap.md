---
title: Module sui_system::validator_cap
sidebar_label: validator_cap
---



-  [Struct `UnverifiedValidatorOperationCap`](#sui_system_validator_cap_UnverifiedValidatorOperationCap)
-  [Struct `ValidatorOperationCap`](#sui_system_validator_cap_ValidatorOperationCap)
-  [Function `unverified_operation_cap_address`](#sui_system_validator_cap_unverified_operation_cap_address)
-  [Function `verified_operation_cap_address`](#sui_system_validator_cap_verified_operation_cap_address)
-  [Function `new_unverified_validator_operation_cap_and_transfer`](#sui_system_validator_cap_new_unverified_validator_operation_cap_and_transfer)
-  [Function `into_verified`](#sui_system_validator_cap_into_verified)


<pre><code><b>use</b> <a href="../sui_std/ascii#std_ascii">std::ascii</a>;
<b>use</b> <a href="../sui_std/bcs#std_bcs">std::bcs</a>;
<b>use</b> <a href="../sui_std/option#std_option">std::option</a>;
<b>use</b> <a href="../sui_std/string#std_string">std::string</a>;
<b>use</b> <a href="../sui_std/vector#std_vector">std::vector</a>;
<b>use</b> <a href="../sui_sui/address#sui_address">sui::address</a>;
<b>use</b> <a href="../sui_sui/hex#sui_hex">sui::hex</a>;
<b>use</b> <a href="../sui_sui/object#sui_object">sui::object</a>;
<b>use</b> <a href="../sui_sui/party#sui_party">sui::party</a>;
<b>use</b> <a href="../sui_sui/transfer#sui_transfer">sui::transfer</a>;
<b>use</b> <a href="../sui_sui/tx_context#sui_tx_context">sui::tx_context</a>;
<b>use</b> <a href="../sui_sui/vec_map#sui_vec_map">sui::vec_map</a>;
</code></pre>



<h2 id="sui_system_validator_cap_UnverifiedValidatorOperationCap">Struct <code>UnverifiedValidatorOperationCap</code></h2>

capability object는 새 <code>Validator</code>를 만들 때 또는
validator가 rotation/revocation을 위해 새 capability object를 명시적으로 만들 때 생성된다.
이 object의 보유 address는
authorizer validator를 대신해 일부 validator 작업을 수행할 수 있다.
따라서 validator가 operation
(예: reference gas price 설정 또는 tallying rule 보고) 키를 자금/스테이킹 키와 분리하고 싶다면,
이 capability object를 다른 address로 전송할 수 있다.
rotation/revocation을 용이하게 하기 위해 <code>Validator</code>는 현재 유효한
<code><a href="../sui_sui_system/validator_cap#sui_system_validator_cap_UnverifiedValidatorOperationCap">UnverifiedValidatorOperationCap</a></code>의 ID를 저장한다.
따라서 <code><a href="../sui_sui_system/validator_cap#sui_system_validator_cap_UnverifiedValidatorOperationCap">UnverifiedValidatorOperationCap</a></code>를
<code><a href="../sui_sui_system/validator_cap#sui_system_validator_cap_ValidatorOperationCap">ValidatorOperationCap</a></code>로 변환하기 전에
cap object가 여전히 유효한지 확인하기 위한 검증이 필요하다.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui_system/validator_cap#sui_system_validator_cap_UnverifiedValidatorOperationCap">UnverifiedValidatorOperationCap</a> <b>has</b> key, store
</code></pre>



<details>
<summary>Fields</summary>


<dl>
<dt>
<code>id: <a href="../sui_sui/object#sui_object_UID">sui::object::UID</a></code>
</dt>
<dd>
</dd>
<dt>
<code>authorizer_validator_address: <b>address</b></code>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_system_validator_cap_ValidatorOperationCap">Struct <code>ValidatorOperationCap</code></h2>

권한이 필요한 작업은 permission check를 위해 <code><a href="../sui_sui_system/validator_cap#sui_system_validator_cap_ValidatorOperationCap">ValidatorOperationCap</a></code>이 필요하다.
이는 검증이 성공한 후에만 생성된다.


<pre><code><b>public</b> <b>struct</b> <a href="../sui_sui_system/validator_cap#sui_system_validator_cap_ValidatorOperationCap">ValidatorOperationCap</a> <b>has</b> drop
</code></pre>



<details>
<summary>Fields</summary>


<dl>
<dt>
<code>authorizer_validator_address: <b>address</b></code>
</dt>
<dd>
</dd>
</dl>


</details>

<h2 id="sui_system_validator_cap_unverified_operation_cap_address">Function <code>unverified_operation_cap_address</code></h2>



<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator_cap#sui_system_validator_cap_unverified_operation_cap_address">unverified_operation_cap_address</a>(cap: &<a href="../sui_sui_system/validator_cap#sui_system_validator_cap_UnverifiedValidatorOperationCap">sui_system::validator_cap::UnverifiedValidatorOperationCap</a>): &<b>address</b>
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator_cap#sui_system_validator_cap_unverified_operation_cap_address">unverified_operation_cap_address</a>(
    cap: &<a href="../sui_sui_system/validator_cap#sui_system_validator_cap_UnverifiedValidatorOperationCap">UnverifiedValidatorOperationCap</a>,
): &<b>address</b> {
    &cap.authorizer_validator_address
}
</code></pre>



</details>

<h2 id="sui_system_validator_cap_verified_operation_cap_address">Function <code>verified_operation_cap_address</code></h2>



<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator_cap#sui_system_validator_cap_verified_operation_cap_address">verified_operation_cap_address</a>(cap: &<a href="../sui_sui_system/validator_cap#sui_system_validator_cap_ValidatorOperationCap">sui_system::validator_cap::ValidatorOperationCap</a>): &<b>address</b>
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator_cap#sui_system_validator_cap_verified_operation_cap_address">verified_operation_cap_address</a>(cap: &<a href="../sui_sui_system/validator_cap#sui_system_validator_cap_ValidatorOperationCap">ValidatorOperationCap</a>): &<b>address</b> {
    &cap.authorizer_validator_address
}
</code></pre>



</details>

<h2 id="sui_system_validator_cap_new_unverified_validator_operation_cap_and_transfer">Function <code>new_unverified_validator_operation_cap_and_transfer</code></h2>

<code>Validator</code>를 추가할 때 또는
기존 validaotr의 <code>operation_cap_id</code>를 rotation할 때 friend 모듈에서만
호출되어야 한다.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator_cap#sui_system_validator_cap_new_unverified_validator_operation_cap_and_transfer">new_unverified_validator_operation_cap_and_transfer</a>(validator_address: <b>address</b>, ctx: &<b>mut</b> <a href="../sui_sui/tx_context#sui_tx_context_TxContext">sui::tx_context::TxContext</a>): <a href="../sui_sui/object#sui_object_ID">sui::object::ID</a>
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator_cap#sui_system_validator_cap_new_unverified_validator_operation_cap_and_transfer">new_unverified_validator_operation_cap_and_transfer</a>(
    validator_address: <b>address</b>,
    ctx: &<b>mut</b> TxContext,
): ID {
    // 이 함수는 다음 예외를 제외하고 <a href="../sui_sui_system/validator#sui_system_validator">validator</a> 자신에 의해서만 호출되어야 한다.
    // 1. <a href="../sui_sui_system/genesis#sui_system_genesis">genesis</a>에서 모든 valdiator는 @0x0이 생성한다.
    // 2. 테스트에서 설정 단순화를 위해 @0x0을 사용할 수 있다.
    <b>let</b> sender_address = ctx.sender();
    <b>assert</b>!(sender_address == @0x0 || sender_address == validator_address, 0);
    <b>let</b> operation_cap = <a href="../sui_sui_system/validator_cap#sui_system_validator_cap_UnverifiedValidatorOperationCap">UnverifiedValidatorOperationCap</a> {
        id: object::new(ctx),
        authorizer_validator_address: validator_address,
    };
    <b>let</b> operation_cap_id = object::id(&operation_cap);
    transfer::public_transfer(operation_cap, validator_address);
    operation_cap_id
}
</code></pre>



</details>

<h2 id="sui_system_validator_cap_into_verified">Function <code>into_verified</code></h2>

<code><a href="../sui_sui_system/validator_cap#sui_system_validator_cap_UnverifiedValidatorOperationCap">UnverifiedValidatorOperationCap</a></code>를 <code><a href="../sui_sui_system/validator_cap#sui_system_validator_cap_ValidatorOperationCap">ValidatorOperationCap</a></code>로 변환한다.
반드시 검증 후에 <code><a href="../sui_sui_system/validator_set#sui_system_validator_set">validator_set</a></code> 모듈에서만 호출되어야 한다.


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator_cap#sui_system_validator_cap_into_verified">into_verified</a>(cap: &<a href="../sui_sui_system/validator_cap#sui_system_validator_cap_UnverifiedValidatorOperationCap">sui_system::validator_cap::UnverifiedValidatorOperationCap</a>): <a href="../sui_sui_system/validator_cap#sui_system_validator_cap_ValidatorOperationCap">sui_system::validator_cap::ValidatorOperationCap</a>
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b>(package) <b>fun</b> <a href="../sui_sui_system/validator_cap#sui_system_validator_cap_into_verified">into_verified</a>(cap: &<a href="../sui_sui_system/validator_cap#sui_system_validator_cap_UnverifiedValidatorOperationCap">UnverifiedValidatorOperationCap</a>): <a href="../sui_sui_system/validator_cap#sui_system_validator_cap_ValidatorOperationCap">ValidatorOperationCap</a> {
    <a href="../sui_sui_system/validator_cap#sui_system_validator_cap_ValidatorOperationCap">ValidatorOperationCap</a> { authorizer_validator_address: cap.authorizer_validator_address }
}
</code></pre>



</details>
