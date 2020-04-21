const express = require('express');
const cors = require('cors');
const routesv1 = require('./v1/routes');

const app = express();

app.use(express.json());
app.use(cors());
app.use(routesv1);


app.listen(3333);
