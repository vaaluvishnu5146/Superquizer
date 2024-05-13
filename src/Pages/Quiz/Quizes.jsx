import { useEffect } from "react";

export default function Quizes() {
  useEffect(() => {
    fetch("http://localhost:5000/api/quiz", {
      headers: {
        Token: localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  }, []);
  return <div>Quizes</div>;
}
