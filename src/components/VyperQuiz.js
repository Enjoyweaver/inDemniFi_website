import React, { useState } from "react";
import { introQuestions, expertQuestions } from "./quiz/quizQuestions";
import videoFile from "../assets/Cert.mp4";

const VyperQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [quizLevel, setQuizLevel] = useState(null);
  const [questions, setQuestions] = useState([]);

  const selectQuizLevel = (level) => {
    setQuizLevel(level);
    setQuestions(level === "intro" ? introQuestions : expertQuestions);
  };

  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setQuizLevel(null);
  };

  return (
    <div className="quiz-container">
      {!quizLevel ? (
        <div className="level-selection">
          <h2 className="header2">
            Those that get a passing score will earn a similar NFT to the one
            below once we get time to create it.
          </h2>
          <h2 className="header2">
            But for now, you are welcome to take as many practice tests as you
            wish while we add more questions during development.
          </h2>
          <video autoPlay loop muted width="840" height="660">
            <source src={videoFile} type="video/mp4" />
          </video>
          <h2>Choose Your Difficulty Level</h2>
          <p>Select the quiz difficulty that matches your Vyper knowledge:</p>
          <div className="button-group">
            <button className="btn" onClick={() => selectQuizLevel("intro")}>
              Introductory Level
            </button>
            <button className="btn" onClick={() => selectQuizLevel("expert")}>
              Expert Level
            </button>
          </div>
        </div>
      ) : showScore ? (
        <div className="score-section">
          <h2>Quiz Complete!</h2>
          <p className="score-summary">
            You scored {score} out of {questions.length} on the {quizLevel}{" "}
            level quiz
          </p>
          <button className="btn" onClick={resetQuiz}>
            Try Another Level
          </button>
        </div>
      ) : (
        <div className="question-section">
          <div className="quiz-header">
            <span className="level-indicator">
              {quizLevel.toUpperCase()} LEVEL
            </span>
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
          </div>
          <div className="question-text">
            {questions[currentQuestion].questionText}
          </div>
          <div className="answer-section">
            {questions[currentQuestion].answerOptions.map(
              (answerOption, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(answerOption.isCorrect)}
                  className="btn"
                >
                  {answerOption.answerText}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VyperQuiz;
