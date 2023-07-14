const express = require('express')
const bodyParser=require('body-parser')
const request=require('request');
const https=require('https')
const app = express()
const port = 3000


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) => {
  res.sendFile(__dirname+"/signup.html");
})


app.post("/",(req,res)=>{
    const firstName=req.body.fName;
    const lastName=req.body.lName;
    const Email=req.body.Email;

    var data={
        members:[
            {
                email_address: Email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData=JSON.stringify(data);

    const url="https://us8.api.mailchimp.com/3.0/lists/4981549b41";

    const options = {
        method:"POST",
        auth:"Bhavansh:b036cf347f2085e77fb6cb99c3b36a40-us8"
    }

    const request = https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname+'/success.html');
        }
        else{
            res.sendFile(__dirname+'/failure.html');
        }


        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})