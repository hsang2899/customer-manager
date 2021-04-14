import { React } from "react";
import { Link } from "react-router-dom";
import maleAvatar from "../../images/male-avatar.png";
import femaleAvatar from "../../images/female-avatar.png";
import { Card, Col, Row, Button } from "react-bootstrap";
import { PencilSquare } from "react-bootstrap-icons";
import classes from "./customersCardView.module.css";

export const CustomersCardView = (props) => {
  const customerCards = props.customersList.map(function (c, i) {
    const avatar = c.gender === "male" ? maleAvatar : femaleAvatar;
    return (
      <Col xs={6} key={c.id}>
        <Card className={classes.root}>
          <div className={classes.details}>
            <Card.Header className={classes.cardHeader}>
              <Button>
                <PencilSquare />
              </Button>
            </Card.Header>
            <Card.Body className={classes.cardContent}>
              <Card.Img className={classes.cardImg} src={avatar} />
              <div className={classes.cardDescription}>
                <h5>{c.city},</h5>
                <h5>{c.state?.name}</h5>
                <Link to="/">View orders</Link>
              </div>
            </Card.Body>
          </div>
        </Card>
      </Col>
    );
  });
  return (
    <div className={classes.root}>
      <Row container="true" spacing={3}>
        {customerCards}
      </Row>
    </div>
  );
};
