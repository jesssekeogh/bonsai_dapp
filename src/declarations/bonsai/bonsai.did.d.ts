import type { Principal } from '@dfinity/principal';
export interface Profile { 'hasVoted' : boolean, 'whichOption' : string }
export interface _SERVICE {
  'BonsaiOption1' : (arg_0: Principal) => Promise<string>,
  'BonsaiOption2' : (arg_0: Principal) => Promise<string>,
  'BonsaiOption3' : (arg_0: Principal) => Promise<string>,
  'getBonsaiVote1' : () => Promise<bigint>,
  'getBonsaiVote2' : () => Promise<bigint>,
  'getBonsaiVote3' : () => Promise<bigint>,
  'readBonsaiVotes' : (arg_0: Principal) => Promise<Profile>,
}
