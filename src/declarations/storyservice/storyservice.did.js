export const idlFactory = ({ IDL }) => {
  const Tree = IDL.Rec();
  const AutoScalingCanisterSharedFunctionHook = IDL.Func(
      [IDL.Text],
      [IDL.Text],
      [],
    );
  const ScalingLimitType = IDL.Variant({
    'heapSize' : IDL.Nat,
    'count' : IDL.Nat,
  });
  const ScalingOptions = IDL.Record({
    'autoScalingHook' : AutoScalingCanisterSharedFunctionHook,
    'sizeLimit' : ScalingLimitType,
  });
  const VotingProposal = IDL.Record({
    'title' : IDL.Text,
    'votes' : IDL.Int,
    'body' : IDL.Text,
    'open' : IDL.Bool,
    'proposalNumber' : IDL.Int,
  });
  const Result_1 = IDL.Variant({
    'ok' : IDL.Opt(VotingProposal),
    'err' : IDL.Text,
  });
  const SingleStory = IDL.Record({
    'title' : IDL.Text,
    'views' : IDL.Int,
    'body' : IDL.Text,
    'author' : IDL.Text,
    'likes' : IDL.Int,
    'proposals' : IDL.Int,
    'groupName' : IDL.Text,
  });
  const PK = IDL.Text;
  const SK = IDL.Text;
  const AttributeKey = IDL.Text;
  const AttributeValuePrimitive = IDL.Variant({
    'int' : IDL.Int,
    'float' : IDL.Float64,
    'bool' : IDL.Bool,
    'text' : IDL.Text,
  });
  const Color = IDL.Variant({ 'B' : IDL.Null, 'R' : IDL.Null });
  const AttributeValueRBTreeValue = IDL.Variant({
    'int' : IDL.Int,
    'float' : IDL.Float64,
    'tuple' : IDL.Vec(AttributeValuePrimitive),
    'blob' : IDL.Vec(IDL.Nat8),
    'bool' : IDL.Bool,
    'text' : IDL.Text,
    'arrayBool' : IDL.Vec(IDL.Bool),
    'arrayText' : IDL.Vec(IDL.Text),
    'arrayInt' : IDL.Vec(IDL.Int),
    'arrayFloat' : IDL.Vec(IDL.Float64),
  });
  Tree.fill(
    IDL.Variant({
      'leaf' : IDL.Null,
      'node' : IDL.Tuple(
        Color,
        Tree,
        IDL.Tuple(IDL.Text, IDL.Opt(AttributeValueRBTreeValue)),
        Tree,
      ),
    })
  );
  const AttributeValue = IDL.Variant({
    'int' : IDL.Int,
    'float' : IDL.Float64,
    'tuple' : IDL.Vec(AttributeValuePrimitive),
    'blob' : IDL.Vec(IDL.Nat8),
    'bool' : IDL.Bool,
    'text' : IDL.Text,
    'tree' : Tree,
    'arrayBool' : IDL.Vec(IDL.Bool),
    'arrayText' : IDL.Vec(IDL.Text),
    'arrayInt' : IDL.Vec(IDL.Int),
    'arrayFloat' : IDL.Vec(IDL.Float64),
  });
  const ConsumableEntity = IDL.Record({
    'pk' : PK,
    'sk' : SK,
    'attributes' : IDL.Vec(IDL.Tuple(AttributeKey, AttributeValue)),
  });
  const Result = IDL.Variant({
    'ok' : IDL.Opt(ConsumableEntity),
    'err' : IDL.Text,
  });
  const ScanStoriesQuickElement = IDL.Record({
    'sortKey' : IDL.Text,
    'groupName' : IDL.Text,
  });
  const ScanStoriesQuickReturn = IDL.Record({
    'stories' : IDL.Vec(ScanStoriesQuickElement),
    'nextKey' : IDL.Opt(IDL.Text),
  });
  const StoryService = IDL.Service({
    'closeProposals' : IDL.Func([IDL.Text], [IDL.Text], []),
    'getPK' : IDL.Func([], [IDL.Text], ['query']),
    'getProposal' : IDL.Func([IDL.Text], [Result_1], ['query']),
    'getStory' : IDL.Func([IDL.Text], [IDL.Opt(SingleStory)], ['query']),
    'likeStory' : IDL.Func([IDL.Text], [Result], []),
    'putStory' : IDL.Func(
        [SingleStory, IDL.Vec(VotingProposal)],
        [IDL.Text],
        [],
      ),
    'scanAllStories' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Nat, IDL.Opt(IDL.Bool)],
        [ScanStoriesQuickReturn],
        ['query'],
      ),
    'skExists' : IDL.Func([IDL.Text], [IDL.Bool], ['query']),
    'transferCycles' : IDL.Func([], [], []),
    'voteOnProposal' : IDL.Func([IDL.Text, IDL.Text], [Result], []),
    'whoami' : IDL.Func([], [IDL.Principal], []),
  });
  return StoryService;
};
export const init = ({ IDL }) => {
  const AutoScalingCanisterSharedFunctionHook = IDL.Func(
      [IDL.Text],
      [IDL.Text],
      [],
    );
  const ScalingLimitType = IDL.Variant({
    'heapSize' : IDL.Nat,
    'count' : IDL.Nat,
  });
  const ScalingOptions = IDL.Record({
    'autoScalingHook' : AutoScalingCanisterSharedFunctionHook,
    'sizeLimit' : ScalingLimitType,
  });
  return [
    IDL.Record({
      'owners' : IDL.Opt(IDL.Vec(IDL.Principal)),
      'partitionKey' : IDL.Text,
      'scalingOptions' : ScalingOptions,
    }),
  ];
};
