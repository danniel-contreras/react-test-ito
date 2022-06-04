import { useAppSelector } from "./hooks/useRedux";
import { Auth } from "./pages/Auth";
import { Router } from "./routes/Router";
import "./App.css"

function App() {
  const auth = useAppSelector((state) => state.auth.auth);
  return <>{auth.isLoggedIn ? <Router /> : <Auth />}</>;
}

export default App;
