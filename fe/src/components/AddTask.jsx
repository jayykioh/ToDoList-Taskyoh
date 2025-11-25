import { useState } from 'react'
import { Card } from './ui/card'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import { toast } from 'sonner'
import  api  from '@/lib/axios'
import { motion } from 'framer-motion'

const AddTask = ({handleNewTaskAdded}) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  
  const addTask = async () => {
    if(newTaskTitle.trim()){
      try {
        await api.post("/tasks", { title: newTaskTitle });
        toast.success(`Nhiệm vụ ${newTaskTitle} đã được thêm vào.`);
        handleNewTaskAdded();
      } catch (error) {
          console.error("Lỗi xảy ra khi thêm nhiệm vụ",error);
          toast.error("Lỗi xảy khi thêm nhiệm vụ");
      }
      setNewTaskTitle("");
    }else{
      toast.error('Bạn cần nhập nội dung của nhiệm vụ');
    }
  }

  const handleKeyPress = (e) =>  {
    if(e.key === 'Enter'){
      addTask();
    } 
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className='p-6 border-white/20 shadow-custom-lg bg-white/40 dark:bg-black/40 backdrop-blur-md'>
        <div className='flex flex-col gap-3 sm:flex-row '>
          <Input
            type='text'
            placeholder='Cần phải làm gì?'
            className='h-12 text-base bg-white/50 dark:bg-black/50 sm:flex-1 border-white/20 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 placeholder:text-muted-foreground/70'
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown= {handleKeyPress}
          />
          <Button 
            size='xl' 
            className='px-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-200'
            onClick={addTask}
            disabled={!newTaskTitle.trim()}
          >
            <Plus className='size-5 mr-2' />
            Thêm
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}

export default AddTask
