const express = require('express');

const config = require('./config');

const app = express();

require('./config/express')(app);
require('./config/mongoose')(app);

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    res.sendStatus(200);
})

app.listen(config.PORT, () => console.log(`Server is running on port http://localhost:${config.PORT}...`));
