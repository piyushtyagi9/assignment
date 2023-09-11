const exp = require('express')
const cors=require("cors");
const mongoose = require('mongoose');
const tableRoutes = require('./api/tableroutes')

//const seedDB = require('./seed.js')




const app = exp()

app.use(exp.json());
app.use(exp.urlencoded({ extended: true }))
mongoose.connect('mongodb://127.0.0.1:27017/person')
.then(()=>{console.log("db connected")})
.catch((err)=>{console.log(err)})
.catch((err)=>{
    console.log(err.msg);
})

//seedDB()


app.use(cors({origin:['http://localhost:3000']})) 



app.use(tableRoutes)

app.listen(8000, ()=> {
    console.log("server started")
})

