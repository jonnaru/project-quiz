import React from "react";
import { useSelector } from "react-redux";

import { CurrentQuestion } from "./CurrentQuestion";
import { Summary } from "./Summary";

export const Quiz = () => {
  const quizOver = useSelector((state) => state.quiz.quizOver);

  return quizOver ? <Summary /> : <CurrentQuestion />;
};
