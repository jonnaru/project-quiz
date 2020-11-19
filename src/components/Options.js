import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { quiz } from "reducers/quiz";

import "./Options.css";

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
    <form>
      {question.options.map((option, index) => {
        return (
          <div className="answer-container" key={index}>
            <input
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
            <label htmlFor={index} className="options-label">
              {option}
            </label>
          </div>
        );
      })}
    </form>
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
