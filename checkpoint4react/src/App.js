import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './Login';
import RegisterPage from './Register';



function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path='/login' exact element={<LoginPage />} />
                    <Route path='/register' exact element={<RegisterPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
