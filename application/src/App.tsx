import "./App.css";
import { Container, CssBaseline } from "@mui/material";
import UserPage from "./Pages/UserPage";
import ProviderWrapper from "./Provider";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <ProviderWrapper>
      <CssBaseline />
      <Container maxWidth="md" sx={{ height: "100vh", width: "100vw" }}>
        <UserPage />
      </Container>
    </ProviderWrapper>
  );
}

export default App;
