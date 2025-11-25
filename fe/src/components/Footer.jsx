import { motion } from 'framer-motion'

const Footer = ({completedTaskCount = 0 , activeTaskCount = 0 }) => {
  return (
   <>
     {completedTaskCount + activeTaskCount > 0 && (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className='text-center pt-4'
      >
        <p className='text-sm text-muted-foreground font-medium'>
            {
              completedTaskCount > 0 && (

                <>
                  🎉 Tuyệt vời bạn đã hoàn thành <span className="text-primary font-bold">{completedTaskCount}</span> việc
                  {
                    activeTaskCount>0 && <>, còn <span className="text-destructive font-bold">{activeTaskCount}</span> việc nữa thôi. Cố lên nhé !</>
                  }
                </>
              )
            }
             {completedTaskCount === 0 && activeTaskCount > 0  && (

              <>
                  Hãy bắt đầu làm <span className="text-primary font-bold">{activeTaskCount}</span> nhiệm vụ nào!!
              </>
             )}
           </p>
      </motion.div>

     )}
   </>
  )
}

export default Footer
