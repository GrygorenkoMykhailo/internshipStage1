import React, { useState } from 'react';
import axios from 'axios';

interface SurveyQuestion {
    id: number;
    question: string;
    options: string[];
}

const questions: SurveyQuestion[] = [
    {
        id: 1,
        question: "Do you like our website?",
        options: ["Yes", "No"],
    },
];

type Props = {
    onSubmitCallback: () => void;
};

export const SurveyComponent: React.FC<Props> = ({ onSubmitCallback }) => {
    const [responses, setResponses] = useState<{ [key: string]: string }>({});

    const handleResponseChange = (questionId: string, response: string) => {
        setResponses(prev => ({ ...prev, [questionId]: response }));
    };

    const handleSubmit = async () => {
        try {
            axios.post(import.meta.env.VITE_BASE_URL + '/survey', { responses });
        } catch (error) {
            console.error(error);
        }
        onSubmitCallback();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 transition-opacity ease-in-out duration-1000">
            <div className="bg-white p-4 rounded shadow-lg">
                <h2 className="text-xl font-bold mb-4">Survey</h2>
                {questions.map(question => (
                    <div key={question.id} className="mb-4">
                        <p>{question.question}</p>
                        {question.options.map(option => (
                            <label key={option} className="block">
                                <input
                                    type="radio"
                                    name={`question-${question.id}`}
                                    value={option}
                                    onChange={() => handleResponseChange(question.question, option)}
                                />
                                {option}
                            </label>
                        ))}
                    </div>
                ))}
                <button onClick={handleSubmit} className="bg-blue-500 text-white p-2">
                    Submit
                </button>
            </div>
        </div>
    );
};
