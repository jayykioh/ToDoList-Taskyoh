import 'dotenv/config';
import express from 'express';
import taskRoutes from './routes/tasksRoutes.js'
import { connectDB } from './config/db.js';

const PORT = process.env.PORT || 5001;

const app = express();
app.use(express.json());


app.use(express.json()); 

app.use("/api/tasks", taskRoutes);
connectDB().then(()=>{
app.listen(PORT, ()=>{
    console.log(`Server initialize sucessfully ${PORT}`)
});

})

