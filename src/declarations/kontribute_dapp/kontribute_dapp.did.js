export const idlFactory = ({ IDL }) => {
  const List = IDL.Rec();
  const Story = IDL.Record({
    'title' : IDL.Text,
    'body' : IDL.Text,
    'chapter' : IDL.Text,
  });
  List.fill(IDL.Opt(IDL.Tuple(IDL.Tuple(IDL.Principal, Story), List)));
  const Profile = IDL.Record({
    'hasVoted' : IDL.Bool,
    'whichOption' : IDL.Text,
  });
  return IDL.Service({
    'VoteOption1' : IDL.Func([], [IDL.Text], []),
    'VoteOption2' : IDL.Func([], [IDL.Text], []),
    'VoteOption3' : IDL.Func([], [IDL.Text], []),
    'getAllStories' : IDL.Func([IDL.Nat], [List], []),
    'getVote1' : IDL.Func([], [IDL.Nat], []),
    'getVote1II' : IDL.Func([], [IDL.Nat], []),
    'getVote2' : IDL.Func([], [IDL.Nat], []),
    'getVote2II' : IDL.Func([], [IDL.Nat], []),
    'getVote3' : IDL.Func([], [IDL.Nat], []),
    'getVote3II' : IDL.Func([], [IDL.Nat], []),
    'readVotes' : IDL.Func([], [Profile], []),
    'readVotesII' : IDL.Func([], [Profile], []),
    'uploadStory' : IDL.Func([Story], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
