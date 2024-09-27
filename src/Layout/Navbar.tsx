import React from 'react'

function Navbar() {
  return (
      <header className="header bg-white flex items-center justify-between py-8 py-02">
        <div className="flex items-center gap-4">
            <a href="/" className='border-r border-gray-400 pr-6'>
              <img 
                src={'https://cdn.muhiku.com/wp-content/uploads/2024/02/muhiku-logo-1_1x.webp?x47379'} 
                className='h-6 w-full hover:text-green-500'
              />
            </a>
            <p className='text-[20px] font-semibold'>Case Study - Web</p>
        </div>
      </header>
  )
}

export default Navbar