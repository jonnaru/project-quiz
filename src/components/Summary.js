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
  font-size: 32px;
  text-align: center;
  width: 80%;
`;

const SummaryButton = styled.button`
  width: 200px;
  font-size: 16px;
  color: #ffffff;
  background-color: #9ddfd3;
  border: none;
  box-shadow: 10px 10px 14px -9px rgba(166, 153, 166, 1);
  border-radius: 8px;
  margin-bottom: 15px;
  padding: 15px 15px;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    background-color: #dbf6e9;
  }

  &:focus {
    background-color: #ffffff;
    color: #62626b;
    outline: #31326f solid 1px;
  }
`;

// Summery

export const Summary = () => {
  const dispatch = useDispatch();
  const answers = useSelector((state) => state.quiz.answers);

  const numCorrectAnswers = answers.filter((answer) => answer.isCorrect).length;
  const numAnswers = answers.length;

  return (
    <SummaryContainer>
      <SummaryParagraph>
        Congratulations! You got {numCorrectAnswers} right answers out of{" "}
        {numAnswers} 🌍
      </SummaryParagraph>
      <SummaryButton onClick={() => dispatch(quiz.actions.restart())}>
        Restart
      </SummaryButton>
    </SummaryContainer>
  );
};
