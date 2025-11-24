import React from 'react'

const Footer = ({completedTaskCount = 2 , activeTaskCount = 3 }) => {
  return (
   <>
     {completedTaskCount + activeTaskCount > 0&& (
      <div className='text-center'>
        <p className='text-sm text-muted-foreground'>
            {
              completedTaskCount > 0 && (

                <>
                  🎉 Tuyệt vời bạn đã hoàn thành {completedTaskCount} việc
                  {
                    activeTaskCount>0 && `, còn ${activeTaskCount} việc nữa thôi. Cố lên nhé !`
                  }
                </>
              )
            }
             {completedTaskCount === 0 && activeTaskCount > 0  && (

              <>
                  Hãy bắt đầu làm {activeTaskCount} nhiệm vụ nào!!
              </>
             )}
           </p>
      </div>

     )}
   </>
  )
}

export default Footer
