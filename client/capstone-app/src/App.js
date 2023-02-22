import './App.css';
import Forms from"./component/form"
import Navbar from"./component/Navbar"
import { Route,Routes
 } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/Forms' element={<Forms/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
