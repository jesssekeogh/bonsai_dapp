import type { Principal } from '@dfinity/principal';
export interface Profile { 'hasVoted' : boolean, 'whichOption' : string }
export interface StoryVotes {
  'total' : bigint,
  'userOption' : Profile,
  'vote1' : bigint,
  'vote2' : bigint,
  'vote3' : bigint,
}
export interface _SERVICE {
  'BonsaiOption1' : (arg_0: Principal) => Promise<string>,
  'BonsaiOption2' : (arg_0: Principal) => Promise<string>,
  'BonsaiOption3' : (arg_0: Principal) => Promise<string>,
  'getBonsaiVotes' : () => Promise<StoryVotes>,
  'getBonsaiVotesII' : (arg_0: Principal) => Promise<StoryVotes>,
  'getBonsaiVotesIII' : (arg_0: Principal) => Promise<StoryVotes>,
}
