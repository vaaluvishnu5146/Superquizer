import { useState, createContext, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import Axios from "axios";

const QuizContext = createContext({
  quiz: {},
  isStarted: false,
  onGoingQuiz: {
    currentQuestion: 0,
    questionsAnswered: [{}, {}],
  },
  changeQuestion: () => {},
  handleQuestionResponse: () => {},
});

export const useQuiz = () => useContext(QuizContext);

export default function QuizContextProvider({ children }) {
  const [quiz, setQuiz] = useState({});
  const [isStarted] = useState(false);
  const [onGoingQuiz, setOngoingQuiz] = useState({
    currentQuestion: 0,
    questionsAnswered: [],
  });

  function changeQuestion(type = "") {
    const onGoingQuizCopy = {
      ...onGoingQuiz,
    };
    if (type === "increment") {
      onGoingQuizCopy.currentQuestion < quiz.questions.length - 1
        ? (onGoingQuizCopy.currentQuestion += 1)
        : null;
    } else {
      onGoingQuizCopy.currentQuestion > 0
        ? (onGoingQuizCopy.currentQuestion -= 1)
        : null;
    }
    setOngoingQuiz(onGoingQuizCopy);
  }

  function handleQuestionResponse(data = {}) {
    const onGoingQuizCopy = { ...onGoingQuiz };
    if (data.questionId) {
      const matchingAnswer = onGoingQuizCopy.questionsAnswered.find(
        (answer) => answer.questionId === data.questionId
      );
      if (matchingAnswer) {
        onGoingQuizCopy.questionsAnswered =
          onGoingQuizCopy.questionsAnswered.filter(
            (answer) => answer.questionId !== data.questionId
          );
        onGoingQuizCopy.questionsAnswered.push(data);
      } else {
        onGoingQuizCopy.questionsAnswered.push(data);
      }
    }
    setOngoingQuiz(onGoingQuizCopy);
  }

  useEffect(() => {
    try {
      setOngoingQuiz(
        JSON.parse(sessionStorage.getItem("onGoingQuiz")) || {
          currentQuestion: 0,
          questionsAnswered: [],
        }
      );
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:5173/quiz.json")
      .then((response) => {
        if (response.status === 200 && response.statusText === "OK") {
          setQuiz(response.data);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem("onGoingQuiz", JSON.stringify(onGoingQuiz));
    } catch (e) {
      console.log(e);
    }
  }, [onGoingQuiz]);

  return (
    <QuizContext.Provider
      value={{
        quiz,
        isStarted,
        onGoingQuiz,
        changeQuestion,
        handleQuestionResponse,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

QuizContextProvider.propTypes = {
  children: PropTypes.node,
};
