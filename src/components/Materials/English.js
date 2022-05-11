import "bootstrap/dist/css/bootstrap.min.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import {
  Accordion,
  Button,
  Container,
  Form,
  Image,
  Modal,
  Row,
} from "react-bootstrap";

const English = (props) => {
  const [materials, setMaterials] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const titleRef = useRef();
  const pictureRef = useRef();
  const textRef = useRef();

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleShowButton = () => setShowButton(true);
  const handleCloseButton = () => setShowButton(false);

  const db = getFirestore();
  const auth = getAuth();

  async function getUserAccess(user) {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      if (docSnap.data().access == 1) {
        handleShowButton();
      } else if (docSnap.data().access == 2) {
        handleShowButton();
      } else if (docSnap.data().access == 3) {
        handleCloseButton();
      }
    } else {
      console.log("No such document!");
    }
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      getUserAccess(user);
    } else {
      handleCloseButton();
    }
  });

  useEffect(() => {
    async function getMaterials() {
      const db = getFirestore();
      const querySnapshot = await getDocs(collection(db, "english"));
      const materials = [];
      querySnapshot.forEach((doc) => {
        materials.push({ ...doc.data(), id: doc.id });
      });

      setMaterials(materials);
    }

    getMaterials();
  }, []);

  async function addMaterialToDb(title, picture, text) {
    await addDoc(collection(db, "english"), {
      title: title,
      picture: picture,
      text: text,
    });
  }

  const handleAddMaterial = (event) => {
    event.preventDefault();

    const enteredTitle = titleRef.current.value;
    const enteredPicture = pictureRef.current.value;
    const enteredText = textRef.current.value;

    addMaterialToDb(enteredTitle, enteredPicture, enteredText);

    handleCloseModal();
  };

  return (
    <Container>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Dodaj materiał</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Tytuł</Form.Label>
            <Form.Control required placeholder="Tytuł" ref={titleRef} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Zdjęcie</Form.Label>
            <Form.Control required placeholder="Adres URL zdjęcia" ref={pictureRef} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tekst</Form.Label>
            <Form.Control required placeholder="Tekst" ref={textRef} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Zamknij
          </Button>
          <Button variant="primary" onClick={handleAddMaterial}>
            Zapisz
          </Button>
        </Modal.Footer>
      </Modal>
      <Row>
        {showButton && (
          <Button onClick={handleShowModal}>Dodaj materiał</Button>
        )}
      </Row>
      <Accordion>
        {materials.map((material) => (
          <Accordion.Item eventKey={material.id}>
            <Accordion.Header>{material.title}</Accordion.Header>
            <Accordion.Body>
              <Row>
                <Image src={material.picture} fluid />
              </Row>
              <Row>{material.text}</Row>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
};

export default English;
