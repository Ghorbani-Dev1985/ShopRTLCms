
import { Toaster } from 'react-hot-toast'
import routes from './Routes'
import { useRoutes } from 'react-router-dom'
import Sidebar from './Components/Sidebar/Sidebar'

function App() {
  let router = useRoutes(routes)

  return (
    <>
     <Toaster />
     
     <main className=''>   
        <div className='grid grid-cols-12 gap-4'>
         <div className='col-span-2'><Sidebar /></div>
         <div className='col-span-10 p-16 m-3 rounded-3xl bg-white'>{router}</div>
        </div>
     </main>
    </>
  )
}

export default App
