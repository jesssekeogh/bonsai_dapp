import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface IndexCanister {
  'createAdditionalCanisterForPK' : ActorMethod<[string], string>,
  'createHelloServiceCanisterByRegion' : ActorMethod<[string], [] | [string]>,
  'getCanistersByPK' : ActorMethod<[string], Array<string>>,
}
export interface _SERVICE extends IndexCanister {}
