import React from "react";
import Form from "./common/form";
import PageHeader from "./common/pageHeader";
import Joi from "joi-browser";
import cardService from "../services/cardService";
import { toast } from "react-toastify";

class CreateCard extends Form {
  state = {
    data: {
      qName: "",
      qTopic: "",
      qTitle: "",
      qArticle: "",
    },
    errors: {},
  };

  schema = {
    qName: Joi.string().min(2).max(255).required().label("Name"),
    qTopic: Joi.string().min(2).max(255).required().label("Topic"),
    qTitle: Joi.string().min(2).max(255).required().label("Title"),
    qArticle: Joi.string().min(2).max(1024),
  };

  doSubmit = async () => {
    const { data } = { ...this.state };
    await cardService.createCard(data);
    toast("יצרת כרטיס שאלה חדש");
    this.props.history.replace("/qna");
  };

  render() {
    return (
      <div className="container min-vh-100 bg-img text-white text-right">
        <PageHeader titleText="צור כרטיס שאלה" />
        <div className="row">
          <div className="col-12">
            <h6>נא לכתוב את השאלה בעברית</h6>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 mx-auto text-right">
            <form
              onSubmit={this.handleSubmit}
              autoComplete="off"
              noValidate
              method="POST"
            >
              {this.renderInput("qName", "שם","name")}      
              {this.renderSelect("בחר נושא השאלה")}
              {this.renderInput("qTitle", "כותרת השאלה","text")}
              {this.renderTextarea()}
              {this.renderButton("שלח שאלה")}
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateCard;
