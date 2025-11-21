import AddTask from '@/components/AddTask'
import DateTimeFilter from '@/components/DateTimeFilter'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import StatsAndFilter from '@/components/StatsAndFilter'
import TaskListPagination from '@/components/TaskListPagination'
import TaskLists from '@/components/TaskLists'
import React from 'react'

export default function HomePage(){
  return (
    <div className="min-h-screen w-full bg-white relative overflow-hidden">
      {/* Green Corner Grid Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, #f0f0f0 1px, transparent 1px),
            linear-gradient(to bottom, #f0f0f0 1px, transparent 1px),
            radial-gradient(circle 600px at 0% 200px, rgba(168, 240, 198, 0.5), transparent),
            radial-gradient(circle 600px at 100% 200px, rgba(168, 240, 198, 0.5), transparent)
          `,
          backgroundSize: "20px 20px, 20px 20px, 100% 100%, 100% 100%",
        }}
      />
      {/* Your Content Here */}
      <div className='container pt-8 mx-auto relative z-10'>
        <div className='w-full max-w-2xl -6 mx-auto space-y-6'>
          <Header />
          <AddTask/>
          <StatsAndFilter/>
          <TaskLists/>
          <div className='flex flex-col items-center justify-between gap-6 sm:flex-row'>
            <TaskListPagination />
            <DateTimeFilter />
          </div>
          <Footer/>
        </div>
      </div>
    </div>
  )
}
