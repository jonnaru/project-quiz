import { createSlice } from "@reduxjs/toolkit";

// Change these to your own questions!
const questions = [
  {
    id: 1,
    questionText: "Which country has a unicorn as its national animal?",
    options: ["Japan", "Scotland", "Curaçao", "Norway"],
    correctAnswerIndex: 1,
    image: "./assets/unicorn.svg",
    alt: "unicorn",
  },
  {
    id: 2,
    questionText: "Where would you find the Bay of Pigs?",
    options: ["Canada", "Cuba", "South Africa", "India"],
    correctAnswerIndex: 1,
    image: "./assets/pigs.svg",
    alt: "pigs",
  },
  {
    id: 3,
    questionText:
      "Which country in the European Union has the biggest population?",
    options: ["Spain", "France", "United Kingdom", "Germany"],
    correctAnswerIndex: 3,
    image: "./assets/people.svg",
    alt: "people",
  },
  {
    id: 4,
    questionText: "Which country invented gin?",
    options: ["England", "Ireland", "Romania", "Holland"],
    correctAnswerIndex: 3,
    image: "./assets/gin-tonic.svg",
    alt: "gin-tonic",
  },
  {
    id: 5,
    questionText: "Officially, what is the hottest country in the world?",
    options: ["Ghana", "Saudiarabien", "Pakistan", "Burkina Faso"],
    correctAnswerIndex: 3,
    image: "./assets/sun.svg",
    alt: "sun",
  },
  {
    id: 6,
    questionText: "Which country has the most islands in the world?",
    options: ["Sweden", "Maldives", "Philippines", "Finland"],
    correctAnswerIndex: 0,
    image: "./assets/island.svg",
    alt: "island",
  },
];

const initialState = {
  questions,
  answers: [],
  currentQuestionIndex: 0,
  quizOver: false,
};

export const quiz = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    /**
     * Use this action when a user selects an answer to the question.
     * The answer will be stored in the `quiz.answers` state with the
     * following values:
     *
     *    questionId  - The id of the question being answered.
     *    answerIndex - The index of the selected answer from the question's options.
     *    question    - A copy of the entire question object, to make it easier to show
     *                  details about the question in your UI.
     *    answer      - The answer string.
     *    isCorrect   - true/false if the answer was the one which the question says is correct.
     *
     * When dispatching this action, you should pass an object as the payload with `questionId`
     * and `answerIndex` keys. See the readme for more details.
     */

    submitAnswer: (state, action) => {
      const { questionId, answerIndex } = action.payload;
      const question = state.questions.find((q) => q.id === questionId);

      if (!question) {
        throw new Error(
          "Could not find question! Check to make sure you are passing the question id correctly."
        );
      }

      if (question.options[answerIndex] === undefined) {
        throw new Error(
          `You passed answerIndex ${answerIndex}, but it is not in the possible answers array!`
        );
      }

      state.answers.push({
        questionId,
        answerIndex,
        question,
        answer: question.options[answerIndex],
        isCorrect: question.correctAnswerIndex === answerIndex,
      });
    },

    /**
     * Use this action to progress the quiz to the next question. If there's
     * no more questions (the user was on the final question), set `quizOver`
     * to `true`.
     *
     * This action does not require a payload.
     */
    goToNextQuestion: (state) => {
      if (state.currentQuestionIndex + 1 === state.questions.length) {
        state.quizOver = true;
      } else {
        state.currentQuestionIndex += 1;
      }
    },

    /**
     * Use this action to reset the state to the initial state the page had
     * when it was loaded. Who doesn't like re-doing a quiz when you know the
     * answers?!
     *
     * This action does not require a payload.
     */
    restart: () => {
      return initialState;
    },
  },
});
