import express  from "express";
import cors from "cors"
import"dotenv/config"
import "reflect-metadata"

const app = express()
const port = process.env.PORT


app.use(cors())
app.use(express.json())


app.listen(port, ()=>{
    console.log(`Discordo no ar 🚀   http://localhost:${port}`)
})