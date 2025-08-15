const Footer = () => {
    return (
        <footer className="bg-zinc-900 text-gray-600 text-sm text-white text-center border-t border-zinc-400 px-4 py-10 mt-12">
            &copy; {new Date().getFullYear()} Find Advanced Words
        </footer>
    );
}

export default Footer;