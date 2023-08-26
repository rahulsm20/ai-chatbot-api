import express from "express";
import client from "./db/connect";
const app = express();
import userRoutes from './routes/users'
import chatbotRoutes from "./routes/chatbot"
import conversationRoutes from './routes/conversations'
import endUserRoutes from './routes/endusers'
import serverless from 'serverless-http'
import cors from 'cors'
import 'dotenv/config'
app.use(express.json());
app.use(cors())

client.sync().then(()=>{
  console.log('Connected to DB')
})
app.get("/", (req, res) => {
  res.json("Home");
});

app.use("/users",userRoutes)
app.use("/chatbots",chatbotRoutes)
app.use("/conversations",conversationRoutes)
app.use("/endusers",endUserRoutes)

app.listen(5000, () => {
  console.log("Listening on port 5000");
});

export const handler = serverless(app);