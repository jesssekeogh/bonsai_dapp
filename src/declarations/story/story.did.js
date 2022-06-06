export const idlFactory = ({ IDL }) => {
  const Story = IDL.Record({
    'title' : IDL.Text,
    'summary' : IDL.Text,
    'story' : IDL.Text,
    'address' : IDL.Text,
  });
  const StoryWithLikes = IDL.Record({ 'likes' : IDL.Nat, 'story' : Story });
  const Result_3 = IDL.Variant({ 'ok' : StoryWithLikes, 'err' : IDL.Null });
  const KontributeVotes = IDL.Record({
    'votes' : IDL.Nat,
    'claimed' : IDL.Bool,
  });
  const Result_1 = IDL.Variant({ 'ok' : KontributeVotes, 'err' : IDL.Text });
  const Result_2 = IDL.Variant({ 'ok' : StoryWithLikes, 'err' : IDL.Text });
  const Result = IDL.Variant({ 'ok' : IDL.Text, 'err' : IDL.Text });
  return IDL.Service({
    'add' : IDL.Func([Story], [Result_3], []),
    'claim' : IDL.Func([], [Result_1], []),
    'delete' : IDL.Func([IDL.Text], [Result_2], []),
    'get' : IDL.Func([IDL.Text], [Result_2], ['query']),
    'getMyVotes' : IDL.Func([], [Result_1], ['query']),
    'like' : IDL.Func([IDL.Text], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
