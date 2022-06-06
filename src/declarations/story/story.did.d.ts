import type { Principal } from '@dfinity/principal';
export interface KontributeVotes { 'votes' : bigint, 'claimed' : boolean }
export type Result = { 'ok' : string } |
  { 'err' : string };
export type Result_1 = { 'ok' : KontributeVotes } |
  { 'err' : string };
export type Result_2 = { 'ok' : StoryWithLikes } |
  { 'err' : string };
export type Result_3 = { 'ok' : StoryWithLikes } |
  { 'err' : null };
export interface Story {
  'title' : string,
  'summary' : string,
  'story' : string,
  'address' : string,
}
export interface StoryWithLikes { 'likes' : bigint, 'story' : Story }
export interface _SERVICE {
  'add' : (arg_0: Story) => Promise<Result_3>,
  'claim' : () => Promise<Result_1>,
  'delete' : (arg_0: string) => Promise<Result_2>,
  'get' : (arg_0: string) => Promise<Result_2>,
  'getMyVotes' : () => Promise<Result_1>,
  'like' : (arg_0: string) => Promise<Result>,
}
