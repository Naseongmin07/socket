const express =require('express')
const app = express()
const socket = require('socket.io')
const http = require('http')
const server = http.createServer(app);
const io = socket(server)
const nunjucks = require('nunjucks')

app.set('view engine','html')
app.use(express.static('./node_modules/socket.io/client-dist'))

nunjucks.configure('views',{
    express:app,
})

app.get('/',(req,res)=>{
    res.render('index')
})

io.sockets.on('connection',(socket)=>{
    socket.on('send',(data)=>{
        console.log(`클라이언트에서 받은 메세지는 ${data.msg}`)
        socket.broadcast.emit('call',data.msg)
    })
})

server.listen(3000,()=>{
    console.log('server start port 3000')
})
