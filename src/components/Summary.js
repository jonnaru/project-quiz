import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { quiz } from "reducers/quiz";

import "./Summary.css";

export const Summary = () => {
  const dispatch = useDispatch();
  const answers = useSelector((state) => state.quiz.answers);

  const numCorrectAnswers = answers.filter((answer) => answer.isCorrect).length;
  const numAnswers = answers.length;

  return (
    <div className="summary-container">
      <p>
        Congratulations! You got {numCorrectAnswers} right answers out of{" "}
        {numAnswers} 🌍
      </p>
      <button
        className="summary-btn"
        onClick={() => dispatch(quiz.actions.restart())}
      >
        Restart
      </button>
    </div>
  );
};
