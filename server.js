const express = require("express")
const app = express()
require("dotenv").config()
app.use(express.json())

students = [
    {
        id: 1,
        name: "sultan",
        marks: [24,34,25],
    },
    {
        id: 2,
        name: "pradeep",
        marks: [24,34,25],
    },
    {
        id: 3,
        name: "ajay",
        marks: [24,34,25],
    }
]
app.get("/students",(req, res)=>{
    res.json(students)
})
app.get("/students/:id",(req, res)=>{
    const id = req.params.id
    const student = students.find(s=>s.id==id)

    if (student){
        res.json(student)
    }
    else {
        res.json({
            msg:"student not found"
        })
    }
})


app.post("/students",(req, res)=>{
    const body = req.body
    const id = body.id
    const idPresent = students.some(x=>x.id==id)
    if (idPresent){
        res.json({
            msg:`student with id ${id} already exist`
        })
    }
    else{
        students.push(body)
        res.json({
            msg:"students object created"
        })
    } 
})

app.delete("/students/:id",(req, res)=>{
    const id = req.params.id
    
    const size1 = students.length
    const arr1 = students.filter(s=>s.id!=id)

    
    if (arr1.length==size1){
        res.json({
            msg:`student with id ${id} not found`
        })
    }
    else {
        students= arr1
        res.json({
            msg:"student object deleted"
        })
    }
})


app.put("/students/:id",(req, res)=>{
    const id = req.params.id 
    const isNotPrestnt = !students.some(s=>s.id==id)
    if (isNotPrestnt){
        res.json({
            msg:`student with id ${id} not found`
        })
    }else
    {
        const student = req.body 
        const index = students.findIndex(s=>s.id==id)
        students[index]={
            id:id,
            ...student
        }
        res.json({
            msg:`student object with id ${id} modified`
        })
    }
    
})





const port = process.env.PORT  || 3000
app.listen(port,()=>{
    console.log(`server started at ${port}`);

})