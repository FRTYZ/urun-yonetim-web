import {ReactNode, lazy} from 'react'

const Navbar = lazy(() => import('./Navbar'));
const Footer = lazy(() => import('./Footer'));

import { LazyCard, LazyHero } from '../components/Lazy';

import { useQuery } from 'react-query';
import { GetUserAllRepos } from '../helpers/Request';

import { RepositoryTypes } from '../helpers/interface';

interface LayoutProps {
    children?: ReactNode;
}

function Layout({children}: LayoutProps) {

  return (
    <div className='container mx-auto px-4 lg:px-0 max-w-screen-lg xl:max-w-screen-xl'>
        <Navbar />
          <main>{children}</main>
        <Footer />
    </div>
  )
}

export default Layout