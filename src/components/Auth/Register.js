import "bootstrap/dist/css/bootstrap.min.css";
import { useRef, useState } from "react";
import {
  Button,
  Col,
  Container,
  FloatingLabel,
  Form,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { loginUser } from "../../index";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const Register = (props) => {
    const [validated, setValidated] = useState(false);

    const emailRRef = useRef();
    const passwordRRef = useRef();
    const fNameRef = useRef();
    const sNameRef = useRef();
    const pictureRef = useRef();

    async function addUserToDb(uid, fName, sName, picture, access) {
        const docRef = doc(db, "users", uid);
        await setDoc(doc(db, "users", uid), {
          fName: fName,
          sName: sName,
          picture: picture,
          access: access,
        });
      }
    
      const handleRegister = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        setValidated(true);
    
        const enteredFName = fNameRef.current.value;
        const enteredSName = sNameRef.current.value;
        const enteredEmail = emailRRef.current.value;
        const enteredPicture = pictureRef.current.value;
        const enteredPassword = passwordRRef.current.value;
    
        createUserWithEmailAndPassword(auth, enteredEmail, enteredPassword)
          .then((cred) => {
            addUserToDb(cred.user.uid, enteredFName, enteredSName, enteredPicture);
          })
          .catch((err) => {
            console.log(err.message);
          });
    
        handleCloseRegister();
      };
  return (
    <Container>
      <Modal.Header closeButton>
        <Modal.Title>Rejestracja</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleRegister}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Imię</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Jan"
                defaultValue={props.fName}
                ref={fNameRef}
              />
              <Form.Control.Feedback>Ok!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Nazwisko</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Kowalski"
                defaultValue={props.sName}
                ref={sNameRef}
              />
              <Form.Control.Feedback>Ok!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>E-mail</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="e-mail"
                  placeholder="name@example.com"
                  aria-describedby="inputGroupPrepend"
                  ref={emailRRef}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Wpisz e-mail.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom03">
              <Form.Label>Zdjęcie</Form.Label>
              <Form.Control
                type="text"
                placeholder="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                ref={pictureRef}
                required
              />
              <Form.Control.Feedback type="invalid">
                Podaj URL zdjęcia.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="3" controlId="validationCustom04">
              <Form.Label>Hasło</Form.Label>
              <Form.Control
                type="text"
                placeholder="zaq1@WSX"
                ref={passwordRRef}
                required
              />
              <Form.Control.Feedback type="invalid">
                Wpisz hasło.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Button type="submit">Dodaj użytkownika</Button>
        </Form>
      </Modal.Body>
    </Container>
  );
};

export default Register;
