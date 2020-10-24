const app = require("express")();

app.get("/", (req, res)=>{
    res.sendFile(__dirname + "/homePage.html");
})

app.listen(2323, ()=>{
    console.log("Client is running at 2323");
})