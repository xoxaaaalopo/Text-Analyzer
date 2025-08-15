import { Upload, FileText, LoaderCircle, CircleAlert } from "lucide-react";

const AnalyzeButton = ({onClick, loading, file}) => {
    return (
        <button 
            onClick={onClick}
            disabled={loading || file}
            className="flex items-center space-x-2 bg-gray-800 text-white rounded-lg px-6 py-2 hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
            {loading ? (
                <>
                    <LoaderCircle className="w-4 h-4 animate-spin" />
                    <span>Analyzing...</span>
                </>
            ) : (
                <span>Analyze</span>
            )}
        </button>
    );
}

const Input = ({file, text, fileLoading, textLoading, error, handleFileUpload, handleTextChange, analyzeFile, analyzeText, handleDemo}) => {
    return (
        <div className="bg-white max-w-4xl mx-auto rounded-lg p-6 mb-8">
            <label htmlFor="file-upload" className="cursor-pointer">
                <div className="bg-white border-4 border-dashed border-gray-300 rounded-lg text-center p-4 mb-4">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-lg font-medium text-gray-700 mb-2">Click to upload a file</p>
                    <p className="text-sm text-gray-600">Supported files: SRT, EPUB, PDF, DOCX, RTF, TXT</p>
                    <input 
                        id="file-upload" 
                        type="file" 
                        className="hidden" 
                        accept=".srt, .epub, .txt, .pdf, .docx, .rtf"
                        onChange={handleFileUpload}
                    ></input>
                </div>
            </label>

            {file && (
                <div className="flex justify-between bg-gray-100 rounded-lg px-6 py-4 mb-4">
                    <div className="flex items-center space-x-2">
                        <FileText />
                        <div>
                            <p>{file.name}</p>
                        </div>
                    </div>

                    <AnalyzeButton onClick={analyzeFile} loading={fileLoading} />
                </div>
            )}

            <p className="text-xl text-gray-700 text-center mb-4">or</p>

            <div className="border-4 border-gray-300 rounded-md mb-6">
                <textarea
                    className="w-full focus:outline-none p-2"
                    rows={8}
                    placeholder="Paste your text here..."
                    value={text}
                    onChange={handleTextChange}
                ></textarea>
            </div>

            <div className="flex justify-end space-x-6">
                <button className="text-indigo-600" onClick={handleDemo}>Try with demo data</button>
                <AnalyzeButton onClick={analyzeText} loading={textLoading} file={file} />
            </div>

            {error && (
                <div className="flex items-center bg-red-50 border border-red-200 rounded-lg p-4 mt-4 space-x-3">
                    <CircleAlert className="text-red-500" />
                    <span className="text-red-500">{error}</span>
                </div>
            )}
        </div>
    );
}

export default Input;