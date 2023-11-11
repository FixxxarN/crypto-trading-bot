import { useEffect } from "react";

const App = () => {
  useEffect(() => {
    fetch('http://localhost:3001/initial').then(response => response.json()).then(data => console.log(data))
  }, []);

  return (
    <p>Hello, world!</p>
  );
}

export default App;
