const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const uuid = require("uuid")
app.use(cors());
app.use(express.json());
mongoose
  .connect("mongodb+srv://divyanshuloharcs:12348765@employeedb.g3rlsp2.mongodb.net/EmployeeDB?retryWrites=true&w=majority")
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.log(err));

const employeeSchema = new mongoose.Schema({
    _id2: String,
    _id: String,
    name: String,
    age: Number,
    address: String,
    department: String,
    status: String
});

const Employee = mongoose.model("Employee", employeeSchema);

app.delete("/api/delete/:_id", async (req, res) => {
    try {
      await Employee.findByIdAndDelete(req.params._id);
      res.send({status: "ok"});
    } catch (err) {
      console.log(err);
      res.status(500).send({status: "error"});
    }
  });

app.post("/api/submit", (req,res)=>{
    console.log(req.body);
    const newEmployee = new Employee({
        _id2: uuid.v4(),
        _id: uuid.v4(),
        name: req.body.name,
        age: req.body.age,
        address: req.body.address,
        department: req.body.department,
        status: req.body.status,
    });
    newEmployee.save();
    res.send({status: "ok"});
});

app.get("/getData", async(req,res)=>{
    try{
        const allData = await Employee.find();
        res.send({status: "ok", data: allData})
    } catch(error){
        console.log(error);
    }
})

app.put("/api/update/:_id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params._id);
    employee.name = req.body.name;
    employee.age = req.body.age;
    employee.address = req.body.address;
    employee.department = req.body.department;
    employee.status = req.body.status;
    await employee.save();
    res.send({status: "ok"});
  } catch (err) {
    console.log(err);
    res.status(500).send({status: "error"});
  }
});


app.listen(2000, ()=>{
    console.log("server started at port 2000");
});
