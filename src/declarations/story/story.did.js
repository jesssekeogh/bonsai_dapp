export const idlFactory = ({ IDL }) => {
  const Story = IDL.Record({
    'summary' : IDL.Text,
    'story' : IDL.Text,
    'address' : IDL.Text,
  });
  const StoryWithLikes = IDL.Record({ 'likes' : IDL.Nat, 'story' : Story });
  return IDL.Service({
    'add' : IDL.Func([Story], [StoryWithLikes], []),
    'get' : IDL.Func([IDL.Text], [StoryWithLikes], ['query']),
    'like' : IDL.Func([IDL.Text], [StoryWithLikes], []),
  });
};
export const init = ({ IDL }) => { return []; };
