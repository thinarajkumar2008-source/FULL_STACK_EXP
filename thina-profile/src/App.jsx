import Profile from "./components/Profile";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Profile />

      <footer className="app-footer">
        <p>
          © {new Date().getFullYear()} Thina Rajkumar R.
          All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
