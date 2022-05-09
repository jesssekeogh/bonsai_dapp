const quality = 1
const namex = "name"
const tags = ["tag1", "tag2"]
const attributes = {attribute1: 99, attribute2: 99}
const lore = "lore"
const authorShare = 100
const content = "path-to-content-img"
const thumb = "path-to-thumb-img"

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
