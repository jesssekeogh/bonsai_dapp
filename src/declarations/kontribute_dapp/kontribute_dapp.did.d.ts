import type { Principal } from '@dfinity/principal';
export type List = [] | [[[Principal, Story], List]];
export interface Profile { 'hasVoted' : boolean, 'whichOption' : string }
export interface Story {
  'title' : string,
  'body' : string,
  'genre' : string,
  'user_discord' : string,
}
export interface StoryVotes {
  'total' : bigint,
  'userOption' : Profile,
  'vote1' : bigint,
  'vote2' : bigint,
  'vote3' : bigint,
}
export interface _SERVICE {
  'VoteOption1' : () => Promise<string>,
  'VoteOption2' : () => Promise<string>,
  'VoteOption3' : () => Promise<string>,
  'findStory' : (arg_0: string) => Promise<string>,
  'getAllStories' : (arg_0: bigint) => Promise<List>,
  'getVotes' : () => Promise<StoryVotes>,
  'getVotesII' : () => Promise<StoryVotes>,
  'getVotesIII' : () => Promise<StoryVotes>,
  'uploadStory' : (arg_0: Story) => Promise<string>,
}
