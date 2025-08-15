import { useTextAnalyzer } from "../useTextAnalyzer";
import Header from '../Components/Header';
import Footer from "../Components/Footer";
import Results from "../Components/Results";
import Input from "../Components/Input";

const Title = () => {
    return (
        <div className="text-center p-4">
            <h1 className="text-4xl font-bold text-white mb-6">Find Advanced Words</h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-100">
            Upload your media file to find potential words to learn. 
            This tool will identify advanced words worth learning.
            </p>
        </div>
    );
}

function Home() {
    const {
        file,
        text,
        fileLoading,
        textLoading,
        error,
        results,
        handleFileUpload,
        handleTextChange,
        analyzeFile,
        analyzeText,
        handleDemo
    } = useTextAnalyzer();

    return (
        <div className="min-h-screen bg-zinc-700 flex flex-col">
            <Header />
            <main className="flex-grow">
                <Title />
                <Input
                    file = {file}
                    text = {text}
                    fileLoading = {fileLoading}
                    textLoading = {textLoading}
                    error = {error}
                    handleFileUpload = {handleFileUpload}
                    handleTextChange = {handleTextChange}
                    analyzeFile = {analyzeFile}
                    analyzeText = {analyzeText}
                    handleDemo = {handleDemo}
                />
                <Results
                    results = {results}
                />
            </main>
             <Footer />
        </div>
    );
}

export default Home;