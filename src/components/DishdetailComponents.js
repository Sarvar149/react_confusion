import React, { Component } from "react";
import { Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap";

class DishDetail extends Component {
  constructor(props) {
    super(props);

    this.state = { selectedDish: null };
  }

  renderDish(selectedDish) {
    if (selectedDish != null) {
      return (
        <div className="col-12 col-md-5 m-1">
          <Card>
            <CardImg
              width="100%"
              src={selectedDish.image}
              alt={selectedDish.name}
            ></CardImg>
            <CardBody>
              <CardTitle>{selectedDish.name}</CardTitle>
              <CardText>{selectedDish.description}</CardText>
            </CardBody>
          </Card>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  renderComments(selectedDish) {
    if (selectedDish == null) {
      return <div></div>;
    } else {
      const cmns = selectedDish.comments.map((comment) => {
        return (
          <li key={comment.id}>
            <p>{comment.comment}</p>
            <p>
              -- {comment.author}, &nbsp;{" "}
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "long",
                day: "2-digit",
              }).format(new Date(comment.date))}
            </p>
          </li>
        );
      });

      return (
        <div className="col-12 col-md-5 m-z">
          <h4>Comments</h4>
          <ul className="list-unstyled">{cmns}</ul>
        </div>
      );
    }
  }

  render() {
    if (this.props.selectedDish == null) {
      return <div></div>;
    }
    return (
      <div className="row">
        {this.renderDish(this.props.selectedDish)}
        {this.renderComments(this.props.selectedDish)}
      </div>
    );
  }
}

export default DishDetail;
