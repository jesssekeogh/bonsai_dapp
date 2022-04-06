import Blob "mo:base/Blob";
import Hex "mo:encoding/Hex";
import Text "mo:base/Text";

import SHA256 "../src/SHA256";

let sum256 = SHA256.sum256(Blob.toArray(Text.encodeUtf8("hello world\n")));
assert(Hex.encode(sum256) == "A948904F2F0F479B8F8197694B30184B0D2ED1C1CD2A1EC0FB85D299A192A447");

let sum224 = SHA256.sum224(Blob.toArray(Text.encodeUtf8("hello world\n")));
assert(Hex.encode(sum224) == "95041DD60AB08C0BF5636D50BE85FE9790300F39EB84602858A9B430");
