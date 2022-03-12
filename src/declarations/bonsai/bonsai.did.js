export const idlFactory = ({ IDL }) => {
  const Profile = IDL.Record({
    'hasVoted' : IDL.Bool,
    'whichOption' : IDL.Text,
  });
  return IDL.Service({
    'BonsaiOption1' : IDL.Func([IDL.Principal], [IDL.Text], []),
    'BonsaiOption2' : IDL.Func([IDL.Principal], [IDL.Text], []),
    'BonsaiOption3' : IDL.Func([IDL.Principal], [IDL.Text], []),
    'getBonsaiVote1' : IDL.Func([], [IDL.Nat], ['query']),
    'getBonsaiVote1II' : IDL.Func([], [IDL.Nat], ['query']),
    'getBonsaiVote2' : IDL.Func([], [IDL.Nat], ['query']),
    'getBonsaiVote2II' : IDL.Func([], [IDL.Nat], ['query']),
    'getBonsaiVote3' : IDL.Func([], [IDL.Nat], ['query']),
    'getBonsaiVote3II' : IDL.Func([], [IDL.Nat], ['query']),
    'readBonsaiVotes' : IDL.Func([IDL.Principal], [Profile], []),
    'readBonsaiVotesII' : IDL.Func([IDL.Principal], [Profile], []),
  });
};
export const init = ({ IDL }) => { return []; };
