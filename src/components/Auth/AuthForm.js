import "bootstrap/dist/css/bootstrap.min.css";
import { useRef, useState } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import { loginUser, uid } from "../../index";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const AuthForm = (props) => {
  const [show, setShow] = useState(true);
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      handleClose();
    } else {
      handleShow();
    }
  });

  const logInHandler = (event) => {
    event.preventDefault();

    loginUser(emailRef.current.value, passwordRef.current.value)

  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header>
        <Modal.Title>Logowanie</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FloatingLabel
          controlId="floatingInput"
          label="Adres e-mail"
          className="mb-3"
        >
          <Form.Control
            type="email"
            placeholder="name@example.com"
            required
            ref={emailRef}
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Hasło">
          <Form.Control
            type="password"
            placeholder="Hasło"
            required
            ref={passwordRef}
          />
        </FloatingLabel>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={logInHandler}>
          Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AuthForm;
