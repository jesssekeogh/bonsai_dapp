import type { Principal } from '@dfinity/principal';
export type Result = { 'ok' : string } |
  { 'err' : string };
export type Result_1 = { 'ok' : Array<bigint> } |
  { 'err' : string };
export type Result_2 = { 'ok' : StoryReturn } |
  { 'err' : string };
export interface StoryReturn {
  'totalVotes' : bigint,
  'storyId' : bigint,
  'author' : Principal,
  'story' : StoryText,
}
export interface StoryText {
  'title' : string,
  'story' : string,
  'address' : [] | [string],
}
export interface _SERVICE {
  'add' : (arg_0: StoryText) => Promise<Result>,
  'adminDelete' : (arg_0: bigint) => Promise<Result>,
  'delete' : (arg_0: bigint) => Promise<Result>,
  'get' : (arg_0: bigint) => Promise<Result_2>,
  'getDebug' : () => Promise<any>,
  'getMemorySize' : () => Promise<bigint>,
  'getStoryIds' : (arg_0: bigint) => Promise<Result_1>,
  'getUserLikedStories' : () => Promise<Result_1>,
  'getUserStories' : (arg_0: string) => Promise<Result_1>,
  'like' : (arg_0: bigint) => Promise<Result>,
  'whoami' : () => Promise<Principal>,
}
