import logo from "./logo.svg";
import "./App.css";
import { Container, Row } from "react-bootstrap";
import Header from "./components/Layout/Header";
import AuthForm from "./components/Auth/AuthForm";

function App() {
  return (
    <Container>
      <AuthForm />
      <Row>
        <Header />
      </Row>
      <Container>
        
      </Container>
    </Container> 
  );
}

export default App;
