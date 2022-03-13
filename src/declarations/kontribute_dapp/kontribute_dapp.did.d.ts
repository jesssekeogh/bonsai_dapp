import type { Principal } from '@dfinity/principal';
export type List = [] | [[[Principal, Story], List]];
export interface Profile { 'hasVoted' : boolean, 'whichOption' : string }
export interface Story { 'title' : string, 'body' : string, 'chapter' : string }
export interface _SERVICE {
  'VoteOption1' : () => Promise<string>,
  'VoteOption2' : () => Promise<string>,
  'VoteOption3' : () => Promise<string>,
  'getAll' : () => Promise<bigint>,
  'getAllII' : () => Promise<bigint>,
  'getAllStories' : (arg_0: bigint) => Promise<List>,
  'getVote1' : () => Promise<bigint>,
  'getVote1II' : () => Promise<bigint>,
  'getVote2' : () => Promise<bigint>,
  'getVote2II' : () => Promise<bigint>,
  'getVote3' : () => Promise<bigint>,
  'getVote3II' : () => Promise<bigint>,
  'readVotesII' : () => Promise<Profile>,
  'uploadStory' : (arg_0: Story) => Promise<string>,
}
