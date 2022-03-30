import React from "react";
import { useAnvilSelector } from "@vvv-interactive/nftanvil-react";
import React, { useEffect, useState } from "react";
import {
  encodeTokenId,
  decodeTokenId,
  tokenUrl,
  ipfsTokenUrl,
  tokenToText,
  tokenFromText,
} from "@vvv-interactive/nftanvil-tools/cjs/token.js";
import {
  TestAnvilComponent,
  useAnvilDispatch,
  useAnvilSelector,
  user_login,
  user_logout,
  nft_fetch,
} from "@vvv-interactive/nftanvil-react";
import * as AccountIdentifier from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";

// testing component for anvil tools
const Anvil = () => {
  const loaded = useAnvilSelector((state) => state.user.map.history); //map needs to be loaded for anvil functions to work
  if (!loaded) return null;

  return (
    <>
      <h1>Anvil Test</h1>
      <User />
    </>
  );
};

export default Anvil;

const User = () => {
  const dispatch = useAnvilDispatch();
  const address = useAnvilSelector((state) => state.user.address);
  const icp = AccountIdentifier.e8sToIcp(
    useAnvilSelector((state) => state.user.icp)
  );

  return (
    <div className="user">
      <div className="address">
        your address
        <br />
        {address}
      </div>
      <div className="icp">{icp} ICP</div>
      <div className="actions">
        {address ? (
          <button
            onClick={() => {
              dispatch(user_logout());
            }}
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => {
              dispatch(user_login());
            }}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};