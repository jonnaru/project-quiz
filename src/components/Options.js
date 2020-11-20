import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { quiz } from "reducers/quiz";
// import "./Options.css";

//  *** Styled components ***

const FormContainer = styled.form`
  margin: 20px;
`;

const AnswerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// hiding the radio button
const Input = styled.input`
  position: absolute;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px 1px 1px 1px);
`;

const OptionsLabel = styled.label`
  width: 350px;
  display: block;
  position: relative;
  font-family: "Roboto", Sans-Serif;
  font-size: 16px;
  color: #000;
  /* box-shadow: 10px 10px 14px -9px rgba(166, 153, 166, 1); */
  border-radius: 8px;
  margin-bottom: 15px;
  padding: 15px 15px;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    background-color: #dbf6e9;
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

  console.log(answer?.answerIndex ?? "hej");
  console.log(answer?.index ?? "hej");

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
