import type { Principal } from '@dfinity/principal';
export type List = [] | [[[Principal, Story], List]];
export interface Story { 'title' : string, 'body' : string, 'chapter' : string }
export interface _SERVICE {
  'allStories' : (arg_0: bigint) => Promise<List>,
  'create' : (arg_0: Principal, arg_1: Story) => Promise<string>,
}
