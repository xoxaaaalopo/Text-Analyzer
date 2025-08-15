import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import clsx from "classnames";

const Results = ({results}) => {
    const { user } = useAuth();
    const [knownWords, setKnownWords] = useState(new Set());
    const [selectedWords, setSelectedWords] = useState(new Set());

    useEffect(() => {
        const loadKnownWords = async() => {
            if (user) {
                const userDocRef = doc(db, 'users', user.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setKnownWords(new Set(userData.knownWords));
                } else {
                    await setDoc(userDocRef, {
                        knownWords: [],
                    });
                    setKnownWords(new Set());
                }
            } else {
                setKnownWords(new Set());
                setSelectedWords(new Set());
            }
        }
        loadKnownWords();
    }, [user]);

    const toggleSelected = (word) => {
        setSelectedWords((prev) => {
            const copy = new Set(prev);
            if (copy.has(word)) {
                copy.delete(word);
            } else {
                copy.add(word);
            }
            return copy;
        });
    };

    const submitSelected = async() => {
        if (selectedWords.size === 0) return;
        const ref = doc(db, 'users', user.uid);
        await updateDoc(ref, {
            knownWords: arrayUnion(...selectedWords)
        });
        setKnownWords((prev) => new Set([...prev, ...selectedWords]));
        setSelectedWords(new Set());
    };

    return  results && (
        <div className="bg-white max-w-4xl mx-auto rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Analysis Result</h2>
                <p></p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mb-4">
                <div className="bg-gray-100 rounded-lg p-2">
                    <p className="text-2xl font-bold text-gray-800">{results.total_num}</p>
                    <p className="text-sm">Total Words</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-2">
                    <p className="text-2xl font-bold text-gray-800">{results.unique_num}</p>
                    <p className="text-sm">Unique Words</p>
                </div>
                <div className="bg-gray-100 rounded-lg p-2">
                    <p className="text-2xl font-bold text-gray-800">{results.advanced_words.length}</p>
                    <p className="text-sm">Advanced Words</p>
                </div>
            </div>

            {/* Advanced Words */}
            <div className="mb-2">
                <div className="flex justify-between pr-10">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800">Advanced Words</h3>
                        <p className="text-sm text-gray-700 mb-2">Words that match with GRE word list</p>                    
                    </div>
                    {user && (
                        <div>
                            <div className="w-7 h-7"></div>
                            <div className="flex space-x-4">
                                <div className="flex items-center space-x-2">
                                    <div className="w-4 h-4 border border-gray-400 rounded-sm"></div>
                                    <span className="text-sm text-gray-700">Unknown Words</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-4 h-4 bg-gray-300 border rounded-sm"></div>
                                    <span className="text-sm text-gray-700">Known Words</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <div className="w-4 h-4 bg-blue-200 border rounded-sm"></div>
                                    <span className="text-sm text-gray-700">Selected Words</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-3 text-center px-10 mb-6">
                    {results.advanced_words?.map((word, index) => (
                        <div 
                            key={index} 
                            className={clsx("border", 
                                            {"text-blue-500 bg-blue-50": selectedWords.has(word)},
                                            {"bg-gray-100 text-gray-300": knownWords.has(word)},
                                            {"cursor-pointer": user && !knownWords.has(word)})} 
                            onClick={() => {if (user && !knownWords.has(word)) toggleSelected(word);}}
                            title="Mark as known"
                            disabled={knownWords.has(word)}
                        >
                            {word}
                        </div>
                    ))}
                </div>

                {user && (
                    <div className="flex justify-end pr-10">
                        <button 
                            className="bg-gray-800 text-white rounded-lg px-4 py-1.5 self-start hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
                            onClick={submitSelected}
                            title="Submit selected words"
                        >
                        Submit 
                        </button>
                    </div>
                )}
            </div>
            
            {/* Frequency Sort */}
            <div>
                <h3 className="text-xl font-semibold text-gray-800">Frequency Sort</h3>
                <p className="text-sm text-gray-700">Words sorted from most uncommon to most common</p>

                <div className="grid grid-cols-4 md:grid-cols-5 max-h-96 overflow-y-auto border rounded-lg gap-2 p-2 mt-4">
                    {results.sorted_words?.map((word_data, index) => (
                        <div key={index} className="bg-gray-50 border rounded-lg p-3">
                            <div className="text-md font-medium">{word_data["word"]}</div>
                            <div className="text-xs text-gray-600">Freq: {word_data["frequency"]}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Results;