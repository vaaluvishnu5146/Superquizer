import Button from "react-bootstrap/Button";
import { useQuiz } from "../../Context/QuizContext";

export default function Quiz() {
  const {
    quiz = {},
    onGoingQuiz = {},
    changeQuestion = () => {},
    handleQuestionResponse = () => {},
  } = useQuiz();
  const questions = quiz?.questions;
  const { currentQuestion = {}, questionsAnswered = [] } = onGoingQuiz;
  const question = (questions && questions[currentQuestion]) || {};

  function handleOptionSelect(questionId = 0, optionId = "") {
    const attemptedQuestion = questions.find(
      (question) => question.id === questionId
    );
    const isCorrect = attemptedQuestion.options.find(
      (option) => option.id === optionId
    ).isAnswer;
    if (attemptedQuestion) {
      let response = {
        questionId,
        optionId,
        isCorrect,
      };
      handleQuestionResponse(response);
    }
  }

  function findCorrectOption(questionId) {
    let optionId =
      questionsAnswered.length > 0 &&
      questionsAnswered.find((answer) => answer.questionId === questionId)
        ?.optionId;
    return optionId;
  }

  return (
    <div className="h-full">
      <div className="nav"></div>
      <div className="quizContainer d-flex">
        <div className="quizSidebar"></div>
        <div className="quizContentContainer">
          <div className="quizForm">
            <h6>
              Question {currentQuestion + 1} of {quiz?.questions?.length}
            </h6>
            <h1 className="mb-5">{question?.title || "NA"}</h1>
            <div className="d-flex flex-column quizOptions mb-4">
              {question?.options?.map((option, index) => (
                <Button
                  key={`${index}-${option.title}-${option.id}`}
                  className={`optionCta ${
                    findCorrectOption(question?.id) === option.id && "selected"
                  }`}
                  variant="light"
                  onClick={() => handleOptionSelect(question.id, option.id)}
                >
                  {option.title}
                </Button>
              ))}
            </div>
            <div className="quizFooter d-flex justify-content-between">
              <Button
                variant="outline-primary"
                onClick={() => changeQuestion("decrement")}
                disabled={currentQuestion === 0}
              >
                Prev
              </Button>{" "}
              <Button
                variant="outline-primary"
                onClick={() => changeQuestion("increment")}
                disabled={
                  onGoingQuiz?.currentQuestion === quiz?.questions?.length - 1
                }
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 1. Navbar
//   2. Sidebar
//   3. ContentArea - Question, Options
