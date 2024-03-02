import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from "react-router-dom";

const QuizApp = () => {
  const [quiz, setQuiz] = useState(generateQuiz());
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  // Generate a random quiz
  function generateQuiz() {
    // Replace this with your own logic to generate quizzes
    const questions = [
      {
        question: 'What is 2 + 2?',
        options: ['3', '4', '5', '6'],
        answer: '4'
      },
      {
        question: "What color are Mickey Mouse's shoes?",
        options: ['White', 'Yellow', 'Green', 'Pink'],
        answer: 'Yellow'
      },
      {
        question: 'What year was the United Nations established?',
        options: ['1945', '1942', '2000', '1855'],
        answer: '1945'
      },
      {
        question: 'Pink Ladies and Granny Smiths are types of what fruit?',
        options: ['Guava', 'Banana', 'Apple', 'Mango'],
        answer: 'Apple'
      },
      {
        question: 'What phone company produced the 3310?',
        options: ['Vivo', 'Realme', 'Samsung', 'Nokia'],
        answer: 'Nokia'
      },
      {
        question: 'What fruit takes the scientific name Mangifera indica?',
        options: ['Apple', 'Mango', 'Orange', 'Kiwi'],
        answer: 'Mango'
      },  
      // Add more questions here
    ];
    return questions;
  }

  const handleAnswerOptionClick = (answer) => {
    setUserAnswers([...userAnswers, answer]);
    if (answer === quiz[currentQuestion].answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quiz.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setQuiz(generateQuiz());
    setCurrentQuestion(0);
    setUserAnswers([]);
    setScore(0);
    setShowScore(false);
  };

  return (
    <Router basename='quiz_app'>
    <div className="container-fluid bg-secondary vh-100">
      <div className="row justify-content-center align-items-center h-100">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body m-2 p-4">
              {showScore ? (
                <div className="score-section text-center">
                  <h2 className="card-title text-muted">You scored {score} out of {quiz.length}</h2>
                  <button className="btn btn-outline-secondary m-1 w-20" onClick={resetQuiz}>Retry Quiz</button>
                </div>
              ) : (
                <>
                  <div className="question-section p-2">
                    <h2 className='text-muted mb-4'>Let's play the quiz..</h2>
                    <div className="question-count mb-4">
                      <span>Question {currentQuestion + 1}</span>/{quiz.length}
                    </div>
                    <div className="question-text">{quiz[currentQuestion].question}</div>
                  </div>
                  <div className="answer-section">
                    {quiz[currentQuestion].options.map((option) => (
                      <button
                        key={option}
                        className="btn btn-outline-secondary m-1 w-20"
                        onClick={() => handleAnswerOptionClick(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </Router>
  );
};


export default QuizApp;
