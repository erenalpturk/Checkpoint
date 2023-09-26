import './App.css';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import Homepage from './Homepage';
import Filter from './Filter';
import Result from './Result';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path='/' element={<Homepage />}></Route>
            <Route path='/filter' element={<Filter />}></Route>
            <Route path='/result/:id/:id2' element={<Result />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
