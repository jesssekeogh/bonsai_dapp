export const idlFactory = ({ IDL }) => {
  const IndexCanister = IDL.Service({
    'autoScaleUserServiceCanister' : IDL.Func([IDL.Text], [IDL.Text], []),
    'createUserServiceCanisterByPrincipal' : IDL.Func(
        [IDL.Text],
        [IDL.Opt(IDL.Text)],
        [],
      ),
    'deleteUserServiceCanister' : IDL.Func([], [], []),
    'getCanistersByPK' : IDL.Func([IDL.Text], [IDL.Vec(IDL.Text)], ['query']),
  });
  return IndexCanister;
};
export const init = ({ IDL }) => { return []; };
