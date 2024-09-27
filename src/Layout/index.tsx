import {ReactNode, lazy} from 'react'

const Navbar = lazy(() => import('./Navbar'));
const Footer = lazy(() => import('./Footer'));

interface LayoutProps {
    children?: ReactNode;
}

function Layout({children}: LayoutProps) {

  return (
    <div className='container mx-auto px-4 lg:px-0 max-w-screen-lg xl:max-w-screen-xl'>
        <Navbar />
          <main className='mt-6'>{children}</main>
        <Footer />
    </div>
  )
}

export default Layout