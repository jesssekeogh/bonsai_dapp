import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type Result = { 'ok' : string } |
  { 'err' : string };
export type Result_1 = { 'ok' : Array<bigint> } |
  { 'err' : string };
export type Result_2 = { 'ok' : Array<[] | [StoryRecord]> } |
  { 'err' : null };
export type Result_3 = { 'ok' : StoryReturn } |
  { 'err' : string };
export interface StoryBlob {
  'title' : Array<number>,
  'story' : Array<number>,
  'address' : Array<number>,
}
export interface StoryRecord {
  'totalVotes' : bigint,
  'storyId' : bigint,
  'author' : Principal,
  'story' : StoryBlob,
}
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
  'add' : ActorMethod<[StoryText], Result>,
  'adminDelete' : ActorMethod<[bigint], Result>,
  'delete' : ActorMethod<[bigint], Result>,
  'get' : ActorMethod<[bigint], Result_3>,
  'getAllStories' : ActorMethod<[], Result_2>,
  'getDebug' : ActorMethod<[], any>,
  'getMemorySize' : ActorMethod<[], bigint>,
  'getStoryIds' : ActorMethod<[bigint], Result_1>,
  'getUserLikedStories' : ActorMethod<[], Result_1>,
  'getUserStories' : ActorMethod<[string], Result_1>,
  'like' : ActorMethod<[bigint], Result>,
  'whoami' : ActorMethod<[], Principal>,
}
