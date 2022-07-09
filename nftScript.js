const data = require("./input.js");
// let data = []; // for first one
const quality = 6;
const namex = "Arthur's Knight #";
const tags = ["Knight"];
const lore =
  "Join Arthur on his adventure throughout Camelot and beyond! Discover the secrets and mysteries that lie before him.";
const authorShare = 150;
// const content = "Zhu_Luoli";
// const thumb = content;

for (let i = 1176; i < 1201; i++) {
  data.push({
    quality: quality,
    name: namex + i,
    tags: tags,
    attributes: {
      physical: Math.round(Math.random() * (100 - 0) + 0),
      mental: Math.round(Math.random() * (100 - 0) + 0),
      social: Math.round(Math.random() * (100 - 0) + 0),
    },
    lore: lore,
    authorShare: authorShare,
    content:
      "./Pendragon_Quest/Arthur_s_Knight_" + String(i).padStart(5, 0) + ".png",
    thumb:
      "./Pendragon_Quest/Arthur_s_Knight_" + String(i).padStart(5, 0) + ".png",
  });
}

jsonData = JSON.stringify(data);

var fs = require("fs");

fs.writeFile("input.js", "module.exports =" + jsonData, (err) => {
  if (err) console.log(err);
  else {
    console.log("Nfts meta data created successfully");
  }
});
