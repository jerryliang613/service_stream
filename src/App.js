import "./App.css";
import Movies from "./components/Movies";
import MovieContextProvider from "./contexts/MovieContext";

function App() {
  return (
    <div className="App">
      <MovieContextProvider>
        <Movies />
      </MovieContextProvider>
    </div>
  );
}

export default App;
