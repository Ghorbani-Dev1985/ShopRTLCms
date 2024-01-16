
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
        <div className='grid grid-cols-12'>
         <div className='col-span-2'><Sidebar /></div>
         <div className='col-span-10 p-16 my-6 ml-4 rounded-3xl bg-white'>{router}</div>
        </div>
     </main>
    </>
  )
}

export default App
