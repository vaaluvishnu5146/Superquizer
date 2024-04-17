import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import QuizIntro from "./Pages/Quiz/QuizIntro";
import Quiz from "./Pages/Quiz/Quiz";
import QuizExtro from "./Pages/Quiz/QuizExtro";
import Index from "./Pages/Quiz";
import Login from "./Pages/Authentication/Login";
import Signup from "./Pages/Authentication/Signup";
import Quizes from "./Pages/Quiz/Quizes";

function App() {
  return (
    <Routes>
      <Route Component={Login} path="/" />
      <Route Component={Signup} path="/signup" />
      <Route Component={Index} path="/quiz">
        <Route Component={Quizes} index />
        <Route Component={QuizIntro} path="/quiz/:quizId" />
        <Route Component={Quiz} path="/quiz/:quizId/start/" />
        <Route Component={QuizExtro} path="/quiz/:quizId/result" />
      </Route>
    </Routes>
  );
}

export default App;
