'use-strict'
require('dotenv').config();
const express = require('express')
const app = express()
const port = 3000
const key = process.env.KEY;

const bodyParser = require('body-parser');
const { query } = require('express');
const { urlencoded } = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc =  require ('swagger-jsdoc');
const swaggerDocument = require('./api/swagger/swagger.json');

const cors = require("cors");
const { default: axios } = require('axios');


const ocr_endpoint = process.env.URL + '/ocr';
const image_analyze_endpoint = process.env.URL + '/analyze';
const describe_image = process.env.URL + '/describe';
const detect_image = process.env.URL + '/detect';


var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

app.use(express.static('public'));
app.use(bodyParser.json());     
app.use(bodyParser.urlencoded({     
    extended: true
}));

app.use(cors());

app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
  );

app.post("/ocr",urlencodedParser,[],async(req, res) =>{
    let url = req.body.url;
    const headers = {
        'Ocp-Apim-Subscription-Key': key
    }
    const body = {
        "url" : url
    }

    const response = axios.post(ocr_endpoint,body,{
        headers: headers
    })
    res.status(200).send({"data": (await response).data})
    
});

app.post("/analyze",urlencodedParser,[],async(req, res) =>{
    let url = req.body.url;
    const headers = {
        'Ocp-Apim-Subscription-Key': key
    }
    const body = {
        "url" : url
    }

    const response = axios.post(image_analyze_endpoint,body,{
        headers: headers
    })
    res.status(200).send({"data": (await response).data})
    
});

app.post("/describe",urlencodedParser,[],async(req, res) =>{
    let url = req.body.url;
    const headers = {
        'Ocp-Apim-Subscription-Key': key
    }
    const body = {
        "url" : url
    }

    const response = axios.post(describe_image,body,{
        headers: headers
    })
    res.status(200).send({"data": (await response).data})
    
});

app.post("/detect",urlencodedParser,[],async(req, res) =>{
    let url = req.body.url;
    const headers = {
        'Ocp-Apim-Subscription-Key': key
    }
    const body = {
        "url" : url
    }

    const response = axios.post(detect_image,body,{
        headers: headers
    })
    res.status(200).send({"data": (await response).data})
    
});



app.listen(port, () => {
    console.log(`App listening at http://http://127.0.0.:${port}`);
});



