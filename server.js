var express = require("express")
var mongoose = require("mongoose")
var request = require("request")
var cheerio = require("cheerio")
var app = express()
var article = [
    {
        name: "China lands on the far side of the moon",
        url:"jaidmernisigs"
        
    }
]


//get route
app.get("/data", function(req, res){
    res.send(article)
})


//scrape route
app.get("/scrape", function(req, res){
    request("https://www.nytimes.com/", function(error, response, body){
        var articleArray =[]
       var $ = cheerio.load(body)
       $("article").each(function(eachItem){
           var url = $(this).children("div").children("div").children("a").attr("href")
           if(url){
               articleArray.push({
                   url:url
               })
           }
       
       })
       res.send(articleArray)
    })
})




// server up react front-end from this method
app.use(express.static("./client/build"))

app.listen(3000)