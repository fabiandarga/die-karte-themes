const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT;

app.use(cors({
    origin: [/^http:\/\/localhost/, /die-karte\.de$/]
}))

app.use('/', express.static('dist'))

app.listen(port, () => {
    console.log(`Theme Server started at http://localhost:${port}` )
})