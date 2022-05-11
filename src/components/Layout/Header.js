import { Container, Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { logoutUser, uid } from "../..";
import { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { LinkContainer } from "react-router-bootstrap";

const Header = (props) => {
  const [showLogout, setShowLogout] = useState(true);
  const [showUsers, setShowUsers] = useState(false);
  const [showCalender, setShowCalendar] = useState(false);

  const handleCloseLogout = () => setShowLogout(false);
  const handleShowLogout = () => setShowLogout(true);
  const handleCloseUsers = () => setShowUsers(false);
  const handleShowUsers = () => setShowUsers(true);
  const handleCloseCalendar = () => setShowCalendar(false);
  const handleShowCalendar = () => setShowCalendar(true);

  const db = getFirestore();
  async function getUserAccess(user) {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      if (docSnap.data().access == 1) {
        handleShowUsers();
        handleShowCalendar();
      } else if (docSnap.data().access == 2) {
        handleCloseUsers();
        handleShowCalendar();
      } else if (docSnap.data().access == 3) {
        handleCloseUsers();
        handleCloseCalendar();
      }
      //     userAccess = docSnap.data().access;
      //   console.log("User access:", userAccess);
    } else {
      console.log("No such document!");
    }
  }

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      handleShowLogout();
      getUserAccess(user);
    } else {
      handleCloseLogout();
      handleCloseUsers();
      handleCloseCalendar();
    }
  });

  const logOutHandler = (event) => {
    event.preventDefault();

    logoutUser();
  };
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Szkolenia</Navbar.Brand>
        </LinkContainer>
        <Nav className="me-auto">
          {showUsers && (
            <LinkContainer to="/UsersList">
              <Nav.Link>Użytkownicy</Nav.Link>
            </LinkContainer>
          )}
          {showCalender && (
            <LinkContainer to="/Scheduler">
              <Nav.Link>Kalendarz</Nav.Link>
            </LinkContainer>
          )}
          <LinkContainer to="/Materials">
            <Nav.Link>Materiały</Nav.Link>
          </LinkContainer>
        </Nav>
        <Nav className="justify-content-end">
          {showLogout && <Nav.Link onClick={logOutHandler}>Wyloguj</Nav.Link>}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
