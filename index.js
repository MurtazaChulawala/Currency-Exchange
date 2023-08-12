// importing the express and axios packages 
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import {} from 'dotenv/config'
const key= process.env.API_KEY;

// creating an app variable
const app = express();

// setting the public folder as the static file location
app.use(express.static("public"));

// using bodyParser as a middleware for getting the form data.
app.use(bodyParser.urlencoded({extended:true}));

// key for using api

// creating a get request page to cater the get request made from the browser to the server.
app.get("/",(req,res)=>{
    res.render("index.ejs");
})

// creating a app.post method to get the form data to the backend and perform the required option.
app.post("/",async (req,res)=>{
    var firstCurrency = req.body.firstCurrency;
    var secondCurrency = req.body.secondCurrency;
    var amount = req.body.amount;
    try {
        const result = await axios.get("https://v6.exchangerate-api.com/v6/"+key+"/pair/"+firstCurrency+"/"+secondCurrency+"/"+amount);
        const conversion = result.data.conversion_result;
        res.render("index.ejs",{content:conversion, Currency:secondCurrency});            
    } catch (error) {
        res.statusCode(500);
        console.log(error.response.data);
    }
})
// listening on a port to handle the requests
app.listen(3000,(req,res)=>{
    console.log("server listening on port 3000");
})