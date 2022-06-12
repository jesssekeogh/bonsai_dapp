import type { Principal } from '@dfinity/principal';
export type Result = { 'ok' : Array<bigint> } |
  { 'err' : string };
export type Result_1 = { 'ok' : StorySummary } |
  { 'err' : string };
export type Result_2 = { 'ok' : StoryReturn } |
  { 'err' : string };
export type Result_3 = { 'ok' : string } |
  { 'err' : string };
export interface StoryReturn {
  'totalVotes' : bigint,
  'storyId' : bigint,
  'author' : Principal,
  'story' : StoryText,
}
export interface StorySummary {
  'title' : string,
  'totalVotes' : bigint,
  'storyId' : bigint,
  'author' : Principal,
  'summary' : string,
}
export interface StoryText {
  'title' : string,
  'summary' : string,
  'story' : string,
  'address' : [] | [string],
}
export interface _SERVICE {
  'add' : (arg_0: StoryText) => Promise<Result_3>,
  'adminDelete' : (arg_0: bigint) => Promise<Result_3>,
  'delete' : (arg_0: bigint) => Promise<Result_3>,
  'get' : (arg_0: bigint) => Promise<Result_2>,
  'getDebug' : () => Promise<any>,
  'getMemorySize' : () => Promise<bigint>,
  'getStoryIds' : (arg_0: bigint) => Promise<Result>,
  'getSummary' : (arg_0: bigint) => Promise<Result_1>,
  'getUserStories' : (arg_0: string) => Promise<Result>,
  'whoami' : () => Promise<Principal>,
}
