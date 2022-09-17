import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface HelloService {
  'getPK' : ActorMethod<[], string>,
  'greetUser' : ActorMethod<[string], [] | [string]>,
  'putUser' : ActorMethod<[string, string], undefined>,
  'skExists' : ActorMethod<[string], boolean>,
  'transferCycles' : ActorMethod<[], undefined>,
}
export type ScalingLimitType = { 'heapSize' : bigint } |
  { 'count' : bigint };
export interface ScalingOptions {
  'sizeLimit' : ScalingLimitType,
  'autoScalingCanisterId' : string,
}
export interface _SERVICE extends HelloService {}
