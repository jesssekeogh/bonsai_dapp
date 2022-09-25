export const idlFactory = ({ IDL }) => {
  const IndexCanister = IDL.Service({
    'autoScaleUserServiceCanister' : IDL.Func([IDL.Text], [IDL.Text], []),
    'createUserServiceCanisterByPrincipal' : IDL.Func(
        [IDL.Text],
        [IDL.Opt(IDL.Text)],
        [],
      ),
    'deleteUserServiceCanister' : IDL.Func([IDL.Text], [], []),
    'getCanistersByPK' : IDL.Func([IDL.Text], [IDL.Vec(IDL.Text)], ['query']),
    'upgradeUserCanistersByPK' : IDL.Func(
        [IDL.Text, IDL.Vec(IDL.Nat8)],
        [IDL.Text],
        [],
      ),
  });
  return IndexCanister;
};
export const init = ({ IDL }) => { return []; };
