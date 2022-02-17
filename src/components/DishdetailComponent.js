import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Row,
  Col,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";

class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };

    this.toggleModel = this.toggleModel.bind(this);
    this.submitHandle = this.submitHandle.bind(this);
  }

  toggleModel() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  submitHandle(values) {
    this.toggleModel();
    this.props.postComment(
      this.props.dishId,
      values.rating,
      values.author,
      values.comment
    );
  }

  render() {
    const required = (val) => val && val.length;
    const maxLength = (len) => (val) => !val || val.length <= len;
    const minLength = (len) => (val) => val && val.length > len;
    return (
      <>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModel}>
          <ModalHeader toggle={this.toggleModel}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(value) => this.submitHandle(value)}>
              <Row className="form-group">
                <Label htmlFor="rating" md={4}>
                  Rating
                </Label>

                <Col md={12}>
                  <Control.select
                    model=".rating"
                    id="rating"
                    name="rating"
                    className="form-control"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="author" md={4}>
                  Your Name
                </Label>

                <Col md={12}>
                  <Control.text
                    model=".author"
                    id="author"
                    name="author"
                    placeholder="Your Name"
                    className="form-control"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                    }}
                  />

                  <Errors
                    className="text-danger"
                    model=".author"
                    show="touched"
                    messages={{
                      required: "Author is required. ",
                      minLength: "Must be greater than 2 characters. ",
                      maxLength: "Must be 15 characters or less.",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="comment" md={4}>
                  Comment
                </Label>

                <Col md={12}>
                  <Control.textarea
                    model=".comment"
                    id="comment"
                    name="comment"
                    rows="6"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={12}>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
        <Button outline onClick={this.toggleModel}>
          <span className="fa fa-thin fa-pencil"></span> Submit Comment
        </Button>
      </>
    );
  }
}

function RenderDish({ dish }) {
  if (dish != null) {
    return (
      <Card>
        <CardImg
          width="100%"
          src={baseUrl + dish.image}
          alt={dish.name}
        ></CardImg>
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    );
  } else {
    return <div></div>;
  }
}

function RenderComments({ comments, postComment, dishId }) {
  if (comments == null) {
    return <div></div>;
  } else {
    const cmns = comments.map((comment) => {
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
      <>
        <h4>Comments</h4>
        <ul className="list-unstyled">{cmns}</ul>
        <Comment dishId={dishId} postComment={postComment} />
      </>
    );
  }
}

const DishDetail = (props) => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments
              comments={props.comments}
              postComment={props.postComment}
              dishId={props.dish.id}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default DishDetail;
