export const idlFactory = ({ IDL }) => {
  const StoryText = IDL.Record({
    'title' : IDL.Text,
    'story' : IDL.Text,
    'address' : IDL.Opt(IDL.Text),
  });
  const Result = IDL.Variant({ 'ok' : IDL.Text, 'err' : IDL.Text });
  const StoryReturn = IDL.Record({
    'totalVotes' : IDL.Nat,
    'storyId' : IDL.Nat,
    'author' : IDL.Principal,
    'story' : StoryText,
  });
  const Result_3 = IDL.Variant({ 'ok' : StoryReturn, 'err' : IDL.Text });
  const StoryBlob = IDL.Record({
    'title' : IDL.Vec(IDL.Nat8),
    'story' : IDL.Vec(IDL.Nat8),
    'address' : IDL.Vec(IDL.Nat8),
  });
  const StoryRecord = IDL.Record({
    'totalVotes' : IDL.Nat,
    'storyId' : IDL.Nat,
    'author' : IDL.Principal,
    'story' : StoryBlob,
  });
  const Result_2 = IDL.Variant({
    'ok' : IDL.Vec(IDL.Opt(StoryRecord)),
    'err' : IDL.Null,
  });
  const Result_1 = IDL.Variant({ 'ok' : IDL.Vec(IDL.Nat), 'err' : IDL.Text });
  return IDL.Service({
    'add' : IDL.Func([StoryText], [Result], []),
    'adminDelete' : IDL.Func([IDL.Nat], [Result], []),
    'delete' : IDL.Func([IDL.Nat], [Result], []),
    'get' : IDL.Func([IDL.Nat], [Result_3], ['query']),
    'getAllStories' : IDL.Func([], [Result_2], ['query']),
    'getDebug' : IDL.Func([], [IDL.Reserved], ['query']),
    'getMemorySize' : IDL.Func([], [IDL.Nat], ['query']),
    'getStoryIds' : IDL.Func([IDL.Nat], [Result_1], ['query']),
    'getUserLikedStories' : IDL.Func([], [Result_1], ['query']),
    'getUserStories' : IDL.Func([IDL.Text], [Result_1], ['query']),
    'like' : IDL.Func([IDL.Nat], [Result], []),
    'whoami' : IDL.Func([], [IDL.Principal], []),
  });
};
export const init = ({ IDL }) => { return []; };
