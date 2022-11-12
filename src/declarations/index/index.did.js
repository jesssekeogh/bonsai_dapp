export const idlFactory = ({ IDL }) => {
  const IndexCanister = IDL.Service({
    'authTest' : IDL.Func([], [IDL.Text], []),
    'autoScaleStoryServiceCanister' : IDL.Func([IDL.Text], [IDL.Text], []),
    'createStoryServiceCanisterParitition' : IDL.Func(
        [],
        [IDL.Opt(IDL.Text)],
        [],
      ),
    'deleteServiceCanister' : IDL.Func([IDL.Text], [], []),
    'getAllCanisterIdsByPK' : IDL.Func([IDL.Text], [IDL.Vec(IDL.Text)], []),
    'getCanistersByPK' : IDL.Func([IDL.Text], [IDL.Vec(IDL.Text)], ['query']),
    'getPKs' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
    'upgradeStoryServiceCanistersByPK' : IDL.Func(
        [IDL.Text, IDL.Vec(IDL.Nat8)],
        [IDL.Text],
        [],
      ),
  });
  return IndexCanister;
};
export const init = ({ IDL }) => { return []; };
