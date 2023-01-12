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
  const AuthorDetails = IDL.Record({
    'bio' : IDL.Text,
    'pseudonym' : IDL.Text,
    'nftProfilePic' : IDL.Text,
  });
  const Result_3 = IDL.Variant({
    'ok' : IDL.Opt(AuthorDetails),
    'err' : IDL.Text,
  });
  const VotingProposal = IDL.Record({
    'title' : IDL.Text,
    'votes' : IDL.Int,
    'body' : IDL.Text,
    'open' : IDL.Bool,
    'proposalNumber' : IDL.Int,
  });
  const Result_2 = IDL.Variant({
    'ok' : IDL.Opt(VotingProposal),
    'err' : IDL.Text,
  });
  const Result_1 = IDL.Variant({
    'ok' : IDL.Vec(IDL.Opt(VotingProposal)),
    'err' : IDL.Text,
  });
  const SingleStory = IDL.Record({
    'title' : IDL.Text,
    'responses' : IDL.Int,
    'views' : IDL.Int,
    'body' : IDL.Text,
    'time' : IDL.Int,
    'author' : IDL.Text,
    'likes' : IDL.Int,
    'genre' : IDL.Text,
    'address' : IDL.Text,
    'proposals' : IDL.Int,
    'groupName' : IDL.Text,
    'monetizedAddress' : IDL.Text,
    'monetized' : IDL.Bool,
  });
  const Result = IDL.Variant({
    'ok' : IDL.Opt(ConsumableEntity),
    'err' : IDL.Text,
  });
  const ScanStoriesResult = IDL.Record({
    'stories' : IDL.Vec(SingleStory),
    'nextKey' : IDL.Opt(IDL.Text),
  });
  const ScanStoriesQuickElement = IDL.Record({
    'sortKey' : IDL.Text,
    'genre' : IDL.Text,
    'groupName' : IDL.Text,
  });
  const ScanStoriesQuickReturn = IDL.Record({
    'stories' : IDL.Vec(ScanStoriesQuickElement),
    'nextKey' : IDL.Opt(IDL.Text),
  });
  const StoryService = IDL.Service({
    'checkIfLiked' : IDL.Func([IDL.Text], [IDL.Bool], ['query']),
    'checkIfVoted' : IDL.Func([IDL.Text], [IDL.Bool], ['query']),
    'closeProposals' : IDL.Func([IDL.Text], [IDL.Text], []),
    'deleteStory' : IDL.Func([IDL.Text], [IDL.Opt(ConsumableEntity)], []),
    'getAuthorDetails' : IDL.Func([IDL.Text], [Result_3], ['query']),
    'getPK' : IDL.Func([], [IDL.Text], ['query']),
    'getProposal' : IDL.Func([IDL.Text], [Result_2], ['query']),
    'getProposals' : IDL.Func([IDL.Text], [Result_1], ['query']),
    'getStory' : IDL.Func([IDL.Text], [IDL.Opt(SingleStory)], ['query']),
    'incrementView' : IDL.Func([IDL.Text], [IDL.Opt(ConsumableEntity)], []),
    'likeStory' : IDL.Func([IDL.Text], [Result], []),
    'putAuthorDetails' : IDL.Func([AuthorDetails], [IDL.Text], []),
    'putStory' : IDL.Func(
        [SingleStory, IDL.Vec(VotingProposal)],
        [IDL.Text],
        [],
      ),
    'scanAllFullStories' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Nat, IDL.Opt(IDL.Bool)],
        [ScanStoriesResult],
        ['query'],
      ),
    'scanAllStories' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Nat, IDL.Opt(IDL.Bool)],
        [ScanStoriesQuickReturn],
        ['query'],
      ),
    'skExists' : IDL.Func([IDL.Text], [IDL.Bool], ['query']),
    'transferCycles' : IDL.Func([], [], []),
    'voteOnProposal' : IDL.Func([IDL.Text, IDL.Text], [Result], []),
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
