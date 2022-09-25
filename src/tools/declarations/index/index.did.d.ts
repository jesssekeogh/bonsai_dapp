import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface IndexCanister {
  'autoScaleUserServiceCanister' : ActorMethod<[string], string>,
  'createUserServiceCanisterByPrincipal' : ActorMethod<[string], [] | [string]>,
  'deleteUserServiceCanister' : ActorMethod<[string], undefined>,
  'getCanistersByPK' : ActorMethod<[string], Array<string>>,
  'upgradeUserCanistersByPK' : ActorMethod<[string, Array<number>], string>,
}
export interface _SERVICE extends IndexCanister {}
