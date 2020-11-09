import React, { Component }from "react";
import { Link } from "react-router-dom";
import userService from "../services/userService";



class Card extends Component {
  state = {  }

  buttonClass = (cardId) =>{
    const { favs } = this.props;
    let classes = "btn btn-sm ";
      classes += favs.includes(cardId) ? "btn-secondary" : "btn-primary";
      return classes;
  }
  
  currentUser = userService.getCurrentUser();
  
  render() {
    const { card, onHandleFavs} = this.props; 
    const editPrivilege = (this.currentUser._id === card.user_id && !this.currentUser.biz);      // only the same user can edit,
    const answerPrivilege = this.currentUser.biz;
    return ( 
      <div className="col-12 mt-3 text-right text-dark">
      <div className="card">
        <div className="card-body">
          <h2>שאלה</h2>
          <h5 className="card-title pb-2">{card.qTitle}  </h5>
          <p className="card-text">נושא:  {card.qTopic}  </p>
          <p className="card-text">מאת:  {card.qName}  </p>
          <p className="card-text pt-2 border-bottom pb-4">תוכן השאלה:  {card.qArticle}  </p>
           {/* Below: check if there is an answer - if yes, displays */}
          { typeof card.qAnswer !== ("undefined" && "" )  
            &&  (
               <React.Fragment>
               <h2>תשובה</h2>
               <p className="card-text py-2 ">תוכן התשובה:  {card.qAnswer}  </p>
               </React.Fragment>
               ) } 
          {this.props.children}
          {!answerPrivilege && (
            
          <span className="float-right">
              <button
                onClick={onHandleFavs}
               className={this.buttonClass(card._id)}
              >
                Bookmark
              </button>
            </span>
          )}
        </div>
      </div>
      {answerPrivilege && 
      <Link className="btn btn-success m-1" to={`/cards/answer/${card._id}`}>Answer</Link>
       }
      {editPrivilege && (
          <React.Fragment>
             <Link className="btn btn-success m-1" to={`/cards/edit/${card._id}`}>Edit</Link>
             <Link className="btn btn-success m-1" to={`/cards/delete/${card._id}`}>Delete</Link>
          </React.Fragment>
      )}
    </div>


     );
  }
}
 
export default Card;

