import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import QuizIntro from "./Pages/Quiz/QuizIntro";
import Quiz from "./Pages/Quiz/Quiz";
import QuizExtro from "./Pages/Quiz/QuizExtro";
import Index from "./Pages/Quiz";

function App() {
  return (
    <Routes>
      <Route Component={Index} path="/quiz/:quizId">
        <Route Component={QuizIntro} index />
        <Route Component={Quiz} path="/quiz/:quizId/start/" />
        <Route Component={QuizExtro} path="/quiz/:quizId/result" />
      </Route>
    </Routes>
  );
}

export default App;
