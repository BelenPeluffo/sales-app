import { useEffect, useState } from "react";
import "./App.css";
import { getAPIRespose } from "./modules/common/services/services";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const response = getAPIRespose().then((response) =>
      setMessage(response),
    );
    console.log("response", response);
  }, []);

  return (
    <>
      API dice: {message}
      {import.meta.env.VITE_API_URL}
    </>
  );
}

export default App;
