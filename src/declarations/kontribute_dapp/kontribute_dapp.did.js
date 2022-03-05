export const idlFactory = ({ IDL }) => {
  const Profile = IDL.Record({
    'hasVoted' : IDL.Bool,
    'whichOption' : IDL.Text,
  });
  return IDL.Service({
    'VoteOption1' : IDL.Func([], [IDL.Text], []),
    'VoteOption2' : IDL.Func([], [IDL.Text], []),
    'VoteOption3' : IDL.Func([], [IDL.Text], []),
    'getVote1' : IDL.Func([], [IDL.Nat], []),
    'getVote2' : IDL.Func([], [IDL.Nat], []),
    'getVote3' : IDL.Func([], [IDL.Nat], []),
    'readVotes' : IDL.Func([], [Profile], []),
  });
};
export const init = ({ IDL }) => { return []; };
