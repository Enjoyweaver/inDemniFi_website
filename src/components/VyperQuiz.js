import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import QuizResultsStorage from "./quiz/QuizResultsStorage";
import { introQuestions, expertQuestions } from "./quiz/quizQuestions";
import videoFile from "../assets/Cert.mp4";

const VyperQuiz = () => {
  // Existing state
  const [publicKey, setPublicKey] = useState();
  const [network, setNetwork] = useState();
  const [chainId, setChainId] = useState();
  const [msg, setMsg] = useState();
  const [buttonPressed, setButtonPressed] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [hasCompletedQuiz, setHasCompletedQuiz] = useState(false);

  // New state for quiz level
  const [quizLevel, setQuizLevel] = useState(null);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (publicKey) {
      const completed = QuizResultsStorage.hasCompleted(publicKey);
      setHasCompletedQuiz(completed);

      if (completed) {
        const result = QuizResultsStorage.getWalletResult(publicKey);
        setMsg(
          `You have already completed the ${result.level} quiz with a score of ${result.score}/${result.totalQuestions}`
        );
      }
    }
  }, [publicKey]);

  const connectButton = async () => {
    if (typeof window.ethereum !== "undefined") {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.listAccounts();
        const { name, chainId } = await provider.getNetwork();
        setNetwork(name);
        setChainId(chainId);
        setPublicKey(accounts[0]);
      } catch (error) {
        setMsg("Connection request denied. Please try again.");
      }
    } else {
      setMsg("MetaMask is not installed or supported on this device.");
    }
  };

  const selectQuizLevel = (level) => {
    setQuizLevel(level);
    setQuestions(level === "intro" ? introQuestions : expertQuestions);
    setButtonPressed(true);
  };

  const handleAnswerClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      const finalScore = score + (isCorrect ? 1 : 0);
      QuizResultsStorage.storeResult(
        publicKey,
        finalScore,
        questions.length,
        quizLevel
      );
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setQuizLevel(null);
    setButtonPressed(false);
  };

  const disconnectWallet = () => {
    setPublicKey(undefined);
    setNetwork(undefined);
    setChainId(undefined);
    resetQuiz();
  };

  return (
    <div className="quiz-container">
      {!publicKey ? (
        <div className="connect-wallet">
          <p>
            Those that get a passing score will earn a similar NFT to the one
            below once we get time to create it.{" "}
          </p>
          <p>
            But for now, you are welcome to take as many practice tests as you
            wish while we add more questions while its still being developed.
          </p>
          <video autoPlay loop muted width="840" height="660">
            <source src={videoFile} type="video/mp4" />
          </video>
          <h2>Connect Your Wallet to Start the Vyper Security Quiz</h2>
          <button className="wbtn" onClick={connectButton}>
            Connect MetaMask
          </button>
          {msg && <p className="error-message">{msg}</p>}
        </div>
      ) : hasCompletedQuiz ? (
        <div className="already-completed">
          <h2>Quiz Already Completed</h2>
          <p>{msg}</p>
          <button className="btn" onClick={disconnectWallet}>
            Disconnect Wallet
          </button>
        </div>
      ) : !buttonPressed ? (
        <div className="level-selection">
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
          <div className="btnRow">
            <button className="btn" onClick={resetQuiz}>
              Try Another Level
            </button>
            <button className="btn" onClick={disconnectWallet}>
              Disconnect Wallet
            </button>
          </div>
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
