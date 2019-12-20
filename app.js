//jshint esversion:6
const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/", function(req, res){
  res.sendFile(__dirname+"/signup.html");
});
app.post("/",function(req, res){
  var fname = req.body.fname;
  var lname = req.body.lname;
  var email = req.body.email;
  var data = {
    members: [
      {email_address: email,
       status: "subscribed",
       merge_fields: {
         FNAME: fname,
         LNAME: lname
       }
      }
    ]
  };
  var jsonData = JSON.stringify(data);
  var options = {
    url: "https://us4.api.mailchimp.com/3.0/lists/aa0a9b69ad",
    method: "POST",
    headers: {
      "Authorization" : "rohit1 b67e32ada5da6b8b397394239f8d1daf-us4"
    },
   body: jsonData
  };
  request(options, function(error, response, body){
    if(error) {
      console.log(error);
      res.sendFile(__dirname+"/failure.html");
    }
    else{
      if(response.statusCode == 200)
        res.sendFile(__dirname+"/success.html");
      else
         res.sendFile(__dirname+"/failure.html");
    }
  });
});
app.post("/failure", function(req, res){
  res.redirect("/");
});
app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
});
//api key: b67e32ada5da6b8b397394239f8d1daf-us4
//id: aa0a9b69ad
