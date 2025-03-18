import { Container, Row, Col } from "react-bootstrap";

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-md-center mb-3" >
        <Col xs={12} md={6} className="card p-5" style={{ marginTop:"12px", backgroundColor: "#060608", opacity: "0.9", borderRadius: "10px",    boxShadow: "0 0 10px #c7b198"

}}>
          {children} 

        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
