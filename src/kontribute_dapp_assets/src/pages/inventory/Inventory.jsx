import React, { useState, useEffect } from "react";
import {
  useAnvilDispatch,
  useAnvilSelector,
} from "@vvv-interactive/nftanvil-react";
import authentication from "@vvv-interactive/nftanvil-react/cjs/auth.js";
import * as AccountIdentifier from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";
import { accountCanister } from "@vvv-interactive/nftanvil-canisters/cjs/account.js";
import { PrincipalFromSlot } from "@vvv-interactive/nftanvil-tools/cjs/principal.js";
import { createCollectionActor } from "../../../../declarations/collection.js";
import { Image as ChakraImage } from "@chakra-ui/react";
import { tokenUrl } from "@vvv-interactive/nftanvil-tools/cjs/token.js";

const get_mine = () => async (dispatch, getState) => {
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

const Inventory = () => {
  const [data, setData] = useState([]);
  const dispatch = useAnvilDispatch();
  const loaded = useAnvilSelector((state) => state.user.map.history);
  const map = useAnvilSelector((state) => state.user.map);
  
  const [Loaded, setLoaded] = useState(false);

  const load = async () => {
    setData(await dispatch(get_mine()));
    setLoaded(true);
  };

  useEffect(() => {
    if (loaded) {
      dispatch(claim());
      load();
    }
  }, []);
  console.log(data);
  return (
    <div>
      {Loaded ? (
        <ChakraImage
          bg="#fff"
          rounded={"lg"}
          height={["300px", null, "400px"]}
          width={"auto"}
          objectFit={"cover"}
          src={tokenUrl(map.space, data[0], "content")}
        />
      ) : null}
    </div>
  );
};

export default Inventory;
