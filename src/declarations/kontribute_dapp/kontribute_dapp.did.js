export const idlFactory = ({ IDL }) => {
  const Name = IDL.Text;
  const Phone = IDL.Nat;
  const Entry = IDL.Record({
    'name' : Name,
    'email' : IDL.Text,
    'phone' : Phone,
    'address1' : IDL.Text,
    'address2' : IDL.Text,
  });
  return IDL.Service({
    'insert' : IDL.Func([Name, IDL.Text, IDL.Text, IDL.Text, Phone], [], []),
    'lookup' : IDL.Func([Name], [IDL.Opt(Entry)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
