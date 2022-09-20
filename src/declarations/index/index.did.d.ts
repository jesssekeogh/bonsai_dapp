import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface IndexCanister {
  'autoScaleUserServiceCanister' : ActorMethod<[string], string>,
  'createUserServiceCanisterByPrincipal' : ActorMethod<[string], [] | [string]>,
  'deleteUserServiceCanister' : ActorMethod<[], undefined>,
  'getCanistersByPK' : ActorMethod<[string], Array<string>>,
}
export interface _SERVICE extends IndexCanister {}
