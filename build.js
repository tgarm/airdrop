const path = require('path')
const fs = require('fs')

const dir = path.join(__dirname, 'public')

const dist = {}

fs.readdir(dir, function (err, files){
    if(!err){
        files.forEach(function(file){
            const body = fs.readFileSync(path.join(dir,file), {encoding:'utf8'})
            dist[file] = body
        })
        if('index.html' in dist){
            dist['/'] = ''
        }
        fs.writeFileSync('dist.json', JSON.stringify(dist))
    }
})
