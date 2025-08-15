import { useAuth } from "../AuthContext";
import { Link } from 'react-router-dom';

const Header = () => {
    const { user, signOut } = useAuth();

    return (
        <header className="bg-zinc-800 border-b border-zinc-400 flex justify-between px-8 py-3 mb-4">
            <div className="flex items-center space-x-8">
                <Link to='/'>
                    <img src="/ae6ev.png" alt="Logo" className="w-10 h-10 mt-0.5" />
                </Link>
                <p className="text-gray-200 text-xl font-semibold">Learn English with Immersion</p>
            </div>
            <div className="flex items-center">
                {user ? (
                    <button 
                        onClick={signOut}
                        className="text-white bg-zinc-950 rounded-lg px-4 py-2 hover:bg-zinc-900 border-2 border-zinc-600"
                    >
                    Log out
                    </button>
                ) : (
                    <div className="flex items-center space-x-4">
                        <Link 
                            to='/login' 
                            className="text-white"
                        >
                        Log in
                        </Link>
                        <Link
                            to='/signup' 
                            className="text-white bg-zinc-950 rounded-lg px-3 py-2 hover:bg-zinc-900 border-2 border-zinc-600"
                        >
                        Sign up
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;