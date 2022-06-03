import { useAppSelector } from "./hooks/useRedux";
import { Auth } from "./pages/Auth";
import { Home } from "./pages/Home";

function App() {
  const auth = useAppSelector((state) => state.auth.auth);
  return <>{auth.isLoggedIn ? <Home /> : <Auth />}</>;
}

export default App;
