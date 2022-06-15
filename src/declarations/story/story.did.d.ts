import type { Principal } from '@dfinity/principal';
export type Result = { 'ok' : Array<bigint> } |
  { 'err' : string };
export type Result_1 = { 'ok' : StoryReturn } |
  { 'err' : string };
export type Result_2 = { 'ok' : string } |
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
  'add' : (arg_0: StoryText) => Promise<Result_2>,
  'adminDelete' : (arg_0: bigint) => Promise<Result_2>,
  'delete' : (arg_0: bigint) => Promise<Result_2>,
  'get' : (arg_0: bigint) => Promise<Result_1>,
  'getDebug' : () => Promise<any>,
  'getMemorySize' : () => Promise<bigint>,
  'getStoryIds' : (arg_0: bigint) => Promise<Result>,
  'getUserStories' : (arg_0: string) => Promise<Result>,
  'whoami' : () => Promise<Principal>,
}
