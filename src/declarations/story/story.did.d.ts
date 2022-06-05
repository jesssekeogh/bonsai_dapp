import type { Principal } from '@dfinity/principal';
export interface Story {
  'summary' : string,
  'story' : string,
  'address' : string,
}
export interface StoryWithLikes { 'likes' : bigint, 'story' : Story }
export interface _SERVICE {
  'add' : (arg_0: Story) => Promise<StoryWithLikes>,
  'get' : (arg_0: string) => Promise<StoryWithLikes>,
  'like' : (arg_0: string) => Promise<StoryWithLikes>,
}
