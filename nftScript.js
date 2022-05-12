const quality = 1
const namex = "name"
const tags = ["Bonsai Warrior"]
const attributes = {physical : 100, mental: 100, social : 100}
const lore = "lore"
const authorShare = 150
const content = "path-to-content-img"
const thumb = "path-to-thumb-img"
const level = "level 1-9"

myData = []

for(let i = 1; i < 26; i++){
    myData.push(
        {
            quality: quality,
            name: namex,
            tags: tags,
            attributes: attributes,
            lore: lore,
            authorShare: authorShare,
            content: content + "_" + i.toString(),
            thumb : thumb + "_" +  i.toString()
        }
    )
}

jsonData = JSON.stringify(myData);

var fs = require('fs');

fs.writeFile("input.js", jsonData, (err) => {
    if (err)
        console.log(err)
    else {
        console.log("Nfts meta data created successfully")
    }
})
