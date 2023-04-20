import  express  from "express";
import router from "./routes/authRoutes.js";
import Noterouter from "./routes/noteRoutes.js";
import cors from "cors"
const app = express()

app.use(cors())
app.use((req , res , next) => {
    res.set("Access-Control-Allow-Origin" , "*");
    res.set("Access-Control-Allow-Headers" , "*");
    res.set("Access-Control-Allow-Methods" , "*");
    if(res.method =="OPTIONS"){
        res.status(200).end();
        return;
    }
    next();
})
app.use(express.json());
app.use("/api/v1/auth" , router)
app.use("/api/v1/note" , Noterouter)
export default app