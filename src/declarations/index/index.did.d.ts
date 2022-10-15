import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface IndexCanister {
  'autoScaleStoryServiceCanister' : ActorMethod<[string], string>,
  'createStoryServiceCanisterParitition' : ActorMethod<[string], [] | [string]>,
  'deleteServiceCanister' : ActorMethod<[string], undefined>,
  'getCanistersByPK' : ActorMethod<[string], Array<string>>,
  'upgradeStoryServiceCanistersByPK' : ActorMethod<
    [string, Array<number>],
    string,
  >,
}
export interface _SERVICE extends IndexCanister {}
