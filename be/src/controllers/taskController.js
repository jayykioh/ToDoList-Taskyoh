import Task from '../models/Task.js'
function getMonday(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0,0,0,0);
  return d;
}
export const getAllTask = async (req, res) => {
  const {filter = 'today'} = req.query;
  const now = new Date();
  let startDate;

  switch(filter){
    case 'today': {
    startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    }
  
      case 'week': {
        const mondayDate = now.getDate() - (now.getDay() - 1 ) - (now.getDay() === 0 ? 7 : 0);
        // option 2
        // const mondayDate = getMonday(now);
        
        startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate);
        break;
      }
    case 'month':{
startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    }
    case 'all':
      default: {
        startDate = null;
      }
  }

  const query = startDate ? {createdAt : {$gte : startDate} } : {} ;



  try {
    const result = await Task.aggregate([
      {$match: query},
      {
        $facet: {
          tasks: [{ $sort: { createdAt: -1 } }],
          activeCount: [{ $match: { status: 'active' } }, { $count: 'count' }],
          completedCount: [
            { $match: { status: 'complete' } },
            { $count: 'count' }
          ]
        }
      }
    ]);

    // ---- FIXED ---
    const tasks = result[0].tasks;
    const activeCount = result[0].activeCount[0]?.count || 0;
    const completedCount = result[0].completedCount[0]?.count || 0;

    res.status(200).json({ tasks, activeCount, completedCount });
  } catch (error) {
    console.error('Error when get all tasks', error);
    res.status(500).json({ message: 'System error get All Tasks' });
  }
};


export const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id)

    if (!deletedTask) {
      return res.status(404).json({ message: 'Task is not available' })
    }

    res.status(200).json(deletedTask)
  } catch (error) {
    console.error('Error when deleting task', error)
    res.status(500).json({ message: 'System error when deleting task' })
  }
}

export const createTask = async (req, res) => {
  try {
    const { title } = req.body
    const task = new Task({ title })
    const newTask = await task.save()
    res.status(201).json(newTask)
  } catch (error) {
    console.error('Error when creating task', error)
    res.status(500).json({ message: 'System error when creating task' })
  }
}

export const updateTask = async (req, res) => {
  try {
    const { title, status, completedAt } = req.body

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, status, completedAt },
      { new: true, runValidators: true } // thêm runValidators để check enum
    )

    if (!updatedTask) {
      return res.status(404).json({ message: 'Task is not available' })
    }

    res.status(200).json(updatedTask)
  } catch (error) {
    console.error('Error when update task', error)
    res.status(500).json({ message: 'System error when update task' })
  }
}
