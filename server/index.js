const app = require('express')();
const httpServer = require("http").createServer(app);
const io = require('socket.io')(httpServer);

const config = require('./config');
const routes = require('./routes');
const { sendMessage } = require('./services/userServices');

require('./config/express')(app);
require('./config/mongoose')(app);

app.use(routes);

io.on('connection', socket => {
    const id = socket.handshake.query.id;
    socket.join(id);
    console.log(id);
    socket.on('send-message', async ({ lastClicked, message }) => {
        const conversation = await sendMessage({userId: id, friendId: lastClicked, message});
        console.log(conversation);
        io.emit('receive-message', conversation.messages);
    })

    // socket.on('disconnect', () => {
    //     console.log(id + ' left the room');
    // })
})

httpServer.listen(config.PORT);
// app.listen(config.PORT, () => console.log(`Server is running on port http://localhost:${config.PORT}...`));
