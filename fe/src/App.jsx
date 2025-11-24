import {Toaster} from 'sonner';
import {BrowserRouter, Routes, Route} from 'react-router';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
    <Toaster richColors />
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<HomePage/>}></Route>
              <Route path='*' element={<NotFound/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
