export const idlFactory = ({ IDL }) => {
  const List = IDL.Rec();
  const Story = IDL.Record({
    'title' : IDL.Text,
    'body' : IDL.Text,
    'genre' : IDL.Text,
    'user_discord' : IDL.Text,
  });
  List.fill(IDL.Opt(IDL.Tuple(IDL.Tuple(IDL.Principal, Story), List)));
  const Profile = IDL.Record({
    'hasVoted' : IDL.Bool,
    'whichOption' : IDL.Text,
  });
  const StoryVotes = IDL.Record({
    'total' : IDL.Nat,
    'userOption' : Profile,
    'vote1' : IDL.Nat,
    'vote2' : IDL.Nat,
    'vote3' : IDL.Nat,
  });
  return IDL.Service({
    'VoteOption1' : IDL.Func([], [IDL.Text], []),
    'VoteOption2' : IDL.Func([], [IDL.Text], []),
    'VoteOption3' : IDL.Func([], [IDL.Text], []),
    'findStory' : IDL.Func([IDL.Text], [IDL.Text], []),
    'getAllStories' : IDL.Func([IDL.Nat], [List], []),
    'getVotes' : IDL.Func([], [StoryVotes], []),
    'getVotesII' : IDL.Func([], [StoryVotes], []),
    'getVotesIII' : IDL.Func([], [StoryVotes], []),
    'uploadStory' : IDL.Func([Story], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
