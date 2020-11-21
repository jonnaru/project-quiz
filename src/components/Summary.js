import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { SummaryAnswer } from "./SummaryAnswer";
import { quiz } from "reducers/quiz";

import bookAnimation from "../lotties/book-animation";
import coolAnimation from "../lotties/cool-animation";
import beerAnimation from "../lotties/beer-animation";

// Styles components

const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const SummaryButton = styled.button`
  width: 150px;
  margin-bottom: 15px;
  padding: 10px 0;
  font-size: 16px;
  color: #000;
  background-color: #fff;
  border-radius: 50px;
  transition: 0.2s;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #262626;
    color: #fff;
  }

  &:focus {
    outline: #fff solid 1px;
  }
`;

// Summery

export const Summary = () => {
  const dispatch = useDispatch();
  const answers = useSelector((state) => state.quiz.answers);

  const numCorrectAnswers = answers.filter((answer) => answer.isCorrect).length;
  const numAnswers = answers.length;

  const getSummeryKey = () => {
    if (numCorrectAnswers === numAnswers) return "good";
    if (numCorrectAnswers >= numAnswers / 2) return "medium";
    return "bad";
  };

  // storing the result from getSummaryKey() in variable resultKey
  const resultKey = getSummeryKey();

  const resultInfo = {
    bad: {
      text: `You got ${numCorrectAnswers} of ${numAnswers}. Go back to school 🙄`,
      lottie: bookAnimation,
    },
    medium: {
      text: `You got ${numCorrectAnswers} of ${numAnswers}... that's alright 😁`,
      lottie: coolAnimation,
    },
    good: {
      text: "You got the highest score 🤩",
      lottie: beerAnimation,
    },
  };

  return (
    <SummaryContainer>
      <SummaryAnswer
        lottie={resultInfo[resultKey].lottie}
        text={resultInfo[resultKey].text}
      />
      <SummaryButton onClick={() => dispatch(quiz.actions.restart())}>
        Restart
      </SummaryButton>
    </SummaryContainer>
  );
};
