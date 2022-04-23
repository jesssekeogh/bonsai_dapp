import { createItoActor } from "../../../../../declarations/ito.js";
import authentication from "@vvv-interactive/nftanvil-react/cjs/auth.js";

const CollectionStats = () => async (dispatch, getState) => {
    let ito = createItoActor({
      agentOptions: authentication.getAgentOptions(),
    });
    
    let stats = await ito.stats();

    return stats;
};

export default CollectionStats;
