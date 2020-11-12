import React, { Component } from "react";
import { getCurrentAuthor } from "../services/authorService";
import cardService from "../services/cardService";
import PageHeader from "./common/pageHeader";


// Questions and Answers Component

class AnsCard extends Component {
  state = {
    data: {
      qName: "",
      qTopic: "",
      qTitle: "",
      qArticle: "",
    },
  };

  mapToViewModel(card) {
    return {
      _id: card._id,
      qName: card.qName,
      qTopic: card.qTopic,
      qTitle: card.qTitle,
      qArticle: card.qArticle,
      qAnswer: card.qAnswer,
    
    };
  }

  async componentDidMount() {
    const cardId = this.props.match.params.id;
    const { data } = await cardService.getCard(cardId);
    if (!this.validateAuthor()){ 
      this.props.history.replace("/qna");
    }
    this.setState({ data: this.mapToViewModel(data) });
  }

  handleChange = ({ currentTarget: input }) => {
    const data = {...this.state.data};
    data[input.name]=input.value;
    this.setState({data});
  };

  handleSubmit = async (e) => {
    const { data } = { ...this.state };
    await cardService.AnswerCard(data);
    window.location.assign("/qna");
}


validateAuthor = () => {
  return (Boolean(  getCurrentAuthor() ))
}

  render() {
    const { data } = this.state;
    return (
      <div className="container text-right text-white">
        <PageHeader titleText="דף תשובה" />
        <div className="row">
          <div className="col-12 mt-3 text-right text-dark">
            <div className="card">
              <div className="card-body">
              <h2>שאלה</h2>
                <h5 className="card-title pb-2">{data.qTitle} </h5>
                <p className="card-text">נושא:  {data.qTopic}  </p>
                <p className="card-text">מאת:  {data.qName}  </p>
                <p className="card-text pt-2 border-bottom pb-4">תוכן השאלה:  {data.qArticle}  </p> 
              </div>
            </div>
            <div className="">
            <form
              onSubmit={this.handleSubmit}
              autoComplete="off"
              noValidate
              method="PUT"
            >
            <textarea className="form-group my-4 textinput text-right"
                      name="qAnswer"
                      id="qAnswer"
                      rows="5"
                      placeholder="...כתוב תשובה"
                      onChange={this.handleChange}
                      value={data.qAnswer}
             ></textarea>
             <button className="btn btn-primary pl-4">שלח</button>
            </form>
           </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AnsCard;
