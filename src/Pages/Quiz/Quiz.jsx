import Button from "react-bootstrap/Button";
import { useQuiz } from "../../Context/QuizContext";

export default function Quiz() {
  const { quiz = {}, onGoingQuiz = {}, changeQuestion = () => {} } = useQuiz();
  console.log(quiz?.questions, onGoingQuiz);
  const questions = quiz?.questions;
  const question = (questions && questions[onGoingQuiz.currentQuestion]) || {};
  return (
    <div className="h-full">
      <div className="nav"></div>
      <div className="quizContainer d-flex">
        <div className="quizSidebar"></div>
        <div className="quizContentContainer">
          <div className="quizForm">
            <h5>Question 1 of {quiz?.questions?.length}</h5>
            <h1 className="mb-5">{question?.title || "NA"}</h1>
            <div className="d-flex flex-column quizOptions mb-4">
              {question?.options?.map((option, index) => (
                <Button
                  key={`${index}-${option.title}`}
                  className="optionCta selected"
                  variant="light"
                >
                  {option.title}
                </Button>
              ))}
            </div>
            <div className="quizOptions d-grid mb-4">
              <Button variant="success" size="lg">
                Submit
              </Button>{" "}
            </div>
            <div className="quizFooter d-flex justify-content-between">
              <Button
                variant="outline-primary"
                onClick={() => changeQuestion("decrement")}
              >
                Prev
              </Button>{" "}
              <Button
                variant="outline-primary"
                onClick={() => changeQuestion("increment")}
              >
                Next
              </Button>{" "}
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
