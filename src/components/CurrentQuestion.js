import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { quiz } from "reducers/quiz";
import { Options } from "./Options";

// *** Styled components ***

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
const QuestionButton = styled.button`
  width: 150px;
  font-size: 16px;
  color: #ffffff;
  background-color: #9ddfd3;
  border: none;
  box-shadow: 10px 10px 14px -9px rgba(166, 153, 166, 1);
  border-radius: 8px;
  margin-bottom: 15px;
  padding: 15px 0;
  cursor: pointer;
  transition: 0.4s;

  &:hover {
    background-color: #dbf6e9;
  }

  &:focus {
    background-color: #ffffff;
    color: #62626b;
    outline: #31326f solid 1px;
  }

  &:disabled {
    opacity: 0.4;
  }
`;

const TextNumber = styled.p`
  font-size: 20px;
`;
const Heading = styled.h1`
  text-align: center;
  width: 80%;
`;

// *** QurrentQuestion ***

export const CurrentQuestion = () => {
  const dispatch = useDispatch();

  const question = useSelector(
    (state) => state.quiz.questions[state.quiz.currentQuestionIndex]
  );

  const questionNumber = useSelector(
    (state) => state.quiz.currentQuestionIndex + 1
  );

  const questionTotal = useSelector((state) => state.quiz.questions.length);

  const answer = useSelector((state) =>
    state.quiz.answers.find((answer) => answer.questionId === question.id)
  );

  if (!question) {
    return <h1>Oh no! I could not find the current question!</h1>;
  }
  console.log(question.image);
  return (
    <QuestionContainer>
      <Heading>{question.questionText}</Heading>
      <img src={question.image} alt={question.alt} />
      <TextNumber>
        Question {questionNumber} of {questionTotal}
      </TextNumber>
      <Options />
      <QuestionButton
        disabled={answer === undefined}
        onClick={() => dispatch(quiz.actions.goToNextQuestion())}
      >
        {questionNumber === questionTotal ? "Show Summary" : "Next Question"}
      </QuestionButton>
    </QuestionContainer>
  );
};
