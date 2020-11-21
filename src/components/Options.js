import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { quiz } from "reducers/quiz";

//  *** Styled components ***

const FormContainer = styled.form`
  margin-top: 50px;
  margin-bottom: 30px;
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
  opacity: ${(props) => (props.disabled ? "0.4" : "1")};
  background: ${(props) =>
    props.clickedAnswer ? "rgba(255, 0, 0, 1)" : "white"};
  background: ${(props) => props.correct && "rgba(0, 255, 0, 1)"};

  @media (max-width: 668px) {
    width: 300px;
  }

  &:hover {
    // change color if not disabled
    background-color: ${(props) => !props.disabled && "#262626"};
    color: ${(props) => !props.disabled && "#fff"};
  }
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

  console.log(question?.correctAnswerIndex);
  console.log(answer?.isCorrect);
  console.log(answer?.answerIndex);

  return (
    <FormContainer>
      {question.options.map((option, index) => {
        return (
          <AnswerContainer key={index}>
            <Input
              disabled={answer} // is true after answer is given
              checked={answer && answer.answerIndex === index} // is true for answer given
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
              disabled={answer} // is true after answer is given
              clickedAnswer={answer && answer.answerIndex === index} // is true for clicked answer, after answer is given
              correct={answer && question.correctAnswerIndex === index} // is true for correct answer, after answer is given
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
