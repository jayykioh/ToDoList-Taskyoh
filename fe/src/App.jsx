import {Toaster} from 'sonner';
import {BrowserRouter, Routes, Route} from 'react-router';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import PomodoroPage from './pages/PomodoroPage';
import NotFound from './pages/NotFound';
import { BackgroundProvider } from './components/BackgroundContext';
import PetBot from './components/PetBot';

function App() {
  return (
    <BackgroundProvider>
      <Toaster richColors />

      <BrowserRouter>
        <PetBot />
        <Routes>
            <Route path='/' element={<LandingPage/>}></Route>
            <Route path='/app' element={<HomePage/>}></Route>
            <Route path='/pomodoro' element={<PomodoroPage/>}></Route>
            <Route path='*' element={<NotFound/>}></Route>
        </Routes>
      </BrowserRouter>
    </BackgroundProvider>
  )
}

export default App
