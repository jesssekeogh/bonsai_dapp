import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface IndexCanister {
  'authTest' : ActorMethod<[], string>,
  'autoScaleStoryServiceCanister' : ActorMethod<[string], string>,
  'createStoryServiceCanisterParitition' : ActorMethod<[], [] | [string]>,
  'deleteServiceCanister' : ActorMethod<[string], undefined>,
  'getAllCanisterIdsByPK' : ActorMethod<[string], Array<string>>,
  'getCanistersByPK' : ActorMethod<[string], Array<string>>,
  'getPKs' : ActorMethod<[], Array<string>>,
  'upgradeStoryServiceCanistersByPK' : ActorMethod<
    [string, Array<number>],
    string,
  >,
}
export interface _SERVICE extends IndexCanister {}
