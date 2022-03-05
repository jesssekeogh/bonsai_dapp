export const idlFactory = ({ IDL }) => {
  const Story = IDL.Record({
    'title' : IDL.Text,
    'body' : IDL.Text,
    'chapter' : IDL.Text,
  });
  return IDL.Service({
    'allStories' : IDL.Func([], [IDL.Vec(Story)], []),
    'create' : IDL.Func([Story], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
