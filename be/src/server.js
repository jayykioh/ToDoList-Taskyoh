import express from 'express';
import taskRoutes from './routes/tasksRoutes.js'

const app = express();
app.use(express.json());

app.use("/api/tasks", taskRoutes);

app.listen(5001, (err) => {
    if (err) {
        console.error('Error starting server:', err);
    } else {
        console.log('Server is running on port 5001');
    }
});