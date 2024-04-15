import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../../Context/QuizContext";

export default function QuizIntro() {
  const navigation = useNavigate();
  const { quiz = {} } = useQuiz();
  return (
    <div className="container h-full d-flex align-items-center justify-content-center">
      <div className="quizIntroContent">
        <h1>{quiz.quizName}</h1>
        <p>{quiz.quizDescription}</p>
        <Button
          onClick={() => navigation(`/quiz/${quiz.quizId}/start`)}
          variant="primary"
        >
          Start The Quiz
        </Button>
      </div>
    </div>
  );
}
