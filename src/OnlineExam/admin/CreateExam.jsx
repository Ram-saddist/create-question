import React, { useState } from "react";
import * as XLSX from "xlsx";

const CreateExam = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [codingQuestions, setCodingQuestions] = useState([]);
    const [mcqQuestions, setMcqQuestions] = useState([]);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const addCodingQuestion = () => {
        setCodingQuestions([
            ...codingQuestions,
            {
                questionId: "",
                questionTitle: "",
                questionType: "Coding",
                questionDescription: "",
                sampleInput: "",
                sampleOutput: "",
                constraints: "",
                testCases: [
                    { input: "", output: "", isHidden: false },
                ],
                score: "",
                tags: "",
                difficulty: "",
                explanation: "",
                explanationUrls: ["", ""]
            }
        ]);
    };

    const cancelCodingQuestion = (index) => {
        const updatedQuestions = [...codingQuestions];
        updatedQuestions.splice(index, 1);
        setCodingQuestions(updatedQuestions);
    };

    const addMcqQuestion = () => {
        setMcqQuestions([
            ...mcqQuestions,
            {
                questionId: "",
                questionType: "MCQ",
                language: "",
                questionDescription: "",
                options: ["", "", "", ""],
                answer: "",
                marks: "",
                tags: "",
                difficulty: "",
                explanation: "",
                explanationUrls: ["", ""],
            }
        ]);
    };
    const cancelMcqQuestion = (index) => {
        const updatedQuestions = [...mcqQuestions];
        updatedQuestions.splice(index, 1);
        setMcqQuestions(updatedQuestions);
    };
    const handleFileUpload = (e, type) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const data = event.target.result;
            // Parse the Excel file using a library like SheetJS (xlsx)
            const workbook = XLSX.read(data, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(sheet);
            if (type === "coding") {
              setCodingQuestions([...codingQuestions, ...json]);
            } else if (type === "mcq") {
              setMcqQuestions([...mcqQuestions, ...json]);
            }
          };
          reader.readAsBinaryString(file);
        }
      };
      
    const submitQuestions = (e) => {
        e.preventDefault()
        console.log(codingQuestions, mcqQuestions)
    }
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center px-4 font-sans">
            <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-4xl">
                <h2 className="text-xl font-bold text-center text-[#363f8f] mb-4">
                    Manage Questions
                </h2>

                {!selectedOption && (
                    <div className="text-center space-y-4">
                        <div className="flex justify-center space-x-4">
                            <button
                                className="bg-[#363f8f] hover:bg-[#2e3279] text-white font-bold text-sm py-2 px-4 rounded-lg shadow-md transition duration-200"
                                onClick={() => handleOptionClick("manual")}
                            >
                                Manual
                            </button>
                            <button
                                className="bg-[#4f46e5] hover:bg-[#3e37c0] text-white font-bold text-sm py-2 px-4 rounded-lg shadow-md transition duration-200"
                                onClick={() => handleOptionClick("excel")}
                            >
                                Excel
                            </button>
                        </div>

                    </div>
                )}


                {selectedOption === "excel" && (
                    <div className="mt-6">
                        {/* Coding Questions Excel Upload */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Upload Coding Questions Excel File
                            </label>
                            <input
                                type="file"
                                accept=".xlsx, .xls"
                                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-[#363f8f] focus:outline-none"
                            onChange={(e) => handleFileUpload(e, "coding")}
                            />
                        </div>

                        {/* MCQ Questions Excel Upload */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Upload MCQ Questions Excel File
                            </label>
                            <input
                                type="file"
                                accept=".xlsx, .xls"
                                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-[#363f8f] focus:outline-none"
                                onChange={(e) => handleFileUpload(e, "mcq")}
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex justify-between">
                            <button
                                className="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg"
                                onClick={() => setSelectedOption(null)}
                            >
                                Back
                            </button>
                            <button
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
                                onClick={submitQuestions}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                )}


                {selectedOption === "manual" && (

                    <div className="flex flex-wrap md:flex-nowrap md:space-x-4 space-y-4 md:space-y-0">
                        <div className="w-full md:w-1/2 bg-white shadow-lg rounded-xl p-4">
                            <h3 className="text-lg font-semibold text-[#363f8f]">
                                Coding Questions
                            </h3>
                            <button
                                className="mt-4 bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg"
                                onClick={() => setSelectedOption(null)}
                            >
                                Back
                            </button>
                            {codingQuestions.map((question, index) => (
                                <div key={index} className="space-y-4 border-b pb-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Question Id</label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-[#363f8f] focus:outline-none"
                                            value={question.questionId}
                                            onChange={(e) => {
                                                const updatedQuestions = [...codingQuestions];
                                                updatedQuestions[index].questionId = e.target.value;
                                                setCodingQuestions(updatedQuestions);
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Question Title</label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-[#363f8f] focus:outline-none"
                                            value={question.questionTitle}
                                            onChange={(e) => {
                                                const updatedQuestions = [...codingQuestions];
                                                updatedQuestions[index].questionTitle = e.target.value;
                                                setCodingQuestions(updatedQuestions);
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Question Description</label>
                                        <textarea
                                            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-[#363f8f] focus:outline-none"
                                            value={question.questionDescription}
                                            onChange={(e) => {
                                                const updatedQuestions = [...codingQuestions];
                                                updatedQuestions[index].questionDescription = e.target.value;
                                                setCodingQuestions(updatedQuestions);
                                            }}
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Sample Input</label>
                                        <textarea
                                            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-[#363f8f] focus:outline-none"
                                            value={question.sampleInput}
                                            onChange={(e) => {
                                                const updatedQuestions = [...codingQuestions];
                                                updatedQuestions[index].sampleInput = e.target.value;
                                                setCodingQuestions(updatedQuestions);
                                            }}
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Sample Output</label>
                                        <textarea
                                            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-[#363f8f] focus:outline-none"
                                            value={question.sampleOutput}
                                            onChange={(e) => {
                                                const updatedQuestions = [...codingQuestions];
                                                updatedQuestions[index].sampleOutput = e.target.value;
                                                setCodingQuestions(updatedQuestions);
                                            }}
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Constraints</label>
                                        <textarea
                                            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-[#363f8f] focus:outline-none"
                                            value={question.constraints}
                                            onChange={(e) => {
                                                const updatedQuestions = [...codingQuestions];
                                                updatedQuestions[index].constraints = e.target.value;
                                                setCodingQuestions(updatedQuestions);
                                            }}
                                        ></textarea>
                                    </div>

                                    <div>
                                        <h4 className="text-md font-semibold text-gray-700">Test Cases</h4>
                                        {question.testCases.map((testCase, testCaseIndex) => (
                                            <div key={testCaseIndex} className="space-y-2 border-b pb-2 mb-2">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Test Case Input</label>
                                                    <input
                                                        type="text"
                                                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-[#363f8f] focus:outline-none"
                                                        value={testCase.input}
                                                        onChange={(e) => {
                                                            const updatedQuestions = [...codingQuestions];
                                                            updatedQuestions[index].testCases[testCaseIndex].input = e.target.value;
                                                            setCodingQuestions(updatedQuestions);
                                                        }}
                                                        placeholder="Enter test case input"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700">Test Case Output</label>
                                                    <input
                                                        type="text"
                                                        className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-[#363f8f] focus:outline-none"
                                                        value={testCase.output}
                                                        onChange={(e) => {
                                                            const updatedQuestions = [...codingQuestions];
                                                            updatedQuestions[index].testCases[testCaseIndex].output = e.target.value;
                                                            setCodingQuestions(updatedQuestions);
                                                        }}
                                                        placeholder="Enter test case output"
                                                    />
                                                </div>
                                                <div className="flex items-center space-x-3">
                                                    <label className="text-sm font-medium text-gray-700">Hidden</label>
                                                    <input
                                                        type="checkbox"
                                                        checked={testCase.isHidden}
                                                        onChange={(e) => {
                                                            const updatedQuestions = [...codingQuestions];
                                                            updatedQuestions[index].testCases[testCaseIndex].isHidden = e.target.checked;
                                                            setCodingQuestions(updatedQuestions);
                                                        }}
                                                    />
                                                </div>
                                                <button
                                                    className="mt-2 bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-lg"
                                                    onClick={() => {
                                                        const updatedQuestions = [...codingQuestions];
                                                        updatedQuestions[index].testCases.splice(testCaseIndex, 1);
                                                        setCodingQuestions(updatedQuestions);
                                                    }}
                                                >
                                                    Remove Test Case
                                                </button>
                                            </div>
                                        ))}
                                        <button
                                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded-lg"
                                            onClick={() => {
                                                const updatedQuestions = [...codingQuestions];
                                                updatedQuestions[index].testCases.push({ input: "", output: "", isHidden: true });
                                                setCodingQuestions(updatedQuestions);
                                            }}
                                        >
                                            Add Test Case
                                        </button>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Score</label>
                                        <input
                                            type="number"
                                            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-[#363f8f] focus:outline-none"
                                            value={question.score}
                                            onChange={(e) => {
                                                const updatedQuestions = [...codingQuestions];
                                                updatedQuestions[index].score = e.target.value;
                                                setCodingQuestions(updatedQuestions);
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Difficulty</label>
                                        <select
                                            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-[#363f8f] focus:outline-none"
                                            value={question.difficulty}
                                            onChange={(e) => {
                                                const updatedQuestions = [...codingQuestions];
                                                updatedQuestions[index].difficulty = e.target.value;
                                                setCodingQuestions(updatedQuestions);
                                            }}
                                        >
                                            <option value="">Select Difficulty</option>
                                            <option value="Easy">Easy</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Hard">Hard</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Explanation</label>
                                        <textarea
                                            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-[#363f8f] focus:outline-none"
                                            value={question.explanation}
                                            onChange={(e) => {
                                                const updatedQuestions = [...codingQuestions];
                                                updatedQuestions[index].explanation = e.target.value;
                                                setCodingQuestions(updatedQuestions);
                                            }}
                                            placeholder="Enter detailed explanation"
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Tags</label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-[#363f8f] focus:outline-none"
                                            value={question.tags}
                                            onChange={(e) => {
                                                const updatedQuestions = [...codingQuestions];
                                                updatedQuestions[index].tags = e.target.value;
                                                setCodingQuestions(updatedQuestions);
                                            }}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Explanation URLs</label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-[#363f8f] focus:outline-none"
                                            value={question.explanationUrls[0]}
                                            onChange={(e) => {
                                                const updatedQuestions = [...codingQuestions];
                                                updatedQuestions[index].explanationUrls[0] = e.target.value;
                                                setCodingQuestions(updatedQuestions);
                                            }}
                                            placeholder="URL 1"
                                        />
                                        <input
                                            type="text"
                                            className="w-full mt-2 px-3 py-1.5 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-[#363f8f] focus:outline-none"
                                            value={question.explanationUrls[1]}
                                            onChange={(e) => {
                                                const updatedQuestions = [...codingQuestions];
                                                updatedQuestions[index].explanationUrls[1] = e.target.value;
                                                setCodingQuestions(updatedQuestions);
                                            }}
                                            placeholder="URL 2"
                                        />
                                    </div>

                                    <button
                                        className="mt-2 bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-lg"
                                        onClick={() => cancelCodingQuestion(index)}
                                    >
                                        Cancel Question
                                    </button>
                                </div>
                            ))}
                            <button
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
                                onClick={addCodingQuestion}
                            >
                                Add Coding Question
                            </button>
                        </div>
                        <div className="w-full md:w-1/2 bg-white shadow-lg rounded-xl p-4">
                            <h3 className="text-lg font-semibold text-[#363f8f] mb-4">MCQ Questions</h3>
                            {mcqQuestions.map((question, index) => (
                                <div key={index} className="space-y-4 border-b pb-4 mb-4">
                                    {/* Question ID */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Question ID</label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-[#363f8f] focus:outline-none"
                                            value={question.questionId}
                                            onChange={(e) => {
                                                const updatedQuestions = [...mcqQuestions];
                                                updatedQuestions[index].questionId = e.target.value;
                                                setMcqQuestions(updatedQuestions);
                                            }}
                                        />
                                    </div>

                                    {/* Question Type */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Question Type</label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-[#363f8f] focus:outline-none"
                                            value={question.questionType}
                                            onChange={(e) => {
                                                const updatedQuestions = [...mcqQuestions];
                                                updatedQuestions[index].questionType = e.target.value;
                                                setMcqQuestions(updatedQuestions);
                                            }}
                                        />
                                    </div>

                                    {/* Language */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Language</label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-[#363f8f] focus:outline-none"
                                            value={question.language}
                                            onChange={(e) => {
                                                const updatedQuestions = [...mcqQuestions];
                                                updatedQuestions[index].language = e.target.value;
                                                setMcqQuestions(updatedQuestions);
                                            }}
                                        />
                                    </div>

                                    {/* Question Description */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Question Description</label>
                                        <textarea
                                            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-[#363f8f] focus:outline-none"
                                            value={question.questionDescription}
                                            onChange={(e) => {
                                                const updatedQuestions = [...mcqQuestions];
                                                updatedQuestions[index].questionDescription = e.target.value;
                                                setMcqQuestions(updatedQuestions);
                                            }}
                                        ></textarea>
                                    </div>

                                    {/* Options */}
                                    {["Option 1", "Option 2", "Option 3", "Option 4"].map((option, optIndex) => (
                                        <div key={optIndex}>
                                            <label className="block text-sm font-medium text-gray-700">{option}</label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-[#363f8f] focus:outline-none"
                                                value={question.options[optIndex]}
                                                onChange={(e) => {
                                                    const updatedQuestions = [...mcqQuestions];
                                                    updatedQuestions[index].options[optIndex] = e.target.value;
                                                    setMcqQuestions(updatedQuestions);
                                                }}
                                            />
                                        </div>
                                    ))}

                                    {/* Answer */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Answer</label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-[#363f8f] focus:outline-none"
                                            value={question.answer}
                                            onChange={(e) => {
                                                const updatedQuestions = [...mcqQuestions];
                                                updatedQuestions[index].answer = e.target.value;
                                                setMcqQuestions(updatedQuestions);
                                            }}
                                        />
                                    </div>

                                    {/* Marks */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Marks</label>
                                        <input
                                            type="number"
                                            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-[#363f8f] focus:outline-none"
                                            value={question.marks}
                                            onChange={(e) => {
                                                const updatedQuestions = [...mcqQuestions];
                                                updatedQuestions[index].marks = e.target.value;
                                                setMcqQuestions(updatedQuestions);
                                            }}
                                        />
                                    </div>

                                    {/* Question Tags */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Question Tags</label>
                                        <input
                                            type="text"
                                            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-[#363f8f] focus:outline-none"
                                            value={question.tags}
                                            onChange={(e) => {
                                                const updatedQuestions = [...mcqQuestions];
                                                updatedQuestions[index].tags = e.target.value;
                                                setMcqQuestions(updatedQuestions);
                                            }}
                                        />
                                    </div>

                                    {/* Difficulty */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Difficulty</label>
                                        <select
                                            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-[#363f8f] focus:outline-none"
                                            value={question.difficulty}
                                            onChange={(e) => {
                                                const updatedQuestions = [...mcqQuestions];
                                                updatedQuestions[index].difficulty = e.target.value;
                                                setMcqQuestions(updatedQuestions);
                                            }}
                                        >
                                            <option value="">Select Difficulty</option>
                                            <option value="Easy">Easy</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Hard">Hard</option>
                                        </select>
                                    </div>

                                    {/* Explanation */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Explanation</label>
                                        <textarea
                                            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-[#363f8f] focus:outline-none"
                                            value={question.explanation}
                                            onChange={(e) => {
                                                const updatedQuestions = [...mcqQuestions];
                                                updatedQuestions[index].explanation = e.target.value;
                                                setMcqQuestions(updatedQuestions);
                                            }}
                                        ></textarea>
                                    </div>

                                    {/* Explanation URLs */}
                                    {["Explanation URL 1", "Explanation URL 2"].map((url, urlIndex) => (
                                        <div key={urlIndex}>
                                            <label className="block text-sm font-medium text-gray-700">{url}</label>
                                            <input
                                                type="text"
                                                className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-[#363f8f] focus:outline-none"
                                                value={question.explanationUrls[urlIndex]}
                                                onChange={(e) => {
                                                    const updatedQuestions = [...mcqQuestions];
                                                    updatedQuestions[index].explanationUrls[urlIndex] = e.target.value;
                                                    setMcqQuestions(updatedQuestions);
                                                }}
                                            />

                                        </div>
                                    ))}
                                    <button
                                        className="mt-2 bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-lg"
                                        onClick={() => cancelMcqQuestion(index)}
                                    >
                                        Cancel Question
                                    </button>
                                </div>

                            ))}
                            <button
                                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg"
                                onClick={addMcqQuestion}
                            >
                                Add MCQ Question
                            </button>

                        </div>

                    </div>
                )}
            </div>
            <button
                className="mt-4 bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg"
                onClick={submitQuestions}
            >
                submit
            </button>
        </div>
    );
};

export default CreateExam;
