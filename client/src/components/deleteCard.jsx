import {Component} from 'react';
import cardService from "../services/cardService";
import { getCurrentUser } from '../services/userService';

class DeleteCard extends Component {

    async componentDidMount(){
        const cardId = this.props.match.params.id;
        if (!this.validateUser(cardId)){ 
            this.props.history.replace("/qna");
          }
        if( window.confirm('This card will be deleted. Are you sure? ')) {
           await cardService.deleteCard(this.props.match.params.id); 
        }
           this.props.history.replace("/qna") 
    }

    validateUser = (cardUser) => {
        const user = getCurrentUser();
        return (cardUser === user._id)
      } 
      
    render() { 
        return null;
    }
}
 
export default DeleteCard;