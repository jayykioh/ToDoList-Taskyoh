import TaskEmptyState from './TaskEmptyState'
import TaskCard from './TaskCard'
import { AnimatePresence, motion } from 'framer-motion'

const TaskLists = ({filteredTasks, filter, handleTaskChanged}) => {
  if(!filteredTasks || filteredTasks.length == 0 ){
    return <TaskEmptyState filter={filter}/>
  }

  return (
    <div className='space-y-3'>
      <AnimatePresence mode='popLayout'>
        {filteredTasks.map((task,index)=>
            (
                <TaskCard
                  key ={task._id ?? index}
                  task = {task}
                  index = {index}
                  handleTaskChanged={handleTaskChanged}
                />
            )
        )}
      </AnimatePresence>
    </div>
  )
}

export default TaskLists
