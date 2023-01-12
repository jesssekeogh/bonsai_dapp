import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type AttributeKey = string;
export type AttributeValue = { 'int' : bigint } |
  { 'float' : number } |
  { 'tuple' : Array<AttributeValuePrimitive> } |
  { 'blob' : Array<number> } |
  { 'bool' : boolean } |
  { 'text' : string } |
  { 'tree' : Tree } |
  { 'arrayBool' : Array<boolean> } |
  { 'arrayText' : Array<string> } |
  { 'arrayInt' : Array<bigint> } |
  { 'arrayFloat' : Array<number> };
export type AttributeValuePrimitive = { 'int' : bigint } |
  { 'float' : number } |
  { 'bool' : boolean } |
  { 'text' : string };
export type AttributeValueRBTreeValue = { 'int' : bigint } |
  { 'float' : number } |
  { 'tuple' : Array<AttributeValuePrimitive> } |
  { 'blob' : Array<number> } |
  { 'bool' : boolean } |
  { 'text' : string } |
  { 'arrayBool' : Array<boolean> } |
  { 'arrayText' : Array<string> } |
  { 'arrayInt' : Array<bigint> } |
  { 'arrayFloat' : Array<number> };
export interface AuthorDetails {
  'bio' : string,
  'pseudonym' : string,
  'nftProfilePic' : string,
}
export type AutoScalingCanisterSharedFunctionHook = ActorMethod<
  [string],
  string,
>;
export type Color = { 'B' : null } |
  { 'R' : null };
export interface ConsumableEntity {
  'pk' : PK,
  'sk' : SK,
  'attributes' : Array<[AttributeKey, AttributeValue]>,
}
export type PK = string;
export type Result = { 'ok' : [] | [ConsumableEntity] } |
  { 'err' : string };
export type Result_1 = { 'ok' : Array<[] | [VotingProposal]> } |
  { 'err' : string };
export type Result_2 = { 'ok' : [] | [VotingProposal] } |
  { 'err' : string };
export type Result_3 = { 'ok' : [] | [AuthorDetails] } |
  { 'err' : string };
export type SK = string;
export type ScalingLimitType = { 'heapSize' : bigint } |
  { 'count' : bigint };
export interface ScalingOptions {
  'autoScalingHook' : AutoScalingCanisterSharedFunctionHook,
  'sizeLimit' : ScalingLimitType,
}
export interface ScanStoriesQuickElement {
  'sortKey' : string,
  'genre' : string,
  'groupName' : string,
}
export interface ScanStoriesQuickReturn {
  'stories' : Array<ScanStoriesQuickElement>,
  'nextKey' : [] | [string],
}
export interface ScanStoriesResult {
  'stories' : Array<SingleStory>,
  'nextKey' : [] | [string],
}
export interface SingleStory {
  'title' : string,
  'responses' : bigint,
  'views' : bigint,
  'body' : string,
  'time' : bigint,
  'author' : string,
  'likes' : bigint,
  'genre' : string,
  'address' : string,
  'proposals' : bigint,
  'groupName' : string,
  'monetizedAddress' : string,
  'monetized' : boolean,
}
export interface StoryService {
  'checkIfLiked' : ActorMethod<[string], boolean>,
  'checkIfVoted' : ActorMethod<[string], boolean>,
  'closeProposals' : ActorMethod<[string], string>,
  'deleteStory' : ActorMethod<[string], [] | [ConsumableEntity]>,
  'getAuthorDetails' : ActorMethod<[string], Result_3>,
  'getPK' : ActorMethod<[], string>,
  'getProposal' : ActorMethod<[string], Result_2>,
  'getProposals' : ActorMethod<[string], Result_1>,
  'getStory' : ActorMethod<[string], [] | [SingleStory]>,
  'incrementView' : ActorMethod<[string], [] | [ConsumableEntity]>,
  'likeStory' : ActorMethod<[string], Result>,
  'putAuthorDetails' : ActorMethod<[AuthorDetails], string>,
  'putStory' : ActorMethod<[SingleStory, Array<VotingProposal>], string>,
  'scanAllFullStories' : ActorMethod<
    [string, string, bigint, [] | [boolean]],
    ScanStoriesResult,
  >,
  'scanAllStories' : ActorMethod<
    [string, string, bigint, [] | [boolean]],
    ScanStoriesQuickReturn,
  >,
  'skExists' : ActorMethod<[string], boolean>,
  'transferCycles' : ActorMethod<[], undefined>,
  'voteOnProposal' : ActorMethod<[string, string], Result>,
}
export type Tree = { 'leaf' : null } |
  { 'node' : [Color, Tree, [string, [] | [AttributeValueRBTreeValue]], Tree] };
export interface VotingProposal {
  'title' : string,
  'votes' : bigint,
  'body' : string,
  'open' : boolean,
  'proposalNumber' : bigint,
}
export interface _SERVICE extends StoryService {}
