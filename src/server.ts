import app from "./app"

const port=process.env.NODE_ENV==="test"?process.env.TEST_PORT : process.env.PORT

app.listen(port,()=>{
    console.log(`server running on ${port}`)
})