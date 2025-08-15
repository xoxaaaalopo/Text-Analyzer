import { useState } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword]= useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleEmailLogin = async(e) => {
        e.preventDefault();
        setError("");
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogleLogin = async() => {
        setError("");
        try {
            await signInWithPopup(auth, new GoogleAuthProvider());
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-700 flex flex-col">
            <Header />
            <div className="flex-grow flex flex-col items-center justify-center space-y-8">
                <h1 className="text-3xl font-bold text-gray-50">Log in to your account</h1>
                <form onSubmit={handleEmailLogin} className="w-96 bg-zinc-800 rounded-lg px-6 py-8">
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        className="w-full rounded p-2 mb-4"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        type="password"
                        placeholder="Password" 
                        value={password}
                        className="w-full rounded p-2 mb-4"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-full bg-cyan-400 rounded p-2 hover:bg-cyan-300 mb-4"
                    >
                    Log in
                    </button>
                    <hr className="border-t border-gray-400 opacity-30 mb-4" />
                    <button 
                        className="w-full bg-stone-950 rounded flex items-center justify-center space-x-3 p-2 mb-4 border border-gray-500 hover:bg-stone-900"
                        onClick={handleGoogleLogin}
                    >
                        <FcGoogle />
                        <span className="text-white">Continue with google</span>
                    </button>
                    <p className="text-gray-200 text-sm text-center">
                        Don't have an account?{" "}
                        <Link to='/signup' className="text-blue-400">Sign up</Link>
                    </p>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default Login;