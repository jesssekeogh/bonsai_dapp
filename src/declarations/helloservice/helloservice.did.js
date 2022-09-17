export const idlFactory = ({ IDL }) => {
  const ScalingLimitType = IDL.Variant({
    'heapSize' : IDL.Nat,
    'count' : IDL.Nat,
  });
  const ScalingOptions = IDL.Record({
    'sizeLimit' : ScalingLimitType,
    'autoScalingCanisterId' : IDL.Text,
  });
  const HelloService = IDL.Service({
    'getPK' : IDL.Func([], [IDL.Text], ['query']),
    'greetUser' : IDL.Func([IDL.Text], [IDL.Opt(IDL.Text)], ['query']),
    'putUser' : IDL.Func([IDL.Text, IDL.Text], [], []),
    'skExists' : IDL.Func([IDL.Text], [IDL.Bool], ['query']),
    'transferCycles' : IDL.Func([], [], []),
  });
  return HelloService;
};
export const init = ({ IDL }) => {
  const ScalingLimitType = IDL.Variant({
    'heapSize' : IDL.Nat,
    'count' : IDL.Nat,
  });
  const ScalingOptions = IDL.Record({
    'sizeLimit' : ScalingLimitType,
    'autoScalingCanisterId' : IDL.Text,
  });
  return [
    IDL.Record({
      'owners' : IDL.Opt(IDL.Vec(IDL.Principal)),
      'partitionKey' : IDL.Text,
      'scalingOptions' : ScalingOptions,
    }),
  ];
};
