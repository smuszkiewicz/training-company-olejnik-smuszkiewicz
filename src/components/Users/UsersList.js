import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useRef, useEffect } from "react";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import {
  Button,
  Container,
  Row,
  Card,
} from "react-bootstrap";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const UsersList = (props) => {
  const [users, setUsers] = useState([]);

  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    async function getUsers() {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, "users"));
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push({ ...doc.data(), id: doc.id });
      });
      setUsers(users);
    }

    getUsers();
  }, []);

  async function addUserToDb(uid, fName, sName, picture, access) {
    const docRef = doc(db, "users", uid);
    await setDoc(doc(db, "users", uid), {
      fName: fName,
      sName: sName,
      picture: picture,
      access: access,
    });
  }

  return (
    <Container>
        <Row xs={1} md={2} className="g-4">
          {users.map((user) => (
            <Card style={{ width: "18rem" }} key={user.id}>
              <Card.Img variant="top" src={user.picture} />
              <Card.Body
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Card.Title>
                  {user.fName} {user.sName}
                </Card.Title>
                <Row>
                  <Button variant="primary">
                    Edytuj
                  </Button>
                  <Button variant="danger">
                    Usuń
                  </Button>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </Row>
    </Container>
  );
};

export default UsersList;
