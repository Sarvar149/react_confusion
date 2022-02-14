import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Label,
  Row,
  Col,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";

export class Comment extends Component {
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

export default Comment;
