import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { quiz } from "reducers/quiz";

//  *** Styled components ***

const FormContainer = styled.form`
  margin: 20px;
  width: 650px;
  display: flex;
  justify-content: space-evenly;

  @media (max-width: 668px) {
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

const AnswerContainer = styled.div`
  display: flex;
`;

const OptionsLabel = styled.label`
  text-align: center;
  width: 120px;
  margin-bottom: 15px;
  padding: 10px;
  font-family: "Roboto", Sans-Serif;
  font-size: 16px;
  color: #000;
  border-radius: 50px;
  transition: 0.2s;
  cursor: ${(props) => (props.disabled ? "arrow" : "pointer")};

  @media (max-width: 668px) {
    width: 300px;
  }

  &:hover {
    background-color: ${(props) =>
      props.disabled ? "rgba(255, 255, 255, 0.4)" : "#262626"};
    color: ${(props) => (props.disabled ? "#000" : "#fff")};
  }

  /* background: ${(props) =>
    props.disabled ? "rgba(255, 255, 255, 0.4)" : "white"}; */

  background: ${(props) => {
    if (props.disabled) {
      return "rgba(255, 255, 255, 0.4)";
    }

    if (props.correct) {
      // if correct
      return "rgba(255, 255, 0, 1)";
    }

    return "white";
  }};
`;

// hiding the radio button
const Input = styled.input`
  position: absolute;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px);
`;

// *** Options ***

export const Options = () => {
  const dispatch = useDispatch();

  const question = useSelector(
    (state) => state.quiz.questions[state.quiz.currentQuestionIndex]
  );

  const answer = useSelector((state) =>
    state.quiz.answers.find((answer) => answer.questionId === question.id)
  );

  if (!question) {
    return <h1>Oh no! I could not find the current answers!</h1>;
  }

  return (
    <FormContainer>
      {question.options.map((option, index) => {
        return (
          <AnswerContainer key={index}>
            <Input
              disabled={answer !== undefined}
              checked={answer !== undefined && answer.answerIndex === index}
              type="radio"
              name="option"
              id={index}
              onChange={() =>
                dispatch(
                  quiz.actions.submitAnswer({
                    questionId: question.id,
                    answerIndex: index,
                  })
                )
              }
            />
            <OptionsLabel
              disabled={answer !== undefined}
              correct={answer !== undefined && answer.answerIndex === index}
              htmlFor={index}
              // className="options-label"
            >
              {option}
            </OptionsLabel>
          </AnswerContainer>
        );
      })}
    </FormContainer>
  );
};
// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { quiz } from "reducers/quiz";

// import "./Options.css";

// export const Options = () => {
//   const dispatch = useDispatch();

//   const question = useSelector(
//     (state) => state.quiz.questions[state.quiz.currentQuestionIndex]
//   );

//   const answer = useSelector((state) =>
//     state.quiz.answers.find((answer) => answer.questionId === question.id)
//   );

//   console.log(answer);

//   if (!question) {
//     return <h1>Oh no! I could not find the current answers!</h1>;
//   }

//   const getButtonClass = (index) => {
//     const indexIsAnswerIndex = answer && answer.answerIndex === index;
//     if (indexIsAnswerIndex && answer.isCorrect) {
//       return "true";
//     }
//     if (indexIsAnswerIndex && !answer.isCorrect) {
//       return "false";
//     }
//     return "";
//   };

//   return (
//     <form>
//       {question.options.map((option, index) => {
//         return (
//           <div className={`answer-container ${getButtonClass}`} key={index}>
//             <input
//               disabled={answer !== undefined}
//               checked={answer !== undefined && answer.answerIndex === index}
//               type="radio"
//               name="option"
//               id={index}
//               onChange={() =>
//                 dispatch(
//                   quiz.actions.submitAnswer({
//                     questionId: question.id,
//                     answerIndex: index,
//                   })
//                 )
//               }
//             />
//             <label htmlFor={index} className="options-label">
//               {option}
//             </label>
//           </div>
//         );
//       })}
//     </form>
//   );
// };
