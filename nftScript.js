const data = require('./input.js');
//let data = []; // for first one
const quality = 4;
const namex = "Zhu Luoli";
const tags = ["Bonsai Warrior"];
const lore = "The Academy is a new beginning for Zhu Luoli. She grew up in the Imperial capital, surrounded by court intrigue and politics. Here she can escape the games of the powerful.";
const authorShare = 150;
const content = "Zhu_Luoli"; //has to be the name from the folder and image
const thumb = content;

for (let i = 1; i < 26; i++) {
  data.push({
    quality: quality,
    name: namex,
    tags: tags,
    attributes: {
      physical: Math.round(Math.random() * (100 - 0) + 0),
      mental: Math.round(Math.random() * (100 - 0) + 0),
      social: Math.round(Math.random() * (100 - 0) + 0),
    },
    lore: lore,
    authorShare: authorShare,
    content:
      "./Bonsai_Warriors/" +
      content +
      "/content/" +
      content +
      "_" +
      i.toString() +
      ".png",
    thumb:
      "./Bonsai_Warriors/" +
      thumb +
      "/thumb/" +
      thumb +
      "_" +
      i.toString() +
      ".png",
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
