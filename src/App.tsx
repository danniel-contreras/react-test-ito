import { useAppSelector } from "./hooks/useRedux";
import { Auth } from "./pages/Auth";
import { Router } from "./routes/Router";
import "./App.css";
import { ToastContainer } from "react-toastify";

function App() {
  const auth = useAppSelector((state) => state.auth.auth);
  return (
    <>
      {auth.isLoggedIn ? <Router /> : <Auth />}{" "}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
