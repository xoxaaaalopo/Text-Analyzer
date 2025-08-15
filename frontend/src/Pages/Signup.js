import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleEmailSignup = async(e) => {
        e.preventDefault();
        setError("");
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogleSignup = async() => {
        try {
            await signInWithPopup(auth, new GoogleAuthProvider());
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-zinc-700">
            <Header />
            <div className="flex-grow flex flex-col space-y-8 items-center justify-center">
                <h1 className="text-3xl font-bold text-gray-50">Create an account</h1>
                <form onSubmit={handleEmailSignup} className="bg-zinc-800 rounded-lg px-6 py-8 w-96">
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <input
                        className="w-full p-2 rounded mb-4"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        className="w-full p-2 rounded mb-4"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="submit"
                        className="w-full bg-cyan-400 p-2 rounded mb-4 hover:bg-cyan-300"
                    >
                    Sign up
                    </button>
                    <hr className="border-t border-gray-400 opacity-30 mb-4" />
                    <button
                        onClick={handleGoogleSignup}
                        className="w-full bg-stone-950 rounded flex items-center justify-center space-x-2 p-2 mb-4 border border-gray-500 hover:bg-stone-900"
                    >
                        <FcGoogle />
                        <span className="text-white">Sign up with Google</span>
                    </button>
                    <p className="text-gray-200 text-sm text-center">
                        Already have an account?{" "}
                        <Link to='/login' className="text-blue-400">Log In</Link>
                    </p>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default Signup;

// import { useEffect } from "react";
// import * as firebaseui from 'firebaseui';
// import { auth } from '../firebase';
// import { EmailAuthProvider, GoogleAuthProvider } from "firebase/auth";
// import 'firebaseui/dist/firebaseui.css';
// import { useNavigate } from "react-router-dom";
// import Header from "../Components/Header";
// import Footer from "../Components/Footer";

// function Signin() {
//     const navigate = useNavigate();

//     useEffect(() => {
//         const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);
//         ui.start('#firebaseui-auth-container', {
//             signInOptions: [
//                 EmailAuthProvider.PROVIDER_ID,
//                 GoogleAuthProvider.PROVIDER_ID,
//             ],
//             callbacks: {
//                 signInSuccessWithAuthResult: () => {
//                     navigate('/');
//                     return false;
//                 }
//             }
//         })
//     }, [navigate]);

//     return (
//         <div className="min-h-screen bg-zinc-700 flex flex-col">
//             <Header />
//             <div id="firebaseui-auth-container" className="flex-grow p-40"></div>
//             <Footer />
//         </div>
//     );
// }