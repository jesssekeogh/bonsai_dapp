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
    'BonsaiOption1' : IDL.Func([IDL.Principal], [IDL.Text], []),
    'BonsaiOption2' : IDL.Func([IDL.Principal], [IDL.Text], []),
    'BonsaiOption3' : IDL.Func([IDL.Principal], [IDL.Text], []),
    'getBonsaiVotes' : IDL.Func([], [StoryVotes], ['query']),
    'getBonsaiVotesII' : IDL.Func([IDL.Principal], [StoryVotes], ['query']),
    'getBonsaiVotesIII' : IDL.Func([IDL.Principal], [StoryVotes], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
