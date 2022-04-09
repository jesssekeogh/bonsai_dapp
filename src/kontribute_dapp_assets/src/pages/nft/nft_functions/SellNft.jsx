import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { nft_burn, useAnvilDispatch, useAnvilSelector } from "@vvv-interactive/nftanvil-react";
import { tokenToText } from "@vvv-interactive/nftanvil-tools/cjs/token.js";
import { nft_set_price } from "@vvv-interactive/nftanvil-react/src/reducers/nft.js";


const SellNft = ({ tokenId }) => {
  const dispatch = useAnvilDispatch();
  // const loaded = useAnvilSelector((state) => state.user.map.history);

  const Burn = async () => {
    let burned = await dispatch(nft_burn({ id: tokenToText(tokenId) }));
    console.log(burned);
  };

  // const SetPrice = async () => {
  //   if (loaded) {
  //     let set = await dispatch(nft_set_price({id: tokenToText(tokenId), price: 50000}))
  //     console.log(set)
  //   }
  // }

  return (
    <div>
      <Menu>
        <MenuButton
          size={"sm"}
          backgroundColor={"#1e212b"}
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          color="#fff"
          colorScheme="#1e212b"
          variant="outline"
          me={0}
          ms={-5}
        />
        <MenuList>
          <MenuItem onClick={() => Burn()}>Burn NFT</MenuItem>
          {/* <MenuItem onClick={() => SetPrice()}>Sell NFT</MenuItem> */}
        </MenuList>
      </Menu>
    </div>
  );
};

export default SellNft;
