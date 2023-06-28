import SignUp from "./srs/screens/SignUp";
import AuthContextProvider from "./srs/contexts/AuthContext";

export default function App() {
  return (
    <AuthContextProvider>
      <SignUp />
    </AuthContextProvider>

  );
}

