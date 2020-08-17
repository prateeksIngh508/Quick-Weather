const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){

      res.sendFile(__dirname+"/index.html");
  });
  app.post("/",function(req,res){
      const name=req.body.cityname;
     const apiKey="cba249a611b47182f2c71f06a84834a3";
      const url="https://api.openweathermap.org/data/2.5/weather?q="+name+"&appid="+apiKey+ "&units=metric";
      https.get(url,function(response){
        console.log(response.statusCode);
       response.on("data",function(data){

        const weatherData=JSON.parse(data);
        const temp=weatherData.main.temp;
        const weatherDescription=weatherData.weather[0].description;
        const icon=weatherData.weather[0].icon;
        const imageURL="http://openweathermap.org/img/wn/"+icon+"@2x.png";
        console.log(weatherDescription);
        res.write("<p>Weather currently is "+weatherDescription+"</p>");
        res.write("<h1>Temperature in "+name+"is "+temp+" degree Celcius</h1>");
        res.write("<img src="+imageURL+">");
        res.send();
      });
    });
});

app.listen(3000,function(){
  console.log("Server is running on port 3000");
});
