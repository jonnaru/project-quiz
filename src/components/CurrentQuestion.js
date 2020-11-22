import React from "react";
import styled, { keyframes } from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { quiz } from "reducers/quiz";
import { Options } from "./Options";

// *** Styled components ***

const QuestionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
`;
const QuestionButton = styled.button`
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

  /* &:focus {
    background-color: #fff;
    color: #262626;
    outline: #fff solid 1px;
  } */

  &:disabled {
    opacity: 0.4;
    &:hover {
      background-color: #fff;
      color: #000;
    }
  }
`;

const TextNumber = styled.p`
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 0;
`;

const HeadingContainer = styled.div`
  height: 200px;

  @media (max-width: 668px) {
    height: 90px;
  }
`;
const Heading = styled.h1`
  text-align: center;
  margin: 60px auto 30px auto;
  font-size: 40px;
  width: 60%;

  @media (max-width: 1024px) {
    width: 80%;
  }

  @media (max-width: 668px) {
    width: 95%;
    font-size: 24px;
    margin: 20px auto 15px auto;
  }
`;

const pulse = keyframes`
  from {
    transform: scale(1);
  }
  50% {
    transform: scale(0.95);
  }
  to {
    transform: scale(1);
  }
`;

const Image = styled.img`
  animation-name: ${pulse};
  animation-duration: 10s;
  animation-iteration-count: infinite;
  height: 250px;
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

  return (
    <QuestionContainer>
      <HeadingContainer>
        <Heading>{question.questionText}</Heading>
      </HeadingContainer>
      <Image src={question.image} alt={question.alt} />
      <Options />

      <QuestionButton
        disabled={answer === undefined}
        onClick={() => dispatch(quiz.actions.goToNextQuestion())}
      >
        {questionNumber === questionTotal ? "Show Summary" : "Next Question"}
      </QuestionButton>
      <TextNumber>
        Question {questionNumber} of {questionTotal}
      </TextNumber>
    </QuestionContainer>
  );
};
