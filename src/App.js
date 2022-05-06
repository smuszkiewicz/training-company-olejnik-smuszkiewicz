import logo from "./logo.svg";
import "./App.css";
import { Container, Row } from "react-bootstrap";
import Header from "./components/Layout/Header";
import AuthForm from "./components/Auth/AuthForm";
import { uid } from "./index";

function App() {
  return (
    <Container fluid>
      {uid == null && <AuthForm />}
      <Row>
      <Header />
      </Row>
      <Row>
        <h1>Panel administracyjny serwisu szkoleniowego</h1>
      </Row>
    </Container>
  );
}

export default App;
