import { Routes ,Route} from 'react-router-dom';
import AdminUserList from './pages/AdminUserList';
import AdminUserSchedule from './pages/AdminUserSchedule';
import TestPage from './pages/TestPage';
function App() {
  
  return (
    <>
        <Routes>
          <Route path='/' exact={true} element={<AdminUserList/>}/>
          <Route path='/calendar' element={<AdminUserSchedule/>}/>
          <Route path='/test' element={<TestPage/>}/>
        </Routes>
    </>
  );
}

export default App;
