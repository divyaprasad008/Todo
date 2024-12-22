import express from "express"
import userRouter from "./src/routes/auth.router.js"

const app  = express()
app.use(express.json())

let port = process.env.PORT || 3232

app.use("/",userRouter);
// app.use("/",projectRouter);
// app.use("/",tasksRouter);
// app.use("/",commentRouter);

// app.use("/",userRouter);

app.listen(port,()=>{
    console.log(`App started on port ${port}`)
})