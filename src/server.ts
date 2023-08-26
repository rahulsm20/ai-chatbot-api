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
import { searchConversations } from "./controllers/search";
import authMiddleware from "./middleware/auth";
import cookieParser from 'cookie-parser'
app.use(express.json());
app.use(cors())
app.use(cookieParser())

client.sync().then(()=>{
  console.log('Connected to DB')
})
app.get("/", (req, res) => {
  res.json("Home");
});

app.use("/users",userRoutes)
app.use("/chatbots",authMiddleware,chatbotRoutes)
app.use("/conversations",authMiddleware,conversationRoutes)
app.use("/endusers",authMiddleware,endUserRoutes)
app.get('/search',searchConversations);

const port = process.env.PORT
app.listen(port, () => {
  console.log(`Listening on port ${port}` );
});

export const handler = serverless(app);