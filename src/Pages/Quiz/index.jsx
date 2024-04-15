import { Outlet } from "react-router-dom";
import QuizContextProvider from "../../Context/QuizContext";

export default function Index() {
  return (
    <QuizContextProvider>
      <Outlet />
    </QuizContextProvider>
  );
}
