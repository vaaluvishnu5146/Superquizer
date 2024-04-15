import { useState, createContext, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

const QuizContext = createContext({
  quiz: {},
  isStarted: false,
  onGoingQuiz: {
    currentQuestion: 0,
    questionsAnswered: [{}, {}],
  },
  changeQuestion: () => {},
});

export const useQuiz = () => useContext(QuizContext);

export default function QuizContextProvider({ children }) {
  const [quiz, setQuiz] = useState({});
  const [isStarted, setStarted] = useState(false);
  const [onGoingQuiz, setOngoingQuiz] = useState({
    currentQuestion: 0,
    questionsAnswered: [],
  });

  function changeQuestion(type = "") {
    const onGoingQuizCopy = {
      ...onGoingQuiz,
    };
    if (type === "increment") {
      onGoingQuizCopy.currentQuestion += 1;
    } else {
      onGoingQuizCopy.currentQuestion -= 1;
    }
    setOngoingQuiz(onGoingQuizCopy);
  }

  useEffect(() => {
    fetch("http://localhost:5173/quiz.json")
      .then((response) => response.json())
      .then((result) => setQuiz(result.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <QuizContext.Provider
      value={{
        quiz,
        isStarted,
        onGoingQuiz,
        changeQuestion,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
