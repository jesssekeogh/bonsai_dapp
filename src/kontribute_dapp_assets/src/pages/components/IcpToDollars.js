import { e8sToIcp } from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";

const CoinApi =
  "https://api.coingecko.com/api/v3/simple/price?ids=internet-computer&vs_currencies=usd";

const IcpToDollars = async (e8sIcp) => {
  try{
    let resp = await fetch(CoinApi).then((x) => x.json());
    let price = resp["internet-computer"].usd;
  
    let formatCurrency = new Intl.NumberFormat("en-US", {
      style: 'currency',
      currency: 'USD',
    });
  
    return formatCurrency.format(price * e8sToIcp(e8sIcp));
  } catch (e){
    return "$0.00"
  }
};

export default IcpToDollars;
