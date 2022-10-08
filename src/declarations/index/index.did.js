export const idlFactory = ({ IDL }) => {
  const IndexCanister = IDL.Service({
    'autoScaleStoryServiceCanister' : IDL.Func([IDL.Text], [IDL.Text], []),
    'createStoryServiceCanisterParitition' : IDL.Func(
        [IDL.Text],
        [IDL.Opt(IDL.Text)],
        [],
      ),
    'deleteStoryServiceCanister' : IDL.Func([IDL.Text], [], []),
    'getCanistersByPK' : IDL.Func([IDL.Text], [IDL.Vec(IDL.Text)], ['query']),
    'upgradeStoryCanistersByPK' : IDL.Func(
        [IDL.Text, IDL.Vec(IDL.Nat8)],
        [IDL.Text],
        [],
      ),
  });
  return IndexCanister;
};
export const init = ({ IDL }) => { return []; };
