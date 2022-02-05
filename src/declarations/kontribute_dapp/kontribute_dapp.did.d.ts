import type { Principal } from '@dfinity/principal';
export type hasVoted = boolean;
export interface _SERVICE {
  'VoteOption1' : (arg_0: hasVoted) => Promise<string>,
  'VoteOption2' : (arg_0: hasVoted) => Promise<string>,
  'VoteOption3' : (arg_0: hasVoted) => Promise<string>,
  'getVote1' : () => Promise<bigint>,
  'getVote2' : () => Promise<bigint>,
  'getVote3' : () => Promise<bigint>,
  'whoami' : () => Promise<Principal>,
}
