import type { Principal } from '@dfinity/principal';
export interface Story { 'title' : string, 'body' : string, 'chapter' : string }
export interface _SERVICE {
  'allStories' : () => Promise<Array<Story>>,
  'create' : (arg_0: Story) => Promise<string>,
}
