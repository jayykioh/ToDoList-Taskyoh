import React from 'react'

export default function NotFound(){
  return (
    <div className=' w-screen flex flex-col items-center justify-center min-h-screen text-center bg-green-50'>
      <img src='404_NotFound.png' alt='Not Found' className='max-w-full mb-6 w-96'/>
            <p className='text-xl font-semibold'>Bạn đã vào phần chưa có/ hoặc lỗi, Vui Lòng Quay Zề 😒</p>
<a href='/' className='inline-block px-6 py-3 mt-6 font-medium text-white transition shadow-sm bg-primary rounded-2xl'>Quay về Trang Chủ</a>
    </div>
  )
}

