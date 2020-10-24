
const app = require('express')();
const parser = require("body-parser");
const fs = require("fs");
const dir = __dirname;


app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());


let emp = [];

function readData(){
    const filename = "data.json";
    const jsonContent = fs.readFileSync(filename, 'utf-8');
    emp = JSON.parse(jsonContent);
}

function saveData(){
    const filename = "data.json";
    const jsonData = JSON.stringify(emp);
    fs.writeFileSync(filename, jsonData, 'utf-8');
}
app.get("/emp", (req, res)=>{
    readData();
    res.send(JSON.stringify(emp));    
})

app.get("/emp/:id", (req, res)=>{
    const Id = req.params.id;
    if(emp.length == 0){
        readData();
    }
    let foundRec = emp.find((e) => e.Id == Id);
    if(foundRec == null)
        throw "Employee not found";
    res.send(JSON.stringify(foundRec))
})

app.put("/emp", (req, res)=>{
    if(emp.length == 0)
        readData();
    let body = req.body;
   
    for (let index = 0; index < emp.length; index++) {
        let e = emp[index];
        if (e.Id == body.Id) {
            e.name = body.name;
            e.address = body.address;
            e.phone = body.phone;
            saveData();
            res.send("Employee updated successfully");
        }
    }
    
})

app.post('/emp', (req, res)=>{
    if (emp.length == 0)
        readData();
    let body = req.body;
    emp.push(body);  
    saveData();
    res.send("Employee added successfully");
})

app.listen(1234, ()=>{
    console.log("Server available at 1234");
})