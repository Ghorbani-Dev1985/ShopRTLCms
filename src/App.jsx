
import { Toaster } from 'react-hot-toast'
import routes from './Routes'
import { useRoutes } from 'react-router-dom'
import Header from './Components/Header/Header'
import Sidebar from './Components/Sidebar/Sidebar'

function App() {
  let router = useRoutes(routes)

  return (
    <>
     <Toaster />
     <Header />
     <main className=''>   
        <div className='grid grid-cols-12 gap-8'>
         <div className='col-span-2'><Sidebar /></div>
         <div className='col-span-10 p-5 m-3 rounded-md bg-violet-50/25'>{router}</div>
        </div>
     </main>
    </>
  )
}

export default App
