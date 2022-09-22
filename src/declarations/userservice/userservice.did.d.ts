import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type AutoScalingCanisterSharedFunctionHook = ActorMethod<
  [string],
  string,
>;
export type ScalingLimitType = { 'heapSize' : bigint } |
  { 'count' : bigint };
export interface ScalingOptions {
  'autoScalingHook' : AutoScalingCanisterSharedFunctionHook,
  'sizeLimit' : ScalingLimitType,
}
export interface Story { 'title' : string, 'body' : string }
export interface UserService {
  'getPK' : ActorMethod<[], string>,
  'getStory' : ActorMethod<[string], [] | [Story]>,
  'putStory' : ActorMethod<[Story], string>,
  'skExists' : ActorMethod<[string], boolean>,
  'transferCycles' : ActorMethod<[], undefined>,
  'whoami' : ActorMethod<[], Principal>,
}
export interface _SERVICE extends UserService {}
