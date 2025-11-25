import 'dotenv/config';
import express from 'express';
import taskRoutes from './routes/tasksRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import { connectDB } from './config/db.js';
import cors from 'cors';
import path from 'path';

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

const app = express();
app.use(express.json());

//middlewares
app.use(express.json()); 

if(process.env.NODE_ENV !== 'production'){
    app.use(cors({origin: 'http://localhost:5173'}));
}

app.use("/api/tasks", taskRoutes);
app.use("/api/messages", messageRoutes);

if(process.env.NODE_ENV == 'production'){
    app.use(express.static(path.join(__dirname, "../fe/dist")));
    app.use((req, res) => {
        res.sendFile(path.join(__dirname, "../fe/dist/index.html"));
    });
}

connectDB().then(async ()=>{
    app.listen(PORT, ()=>{
        console.log(`Server initialize sucessfully ${PORT}`)
    });
})

