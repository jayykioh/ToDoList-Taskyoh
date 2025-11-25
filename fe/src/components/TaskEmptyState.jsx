import { Card } from './ui/card'
import { Circle } from 'lucide-react'

const TaskEmptyState = ({ filter }) => {
  return (
    <div>
      <Card className='p-8 text-center border-white/20 bg-white/20 dark:bg-black/20 backdrop-blur-md shadow-custom-md'>
        <div className='space-y-3'>
          <Circle className='mx-auto size-12 text-muted-foreground'></Circle>
          <div>
            <h3 className='font-medium text-foreground'>
              {filter === 'active'
                ? 'Không có nhiệm vụ nào đang làm'
                : filter === 'completed'
                ? 'Chưa có nhiệm vụ nào hoàn thành'
                : 'Chưa có nhiệm vụ '}
            </h3>

            <p className='text-sm text-muted-foreground'>
              {filter === 'all'
                ? 'Thêm nhiệm vụ để bắt đầu'
                : `Chuyển sang "tất cả" để thấy những nhiệm vụ ${
                    filter === 'active' ? 'đã hoàn thành' : 'đang làm'
                  } `}
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default TaskEmptyState
