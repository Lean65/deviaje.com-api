const server = require('./src/app')
const { conn } = require('./src/db')

conn.sync().then(()=>{
    server.listen(3001, ()=>{console.log('listening')})
})