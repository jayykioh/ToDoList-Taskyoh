import { FilterType } from '@/lib/data'
import { Filter } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { motion } from 'framer-motion'

const StatsAndFilter = ({
  completedTasksCount = 0,
  activeTasksCount = 0,
  filter = 'all',
  setFilter  
}) => {
  return (
    <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
      {/* thống kê */}
      <div className='flex gap-3'>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Badge
            variant='secondary'
            className='bg-white/30 dark:bg-black/30 text-foreground border-white/20 px-3 py-1 text-sm backdrop-blur-md shadow-sm'
          >
            {activeTasksCount} {FilterType.active}
          </Badge>
        </motion.div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Badge
            variant='secondary'
            className='bg-white/30 dark:bg-black/30 text-foreground border-white/20 px-3 py-1 text-sm backdrop-blur-md shadow-sm'
          >
            {completedTasksCount} {FilterType.completed}
          </Badge>
        </motion.div>
      </div>
      {/* filter */}
      <div className='flex flex-col gap-2 sm:flex-row bg-white/20 dark:bg-black/20 p-1 rounded-lg backdrop-blur-md border border-white/10'>
        {Object.keys(FilterType).map(type => (
          <Button
            key={type}
            variant={filter === type ? 'default' : 'ghost'}
            size='sm'
            className={`capitalize transition-all duration-300 ${filter === type ? 'shadow-md bg-primary text-primary-foreground' : 'hover:bg-white/20'}`}
            onClick={() => setFilter(type)}
          >
            <Filter className='size-4 mr-1' />
            {FilterType[type]}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default StatsAndFilter
