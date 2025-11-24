import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'
import { cn } from '@/lib/utils'

const TaskListPagination = ({
  handleNext,
  handlePrev,
  handlePageChange,
  page = 1,         // mặc định để tránh undefined
  totalPages = 1    // mặc định
}) => {

  // Tạo mảng các "ô" sẽ hiển thị (số trang và ...)
  const generatePages = () => {
    const pages = []

    // Trường hợp ít trang -> hiện tất cả
    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
      return pages
    }

    // Nếu đang ở đầu (1 hoặc 2) -> show 1,2,3,...,last
    if (page <= 2) {
      pages.push(1, 2, 3, '...', totalPages)
      return pages
    }

    // Nếu đang ở cuối (last or last-1) -> show 1,...,last-2,last-1,last
    if (page >= totalPages - 1) {
      pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages)
      return pages
    }

    // Ở giữa -> show 1,..., page-1, page, page+1, ... , last
    pages.push(1, '...', page - 1, page, page + 1, '...', totalPages)
    return pages
  }

  const pagesToShow = generatePages()

  return (
    <div className='flex justify-center mt-4'>
      <Pagination>
        <PaginationContent>

          {/* Previous */}
          <PaginationItem>
            <PaginationPrevious
              onClick={page === 1 ? undefined : handlePrev}
              className={cn('cursor-pointer', page === 1 && 'pointer-events-none opacity-50')}
            />
          </PaginationItem>

          {/* Page items */}
          {pagesToShow.map((p, index) => (
            <PaginationItem key={index}>
              {p === '...' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  isActive={p === page}
                  onClick={() => p !== page && handlePageChange(p)}
                  className='cursor-pointer'
                >
                  {p}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          {/* Next */}
          <PaginationItem>
            <PaginationNext
              onClick={page === totalPages ? undefined : handleNext}
              className={cn('cursor-pointer', page === totalPages && 'pointer-events-none opacity-50')}
            />
          </PaginationItem>

        </PaginationContent>
      </Pagination>
    </div>
  )
}

export default TaskListPagination
