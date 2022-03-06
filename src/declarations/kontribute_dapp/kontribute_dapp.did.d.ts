import type { Principal } from '@dfinity/principal';
export interface Profile { 'hasVoted' : boolean, 'whichOption' : string }
export interface _SERVICE {
  'VoteOption1' : () => Promise<string>,
  'VoteOption2' : () => Promise<string>,
  'VoteOption3' : () => Promise<string>,
  'getVote1' : () => Promise<bigint>,
  'getVote1II' : () => Promise<bigint>,
  'getVote2' : () => Promise<bigint>,
  'getVote2II' : () => Promise<bigint>,
  'getVote3' : () => Promise<bigint>,
  'getVote3II' : () => Promise<bigint>,
  'readVotes' : () => Promise<Profile>,
  'readVotesII' : () => Promise<Profile>,
}
