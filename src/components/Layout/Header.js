import { Container, Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = (props) => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Szkolenia</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#users">Użytkownicy</Nav.Link>
          <Nav.Link href="#calender">Kalendarz</Nav.Link>
          <Nav.Link href="#materials">Materiały</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
