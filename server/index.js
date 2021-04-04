const app = require('express')();
const httpServer = require("http").createServer(app);
const io = require('socket.io')(httpServer);

const config = require('./config');
const routes = require('./routes');
const { sendMessage } = require('./services/userServices');

require('./config/express')(app);
require('./config/mongoose')(app);

app.use(routes);

io.on('connection', async socket => {
    const id = socket.handshake.query.id;
    socket.join(id);
    socket.on('send-message', async ({ lastClicked, message }) => {
        try {
            const conversation = await sendMessage({userId: id, friendId: lastClicked, message});
            //it is not a good idea to get all messages every time...
            // io.emit('receive-message', messages[messages.lenght - 1]);
            io.emit('receive-message', conversation.messages, socket.id);
        } catch (error) {
            console.log(error);            
        }
    });

    // socket.on('disconnect', () => {
    //     console.log(id + ' left the room');
    // })
})

httpServer.listen(8000, '192.168.0.20');
// app.listen(config.PORT, () => console.log(`Server is running on port http://localhost:${config.PORT}...`));
