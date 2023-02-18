import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type AccountIdentifier = Array<number>;
export interface AccountRecordSerialized { 'tokens' : Array<TokenIdentifier> }
export type Balance = bigint;
export type Basket = Array<[] | [TokenIdentifier]>;
export type CanisterRange = [CanisterSlot, CanisterSlot];
export type CanisterSlot = bigint;
export interface Class {
  'add' : ActorMethod<[TokenIdentifier], Result_3>,
  'airdrop_add' : ActorMethod<[Array<number>], Result_3>,
  'airdrop_use' : ActorMethod<[AccountIdentifier], Result_4>,
  'buy_tx' : ActorMethod<[bigint, TransactionId, [] | [SubAccount]], Result_4>,
  'claim' : ActorMethod<
    [AccountIdentifier, [] | [SubAccount], TokenIdentifier],
    Result_3,
  >,
  'icp_balance' : ActorMethod<[], Result_2>,
  'icp_transfer' : ActorMethod<[AccountIdentifier, Balance], Result_1>,
  'owned' : ActorMethod<[AccountIdentifier], Result>,
  'set_admin' : ActorMethod<[Principal], undefined>,
  'set_anvil_config' : ActorMethod<[Config], undefined>,
  'set_params' : ActorMethod<
    [{ 'airdrop' : bigint, 'purchase' : bigint }],
    undefined,
  >,
  'stats' : ActorMethod<
    [],
    {
      'total' : bigint,
      'added' : bigint,
      'available' : bigint,
      'airdrop' : bigint,
      'purchase' : bigint,
    },
  >,
}
export interface Config {
  'nft' : CanisterRange,
  'pwr' : CanisterRange,
  'anvil' : CanisterSlot,
  'history' : CanisterSlot,
  'nft_avail' : Array<CanisterSlot>,
  'space' : Array<Array<bigint>>,
  'account' : CanisterRange,
  'history_range' : CanisterRange,
  'router' : Principal,
  'treasury' : CanisterSlot,
}
export type Result = { 'ok' : AccountRecordSerialized } |
  { 'err' : string };
export type Result_1 = { 'ok' : Array<number> } |
  { 'err' : string };
export type Result_2 = { 'ok' : Balance } |
  { 'err' : string };
export type Result_3 = { 'ok' : null } |
  { 'err' : string };
export type Result_4 = { 'ok' : Basket } |
  { 'err' : string };
export type SubAccount = Array<number>;
export type TokenIdentifier = bigint;
export type TransactionId = Array<number>;
export interface _SERVICE extends Class {}
