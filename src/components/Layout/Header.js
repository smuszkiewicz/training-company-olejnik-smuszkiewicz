import { Container, Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { logoutUser, uid } from "../..";
import { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Header = (props) => {
    const [showLogout, setShowLogout] = useState(true);

    const handleCloseLogout = () => setShowLogout(false);
    const handleShowLogout = () => setShowLogout(true);
  
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        handleShowLogout();
      } else {
        handleCloseLogout();
      }
    });

  const logOutHandler = (event) => {
    event.preventDefault();

    logoutUser();
  };
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">Szkolenia</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="#users">Użytkownicy</Nav.Link>
          <Nav.Link href="#calender">Kalendarz</Nav.Link>
          <Nav.Link href="#materials">Materiały</Nav.Link>
        </Nav>
        <Nav className="justify-content-end">
          {showLogout && <Nav.Link onClick={logOutHandler}>Wyloguj</Nav.Link>}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
