import authentication from "@vvv-interactive/nftanvil-react/cjs/auth.js";
import * as AccountIdentifier from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";
import { accountCanister } from "@vvv-interactive/nftanvil-canisters/cjs/account.js";
import { PrincipalFromSlot } from "@vvv-interactive/nftanvil-tools/cjs/principal.js";
import { createCollectionActor } from "../../../../../declarations/collection.js";

export const get_mine = () => async (dispatch, getState) => {
  let s = getState();
  if (!s.user.map.account?.length) return null;
  let address = s.user.address;

  let can = PrincipalFromSlot(
    s.user.map.space,
    AccountIdentifier.TextToSlot(address, s.user.map.account)
  );

  let acc = accountCanister(can, {
    agentOptions: authentication.getAgentOptions(),
  });

  let pageIdx = 0;
  let max = 100;
  let final = [];
  do {
    let list = await acc.list(
      AccountIdentifier.TextToArray(address),
      pageIdx * max,
      (pageIdx + 1) * max
    );

    list = list.filter((x) => x !== 0n).map((x) => Number(x));

    if (list.length === 0) break;

    final.push(...list);
    pageIdx++;
  } while (true);

  return final;
};

export const claim = () => async (dispatch, getState) => {
  const s = getState();

  let address = AccountIdentifier.TextToArray(s.user.address);

  let subaccount = [
    AccountIdentifier.TextToArray(s.user.subaccount) || null,
  ].filter(Boolean);

  let collection = createCollectionActor({
    agentOptions: authentication.getAgentOptions(),
  });

  let owned = await collection.owned(address);
  if (owned.err) throw new Error(owned.err);

  let tokens = owned.ok.tokens.filter(Boolean);

  let claimed = await Promise.all(
    tokens.map((tid) => {
      return collection.claim(address, subaccount, tid);
    })
  );

  // console.log(tokens, claimed);
};
