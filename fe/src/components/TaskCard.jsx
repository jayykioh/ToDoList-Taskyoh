import React, { useState } from 'react'
import { Card } from './ui/card'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { Calendar, CheckCircle2, Circle, SquarePen, Trash2 } from 'lucide-react'
import { Input } from './ui/input'
import api from '@/lib/axios'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

const TaskCard = ({ task, index, handleTaskChanged }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || '')

  const deleteTask = async taskID => {
    try {
      await api.delete(`/tasks/${taskID}`)
      toast.success('Nhiệm vụ đã được xóa')
      handleTaskChanged()
    } catch (error) {
      console.error('Lỗi khi xóa tasks', error)
      toast.error('Lỗi khi xóa tasks')
    }
  }
  const updateTasks = async () => {
    try {
      setIsEditing(false)
      await api.put(`/tasks/${task._id}`, {
        title: updateTaskTitle
      })
      toast.success(`Nhiệm vụ đã đổi thành ${updateTaskTitle}`);
      handleTaskChanged();
    } catch (error) {
      console.error("Lỗi khi cập nhập tasks", error);
      toast.error("Lỗi khi cập nhập tasks");
    }
  }
  const toggleTaskCompleteButton = async () =>{
    try {
        if(task.status === 'active'){
          await api.put(`/tasks/${task._id}`,{
              status : 'complete',
              completedAt: new Date().toISOString(),
          });
          toast.success(`${task.title} đã hoàn thành.`);
        }else{
          await api.put(`/tasks/${task._id}`, {
            status: 'active',
            completedAt: null
          });
          toast.success(`${task.title} đã đổi thành chưa hoàn thành.`)
        }
        handleTaskChanged();
    } catch (error) {
        console.error('Lỗi khi cập nhập nhiệm vụ', error);
        toast.error('Lỗi khi cập nhập nhiệm vụ', error);
    }
  }
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      updateTasks()
    }
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <Card
        className={cn(
          'p-4 border-white/20 shadow-sm hover:shadow-glow transition-all duration-300 bg-white/40 dark:bg-black/40 backdrop-blur-md',
          task.status === 'complete' && 'opacity-60 bg-gray-50/30'
        )}
      >
        <div className='flex items-center gap-4'>
          {/* nút toggle complete */}
          {/* nút toggle complete */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className={cn(
              'shrink-0 size-6 rounded-full border-2 flex items-center justify-center transition-all duration-200',
              task.status === 'complete'
                ? 'border-[color:var(--primary)] bg-[color:var(--primary)] text-white shadow-sm'
                : '!border-gray-400 bg-white text-transparent hover:border-[color:var(--primary)]'
            )}
              onClick={toggleTaskCompleteButton}
          >
            <CheckCircle2 className={cn(
              "size-4 transition-all duration-200", 
              task.status === 'complete' ? "scale-100 opacity-100" : "scale-0 opacity-0"
            )} />
          </motion.button>

          {/* tiêu đề */}
          <div className='flex-1 min-w-0'>
            {isEditing ? (
              <Input
                placeholder='Cần phải làm gì?'
                className='flex-1 h-10 text-base border-border focus:border-primary focus:ring-1 focus:ring-primary'
                value={updateTaskTitle}
                onChange={e => setUpdateTaskTitle(e.target.value)}
                onKeyPress={handleKeyPress}
                onBlur={() => {
                  setIsEditing(false)
                  setUpdateTaskTitle(task.title || '')
                }}
                autoFocus
              />
            ) : (
              <p
                className={cn(
                  'text-base transition-all duration-200 font-medium',
                  task.status === 'complete'
                    ? 'line-through text-muted-foreground'
                    : 'text-foreground'
                )}
              >
                {task.title}
              </p>
            )}

            {/* ngày tháng */}
            <div className='flex items-center gap-2 mt-1.5'>
              <Calendar className='size-3.5 text-muted-foreground/70' />
              <span className='text-xs text-muted-foreground/70'>
                {new Date(task.createdAt).toLocaleString()}
              </span>

              {task.completedAt && (
                <>
                  <span className='text-xs text-muted-foreground/70'>•</span>
                  <CheckCircle2 className='size-3.5 text-primary/70' />
                  <span className='text-xs text-muted-foreground/70'>
                    {new Date(task.completedAt).toLocaleString()}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* nút edit / delete */}
          <div className='flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
            <Button
              variant='ghost'
              size='icon'
              className='shrink-0 size-8 text-muted-foreground hover:text-primary hover:bg-primary/10'
              onClick={() => {
                setIsEditing(true)
                setUpdateTaskTitle(task.title || '')
              }}
            >
              <SquarePen className='size-4' />
            </Button>

            <Button
              variant='ghost'
              size='icon'
              className='shrink-0 size-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10'
              onClick={() => deleteTask(task._id)}
            >
              <Trash2 className='size-4' />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default TaskCard
