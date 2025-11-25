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
import Background3D from '@/components/Background3D'

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

  return (
    <div className='min-h-screen w-full bg-white relative overflow-hidden'>
      {/* <div
        className='absolute inset-0 z-0'
        style={{
          backgroundImage: `
            linear-gradient(to right, #f0f0f0 1px, transparent 1px),
            linear-gradient(to bottom, #f0f0f0 1px, transparent 1px),
            radial-gradient(circle 600px at 0% 200px, rgba(168, 240, 198, 0.5), transparent),
            radial-gradient(circle 600px at 100% 200px, rgba(168, 240, 198, 0.5), transparent)
          `,
          backgroundSize: '20px 20px, 20px 20px, 100% 100%, 100% 100%'
        }}
      /> */}
      <Background3D/>

      <div className='container pt-8 mx-auto relative z-10'>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className='w-full max-w-2xl p-6 mx-auto space-y-8'
        >
          <Header />
          <AddTask handleNewTaskAdded={handleTaskChanged} />

          <StatsAndFilter
            filter={filter}
            setFilter={setFilter}
            activeTasksCount={activeTaskCount}
            completedTasksCount={completeTaskCount}
          />

          <TaskLists filteredTasks={visibleTasks} filter={filter} handleTaskChanged={handleTaskChanged} />

          <div className='flex flex-col items-center justify-between gap-6 sm:flex-row'>
            <TaskListPagination
              handleNext={handleNext}
              handlePrev={handlePrev}
              handlePageChange={handlePageChange}
              page={page}
              totalPages={totalPages}
            />
            <DateTimeFilter dateQuery={dateQuery} setDateQuery={setDateQuery} />
          </div>

          <Footer
            activeTaskCount={activeTaskCount}
            completedTaskCount={completeTaskCount}
          />
        </motion.div>
      </div>
    </div>
  )
}
