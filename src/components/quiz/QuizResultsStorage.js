import { useState, useEffect } from "react";

// Store results in localStorage for persistence
const STORAGE_KEY = "vyper_quiz_results";

const QuizResultsStorage = {
  // Get all stored quiz results
  getAllResults: () => {
    try {
      const results = localStorage.getItem(STORAGE_KEY);
      return results ? JSON.parse(results) : {};
    } catch (error) {
      console.error("Error getting quiz results:", error);
      return {};
    }
  },

  // Store a new quiz result
  storeResult: (walletAddress, score, totalQuestions) => {
    try {
      const results = QuizResultsStorage.getAllResults();

      results[walletAddress] = {
        score,
        totalQuestions,
        timestamp: new Date().toISOString(),
        hasPassed: score / totalQuestions >= 0.7, // 70% passing threshold
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(results));
      return true;
    } catch (error) {
      console.error("Error storing quiz result:", error);
      return false;
    }
  },

  // Check if a wallet has already taken the quiz
  hasCompleted: (walletAddress) => {
    const results = QuizResultsStorage.getAllResults();
    return !!results[walletAddress];
  },

  // Get eligible wallets for NFT (passing score)
  getEligibleWallets: () => {
    const results = QuizResultsStorage.getAllResults();
    return Object.entries(results)
      .filter(([_, data]) => data.hasPassed)
      .map(([wallet]) => wallet);
  },

  // Get a specific wallet's result
  getWalletResult: (walletAddress) => {
    const results = QuizResultsStorage.getAllResults();
    return results[walletAddress];
  },
};

export default QuizResultsStorage;
