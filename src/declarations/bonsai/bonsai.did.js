export const idlFactory = ({ IDL }) => {
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
    'BonsaiOption1' : IDL.Func([], [IDL.Text], []),
    'BonsaiOption2' : IDL.Func([], [IDL.Text], []),
    'BonsaiOption3' : IDL.Func([], [IDL.Text], []),
    'getBonsaiVotes' : IDL.Func([], [StoryVotes], ['query']),
    'getBonsaiVotesII' : IDL.Func([], [StoryVotes], ['query']),
    'getBonsaiVotesIII' : IDL.Func([], [StoryVotes], ['query']),
    'getBonsaiVotesIV' : IDL.Func([], [StoryVotes], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
