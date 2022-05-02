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
  'BonsaiOption1' : () => Promise<string>,
  'BonsaiOption2' : () => Promise<string>,
  'BonsaiOption3' : () => Promise<string>,
  'getBonsaiVotes' : () => Promise<StoryVotes>,
  'getBonsaiVotesII' : () => Promise<StoryVotes>,
  'getBonsaiVotesIII' : () => Promise<StoryVotes>,
  'getBonsaiVotesIV' : () => Promise<StoryVotes>,
}
