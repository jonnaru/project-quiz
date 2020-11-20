import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { quiz } from "reducers/quiz";

// Styles components

const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const SummaryParagraph = styled.p`
  text-align: center;
  font-size: 36px;
  width: 80%;
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

  const getSummeryText = () => {
    if (numCorrectAnswers === numAnswers) return "You got the highest score 🤩";
    if (numCorrectAnswers >= numAnswers / 2) {
      return `You got ${numCorrectAnswers} of ${numAnswers}... that's alright 😁`;
    }
    return `You got ${numCorrectAnswers} of ${numAnswers}. Go back to school 🙄`;
  };

  return (
    <SummaryContainer>
      <SummaryParagraph>{getSummeryText()}</SummaryParagraph>
      <SummaryButton onClick={() => dispatch(quiz.actions.restart())}>
        Restart
      </SummaryButton>
    </SummaryContainer>
  );
};
