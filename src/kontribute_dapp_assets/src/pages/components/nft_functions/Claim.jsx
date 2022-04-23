import authentication from "@vvv-interactive/nftanvil-react/cjs/auth.js";
import * as AccountIdentifier from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";
import { createItoActor } from "../../../../../declarations/ito.js";

const Claim = () => async (dispatch, getState) => {
  const s = getState();

  let address = AccountIdentifier.TextToArray(s.user.address);

  let subaccount = [
    AccountIdentifier.TextToArray(s.user.subaccount) || null,
  ].filter(Boolean);

  let ito = createItoActor({
    agentOptions: authentication.getAgentOptions(),
  });

  let owned = await ito.owned(address);
  if (owned.err) throw new Error(owned.err);

  let tokens = owned.ok.tokens.filter(Boolean);

  let claimed = await Promise.all(
    tokens.map((tid) => {
      return ito.claim(address, subaccount, tid);
    })
  );

  // console.log(tokens, claimed);
};

export default Claim;