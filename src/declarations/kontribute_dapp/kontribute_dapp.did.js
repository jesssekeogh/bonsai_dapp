export const idlFactory = ({ IDL }) => {
  const hasVoted = IDL.Bool;
  return IDL.Service({
    'VoteOption1' : IDL.Func([hasVoted], [IDL.Text], []),
    'VoteOption2' : IDL.Func([hasVoted], [IDL.Text], []),
    'VoteOption3' : IDL.Func([hasVoted], [IDL.Text], []),
    'getVote1' : IDL.Func([], [IDL.Nat], ['query']),
    'getVote2' : IDL.Func([], [IDL.Nat], ['query']),
    'getVote3' : IDL.Func([], [IDL.Nat], ['query']),
    'whoami' : IDL.Func([], [IDL.Principal], []),
  });
};
export const init = ({ IDL }) => { return []; };
