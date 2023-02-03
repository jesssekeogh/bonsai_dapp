const data = require("./input.js");
// let data = []; // for first one
const quality = 6;
const namex = "Noblebright #";
const tags = ["Comic"];
const lore =
  "The artifacts of these mighty people have been left scattered across the lands. Claiming the Noblebright - A Device that empowers its holder with godlike strength - only a few of these exist.";
const authorShare = 1000;
// const content = "Zhu_Luoli";
// const thumb = content;

for (let i = 1051; i < 1081; i++) {
  data.push({
    quality: quality,
    name: namex + i,
    tags: tags,
    attributes: {
      dust: Math.round(Math.random() * (100 - 0) + 0),
      academic: Math.round(Math.random() * (100 - 0) + 0),
      knowledge: Math.round(Math.random() * (100 - 0) + 0),
    },
    lore: lore,
    authorShare: authorShare,
    content:
      "./Noblebright/noblebright_comic.png",
    thumb:
      `./Noblebright/noblebright_thumb_${i}.jpg`,
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
