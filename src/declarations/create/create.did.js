export const idlFactory = ({ IDL }) => {
  const List = IDL.Rec();
  const Story = IDL.Record({
    'title' : IDL.Text,
    'body' : IDL.Text,
    'genre' : IDL.Text,
    'user_discord' : IDL.Text,
  });
  List.fill(IDL.Opt(IDL.Tuple(IDL.Tuple(IDL.Principal, Story), List)));
  return IDL.Service({
    'allStories' : IDL.Func([IDL.Nat], [List], []),
    'create' : IDL.Func([IDL.Principal, Story], [IDL.Text], []),
    'findStory' : IDL.Func([IDL.Text], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
