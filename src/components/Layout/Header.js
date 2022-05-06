import { Container, Nav, Navbar } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { logoutUser, uid } from "../..";
import { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore"

const Header = (props) => {
    const [showLogout, setShowLogout] = useState(true);
    const [showUsers, setShowUsers] = useState(false);
    const [showCalender, setShowCalender] = useState(false);
    
    const handleCloseLogout = () => setShowLogout(false);
    const handleShowLogout = () => setShowLogout(true);
    const handleCloseUsers = () => setShowUsers(false);
    const handleShowUsers = () => setShowUsers(true);
    const handleCloseCalender = () => setShowCalender(false);
    const handleShowCalender = () => setShowCalender(true);

    const db = getFirestore();
    async function getUserAccess(user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
      
        if (docSnap.exists()) {
            if ( docSnap.data().access == 1 ) {
                handleShowUsers();
                handleShowCalender();
            } else if ( docSnap.data().access == 2 ) {
                handleCloseUsers();
                handleShowCalender();
            } else if ( docSnap.data().access == 3 ) {
                handleCloseUsers();
                handleCloseCalender();
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
        handleCloseCalender();
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
          { showUsers && <Nav.Link href="#users">Użytkownicy</Nav.Link>}
          { showCalender && <Nav.Link href="#calender">Kalendarz</Nav.Link>}
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
