import Task from "../models/Task.js";

export const getAllTask = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 }); // newest first
        res.status(200).json(tasks);
    } catch (error) {
        console.error("Error when get all tasks", error);
        res.status(500).json({ message: "System error get All Tasks" });
    }
};


export const deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);

        if (!deletedTask) {
            return res.status(404).json({ message: "Task is not available" });
        }

        res.status(200).json(deletedTask);
    } catch (error) {
        console.error("Error when deleting task", error);
        res.status(500).json({ message: "System error when deleting task" });
    }
};

export const createTask = async (req, res) => {
    try {
        const { title } = req.body;
        const task = new Task({ title });
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (error) {
        console.error("Error when creating task", error);
        res.status(500).json({ message: "System error when creating task" });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { title, status, completedAt } = req.body;

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { title, status, completedAt },
            { new: true, runValidators: true }   // thêm runValidators để check enum
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task is not available" });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        console.error("Error when update task", error);
        res.status(500).json({ message: "System error when update task" });
    }
};
