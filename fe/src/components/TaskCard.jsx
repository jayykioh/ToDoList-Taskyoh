import React, { useState } from 'react'
import { Card } from './ui/card'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { Calendar, CheckCircle2, Circle, SquarePen, Trash2 } from 'lucide-react'
import { Input } from './ui/input'
import api from '@/lib/axios'
import { toast } from 'sonner'

const TaskCard = ({ task, index, handleTaskChanged }) => {
  const [isEditing, setIsEditing] = useState('false')
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
    <Card
      className={cn(
        'p-4 bg-gradient border-none shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group',
        task.status === 'complete' && 'opacity-75'
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className='flex items-center gap-4'>
        {/* nút toggle complete */}
        <Button
          size='icon'
          className={cn(
            'shrink-0 size-8 rounded-full transition-all duration-200',
            task.status === 'complete'
              ? 'text-success hover:text-success'
              : 'text-muted-foreground hover:text-primary'
          )}
            onClick={toggleTaskCompleteButton}
        >
          {task.status === 'complete' ? (
            <CheckCircle2 className='size-5' />
          ) : (
            <Circle className='size-5' />
          )}

        
        </Button>

        {/* tiêu đề */}
        <div className='flex-1 min-w-0'>
          {isEditing ? (
            <Input
              placeholder='Cần phải làm gì?'
              className='flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/50'
              value={updateTaskTitle}
              onChange={e => setUpdateTaskTitle(e.target.value)}
              onKeyPress={handleKeyPress}
              onBlur={() => {
                setIsEditing(false)
                setUpdateTaskTitle(task.title || '')
              }}
            />
          ) : (
            <p
              className={cn(
                'text-base transition-all duration-200',
                task.status === 'complete'
                  ? 'line-through text-muted-foreground'
                  : 'text-foreground'
              )}
            >
              {task.title}
            </p>
          )}

          {/* ngày tháng */}
          <div className='flex items-center gap-2 mt-1'>
            <Calendar className='size-3 text-muted-foreground' />
            <span className='text-xs text-muted-foreground'>
              {new Date(task.createdAt).toLocaleString()}
            </span>

            {task.completedAt && (
              <>
                <span className='text-xs text-muted-foreground'>-</span>
                <Calendar className='size-3 text-muted-foreground' />
                <span className='text-xs text-muted-foreground'>
                  {new Date(task.completedAt).toLocaleString()}
                </span>
              </>
            )}
          </div>
        </div>

        {/* nút edit / delete */}
        <div className='hidden gap-2 group-hover:inline-flex animate-slide-up'>
          <Button
            variant='ghost'
            size='icon'
            className='shrink-0 size-8 text-muted-foreground hover:text-info'
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
            className='shrink-0 size-8 text-muted-foreground hover:text-destructive'
            onClick={() => deleteTask(task._id)}
          >
            <Trash2 className='size-4' />
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default TaskCard
