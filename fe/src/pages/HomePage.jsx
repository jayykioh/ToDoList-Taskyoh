import AddTask from '@/components/AddTask'
import DateTimeFilter from '@/components/DateTimeFilter'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import StatsAndFilter from '@/components/StatsAndFilter'
import TaskListPagination from '@/components/TaskListPagination'
import TaskLists from '@/components/TaskLists'
import { useEffect, useState, useCallback } from 'react'
import { toast } from 'sonner'
import api from '../lib/axios'
import { visibleTaskLimit } from '@/lib/data.js'
import { motion } from 'framer-motion'
import CozyBackground from '@/components/CozyBackground'

export default function HomePage () {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTaskCount, setActiveTaskCount] = useState(0);
  const [completeTaskCount, setCompleteTaskCount] = useState(0);
  const [filter, setFilter] = useState('all');
  const [dateQuery, setDateQuery] = useState('today');
  const [page, setPage] = useState(1);

  const loadTasks = useCallback(async () => {
    try {
      const res = await api.get(`/tasks?filter=${dateQuery}`);
      setTaskBuffer(res.data.tasks);
      setActiveTaskCount(res.data.activeCount);
      setCompleteTaskCount(res.data.completedCount);
    } catch (e) {
      console.error('Lỗi', e);
      toast.error('Lỗi khi lấy tasks');
    }
  }, [dateQuery]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  useEffect(() => {
    setPage(1);
  }, [filter, dateQuery]);

  const handleTaskChanged = () => {
    loadTasks();
  };

  const filteredTasks = taskBuffer.filter(task => {
    switch (filter) {
      case 'active': return task.status === 'active';
      case 'completed': return task.status === 'complete';
      default: return true;
    }
  });

  const totalPages = Math.max(1, Math.ceil(filteredTasks.length / visibleTaskLimit));

  const visibleTasks = filteredTasks.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit
  );

  const handleNext = () => {
    if (page < totalPages) setPage(prev => prev + 1);
  };

  const handlePrev = () => {
    if (page > 1) setPage(prev => prev - 1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  // Tự lùi trang khi trang hiện tại rỗng
  useEffect(() => {
    if (visibleTasks.length === 0 && page > 1) {
      setPage((prev) => prev - 1);
    }
  }, [visibleTasks.length, page]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className='min-h-screen w-full relative overflow-hidden bg-white dark:bg-black transition-colors duration-500'>
      <CozyBackground />

      <div className='container pt-8 mx-auto relative z-10'>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className='w-full max-w-2xl p-6 mx-auto space-y-8'
        >
          <motion.div variants={itemVariants}>
            <Header />
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <AddTask handleNewTaskAdded={handleTaskChanged} />
          </motion.div>

          <motion.div variants={itemVariants}>
            <StatsAndFilter
              filter={filter}
              setFilter={setFilter}
              activeTasksCount={activeTaskCount}
              completedTasksCount={completeTaskCount}
            />
          </motion.div>

          <motion.div variants={itemVariants}>
            <TaskLists filteredTasks={visibleTasks} filter={filter} handleTaskChanged={handleTaskChanged} />
          </motion.div>

          <motion.div variants={itemVariants} className='flex flex-col items-center justify-between gap-6 sm:flex-row'>
            <TaskListPagination
              handleNext={handleNext}
              handlePrev={handlePrev}
              handlePageChange={handlePageChange}
              page={page}
              totalPages={totalPages}
            />
            <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
          </motion.div>

          <motion.div variants={itemVariants}>
            <Footer
              activeTaskCount={activeTaskCount}
              completedTaskCount={completeTaskCount}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
