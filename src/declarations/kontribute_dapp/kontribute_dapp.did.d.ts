import type { Principal } from '@dfinity/principal';
export interface Profile { 'hasVoted' : boolean, 'WhichOption' : string }
export interface _SERVICE {
  'VoteOption1' : () => Promise<string>,
  'VoteOption2' : () => Promise<string>,
  'VoteOption3' : () => Promise<string>,
  'getVote1' : () => Promise<bigint>,
  'getVote2' : () => Promise<bigint>,
  'getVote3' : () => Promise<bigint>,
  'readVotes' : () => Promise<Profile>,
  'whoami' : () => Promise<Principal>,
}
