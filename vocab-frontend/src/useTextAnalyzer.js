import { useState } from 'react';

export const useTextAnalyzer = () => {
    const [file, setFile] = useState(null);
    const [text, setText] = useState('');
    const [fileLoading, setFileLoading] = useState(false);
    const [textLoading, setTextLoading] = useState(false);
    const [error, setError] = useState('')
    const [results, setResults] = useState(null);

    const handleFileUpload = (e) => {
        setFile(e.target.files[0]);
        setError('')
    };

    const handleTextChange = (e) => {
        setFile(null);
        setText(e.target.value)
        setError('')
    };

    const analyzeFile = async () => {
        setFileLoading(true);
        setText('');
        setError('');

        try {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('http://localhost:5002/api/analyzeFile', {
                method: 'POST',
                body: formData
            });

            if (!response.ok){
                throw new Error('Analysis failed');
            }

            const data = await response.json();
            setResults(data);

        } catch (err) {
            setError('Failed to analyze file. Please try again.');
            console.error(err);
        } finally {
            setFileLoading(false);
        }
    };

    const analyzeText = async () => {
        if (!text.trim()) {
            setError('Please enter some text to analyze');
            return;
        }
        
        setTextLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:5002/api/analyzeText', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({text})
            });

            if (!response.ok) {
                setError('Failed to analyze text. Please try again.');
                throw new Error();
            }

            const data = await response.json();
            setResults(data);

        } catch (err) {
            setError('Failed to analyze text. Please try again.');
            console.error(err);
        } finally {
            setTextLoading(false);
        }
    };

    const handleDemo = async() => {
        setError('');
        
        const response = await fetch('Suits S01E10 The Shelf Life - en - English.srt');
        const blob = await response.blob();
        const demoFile = new File([blob], 'Suits S01E10 The Shelf Life - en - English.srt');

        setFile(demoFile);
    };



    return {
        file,
        text,
        fileLoading,
        textLoading,
        error,
        results,
        handleTextChange,
        handleFileUpload,
        analyzeFile,
        analyzeText,
        handleDemo
    };
}