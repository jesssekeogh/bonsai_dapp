export const idlFactory = ({ IDL }) => {
  const TokenIdentifier = IDL.Nat64;
  const TransactionId = IDL.Vec(IDL.Nat8);
  const SubAccount = IDL.Vec(IDL.Nat8);
  const Result_1 = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const AccountIdentifier = IDL.Vec(IDL.Nat8);
  const AccountRecordSerialized = IDL.Record({
    'tokens' : IDL.Vec(TokenIdentifier),
  });
  const Result = IDL.Variant({
    'ok' : AccountRecordSerialized,
    'err' : IDL.Text,
  });
  const Class = IDL.Service({
    'add' : IDL.Func([TokenIdentifier], [], []),
    'buy_tx' : IDL.Func([TransactionId, IDL.Opt(SubAccount)], [Result_1], []),
    'claim' : IDL.Func(
        [AccountIdentifier, IDL.Opt(SubAccount), TokenIdentifier],
        [Result_1],
        [],
      ),
    'getInstaller' : IDL.Func([], [IDL.Principal], ['query']),
    'gift_code_add' : IDL.Func([IDL.Vec(IDL.Nat8)], [Result_1], []),
    'owned' : IDL.Func([AccountIdentifier], [Result], ['query']),
    'set_admin' : IDL.Func([IDL.Principal], [], ['oneway']),
  });
  return Class;
};
export const init = ({ IDL }) => { return []; };
