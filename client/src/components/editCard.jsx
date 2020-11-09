import React from "react";
import Form from "./common/form";
import PageHeader from "./common/pageHeader";
import Joi from "joi-browser";
import cardService from "../services/cardService";
import { toast } from "react-toastify";
import { getCurrentUser } from "../services/userService";

class EditCard extends Form {
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
    _id: Joi.string(),
    qName: Joi.string().min(2).max(255).required().label("Name"),
    qTopic: Joi.string().min(2).max(255).required().label("Title"),
    qTitle: Joi.string().min(2).max(255).required().label("Topic"),
    qArticle: Joi.string().min(2).max(1024),
  };

  mapToViewModel(card) {
    return {
      _id: card._id,
      qName: card.qName,
      qTopic: card.qTopic,
      qTitle: card.qTitle,
      qArticle: card.qArticle,
    };
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state,callback)=>{
        return;
    };
  }

  async componentDidMount() {
    const cardId = this.props.match.params.id;
    const { data } = await cardService.getCard(cardId);
    if (!this.validateUser(data.user_id)){ 
      this.props.history.replace("/qna");
    } 
    this.setState({ data: this.mapToViewModel(data) });
  }

  doSubmit = async () => {
    const { data } = { ...this.state };
    await cardService.setCard(data);
    toast("הכרטיס עודכן");
    this.props.history.replace("/qna");
  };

  handleCancel = () => {
    this.props.history.push("/qna");
  };
  
  validateUser = (cardUser) => {
    const user = getCurrentUser();
    return (cardUser === user._id)
  } 

  render() {
    return (
      <div className="container min-vh-100 bg-img text-white text-right">
        <PageHeader titleText="עדכון הכרטיס" />
        <div className="row">
          <div className="col-12">
            <p>פתח</p>
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
              <br/>
              {this.renderButton("עדכן")}
              <button
                className="btn btn-secondary ml-2"
                onClick={this.handleCancel}
              >
                בטל
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EditCard;
