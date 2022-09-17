export const idlFactory = ({ IDL }) => {
  const IndexCanister = IDL.Service({
    'createAdditionalCanisterForPK' : IDL.Func([IDL.Text], [IDL.Text], []),
    'createHelloServiceCanisterByRegion' : IDL.Func(
        [IDL.Text],
        [IDL.Opt(IDL.Text)],
        [],
      ),
    'getCanistersByPK' : IDL.Func([IDL.Text], [IDL.Vec(IDL.Text)], ['query']),
  });
  return IndexCanister;
};
export const init = ({ IDL }) => { return []; };
