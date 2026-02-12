import express  from "express";
import cors from "cors"
import"dotenv/config"

import user from "./app/routes/user.routes"
import login from "./app/routes/login.routes"

const app = express()
const port = process.env.PORT_WEB


app.use(cors())
app.use(express.json())

app.use("/user", user)
app.use("/login", login)

app.listen(port, ()=>{
    console.log(`Discordo no ar 🚀   http://localhost:${port}`)
})