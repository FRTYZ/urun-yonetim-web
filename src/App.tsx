import { Fragment, Suspense } from 'react'

import Layout from './Layout'
import { publicRoutes } from './routes';
import { Routes, Route } from 'react-router-dom';

function App() {
  
  return (
    <Fragment>
        <Routes>
          {publicRoutes.map((route, index) => (
              <Route 
                  path={route.path}
                  element={
                      <Suspense>
                        <Layout>{route.component}</Layout>
                      </Suspense>
                  }
                  key={index}
              />
          ))}
        </Routes>
    </Fragment>
  )
}

export default App
