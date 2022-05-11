import "./App.css";
import { Container, Row } from "react-bootstrap";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <Container fluid>
      <Row>
        <Outlet />
      </Row>
    </Container>
  );
}

export default App;
