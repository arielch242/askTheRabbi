import React, { Component } from "react";
import { Link } from "react-router-dom";
import cardService from "../services/cardService";
import http from "../services/httpService";
import userService from "../services/userService";
import PageHeader from "./common/pageHeader";
import { apiUrl } from "../config.json";
import SearchCard from "./searchCard";

// Questions and Answers Component

class QnA extends Component {
  state = {
    cards: [],
    favs: [],
    favsViewFlag: false,
  };

  async componentDidMount() {
    const { data } = await cardService.getAllCards();
    if (data.length > 0) {
      this.setState({ cards: data });
    }
    this.setUserFavs();
  }

  async componentDidUpdate() {
    // when bookmarking - updating user record favs field in DB
    const userId = userService.getCurrentUser();
    const { favs } = this.state;
    if (favs.length !== 0) {
      await http.put(`${apiUrl}/users/${userId}`, favs);
    }
  }

  setUserFavs() {
    // only for DB users - not local users
    let userFavs = async () => {
      const result = await userService.getCurrentUserDetails(this.state.user);
      let favs = result[1];
      if (favs > 0) {
        this.setState({ favs });
      }
      return result;
    };
    (async () => {
      const results = await userFavs();
      this.setState({ favs: results[1] });
    })();
  }

  // add/remove favs from state
  onHandleFavs = (cardId) => {
    let { favs } = this.state;
    if (favs.includes(cardId)) {
      favs.splice(favs.indexOf(cardId), 1);
    } else {
      favs.push(cardId);
    }
    this.setState({ favs });
  };

  // show favs list when clicking the button
  showFavs = () => {
    const { cards, favs: onlyFavsIds } = this.state;
    let favsFullDetails = [];
    for (let i = 0; i < onlyFavsIds.length; i++) {
      for (let y = 0; y < cards.length; y++) {
        if (onlyFavsIds[i] === cards[y]._id) {
          favsFullDetails.push(cards[y]);
        }
      }
    }
    this.setState({ cards: favsFullDetails, favsViewFlag: true });
  };

  hideFavs = async () => {
    const { data } = await cardService.getAllCards();
    if (data.length > 0) {
      this.setState({ cards: data });
    }
    this.setState({ favsViewFlag: false });
  };

  render() {
    const { cards, favs } = this.state;
    return (
      <div className="container text-right text-white">
        <PageHeader titleText="שאלות ותשובות" />
        <div className="row">
          <div className="col-12">
            <br />
            <button
              className="btn btn-warning m-3"
              disabled={this.state.favs.length === 0}
              onClick={!this.state.favsViewFlag ? this.showFavs : this.hideFavs}
            >
              מועדפים
            </button>
            <Link className="btn btn-warning" to="/create-card">
              שלח שאלה חדשה
            </Link>
          </div>
        </div>
        <SearchCard
          cards={cards}
          favs={favs}
          onHandleFavs={this.onHandleFavs}
        />
        <div className="row"></div>
      </div>
    );
  }
}

export default QnA;
