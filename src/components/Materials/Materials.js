import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Card, Container, Nav, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Materials = (props) => {
  const englishHandler = (event) => {
    event.preventDefault();
  };
  const weldingHandler = (event) => {
    event.preventDefault();
  };
  const soccerHandler = (event) => {
    event.preventDefault();
  };

  return (
    <Container>
      <Row>
        <Row xs={1} md={2} className="g-4">
          <Card style={{ width: "18rem" }} key="english">
            <Card.Img
              variant="top"
              src="https://cdn.pixabay.com/photo/2015/11/06/13/29/union-jack-1027893_1280.jpg"
            />
            <Card.Body
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Card.Title>Język angielski</Card.Title>
              <Row>Kurs języka angielskiego</Row>
              <Row>
                <LinkContainer to="/English">
                  <Button>Otwórz kurs</Button>
                </LinkContainer>
              </Row>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem" }} key="welding">
            <Card.Img
              variant="top"
              src="https://cdn.pixabay.com/photo/2015/03/14/18/09/welder-673559_1280.jpg"
            />
            <Card.Body
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Card.Title>Spawanie</Card.Title>
              <Row>Kurs profesjonalnego spawania pod wodą</Row>
              <Row>
                <LinkContainer to="/Welding">
                  <Button>Otwórz kurs</Button>
                </LinkContainer>
              </Row>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem" }} key="soccer">
            <Card.Img
              variant="top"
              src="https://cdn.pixabay.com/photo/2013/07/13/10/51/football-157930_1280.png"
            />
            <Card.Body
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Card.Title>Piłka nożna</Card.Title>
              <Row>Kurs piłki nożnej</Row>
              <Row>
                <LinkContainer to="/Soccer">
                  <Button>Otwórz kurs</Button>
                </LinkContainer>
              </Row>
            </Card.Body>
          </Card>
        </Row>
      </Row>
    </Container>
  );
};

export default Materials;
