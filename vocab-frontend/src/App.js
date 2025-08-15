import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import { AuthProvider } from './AuthContext';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/login' element={<Login />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;