import React, { Component }from "react";
import cardService from "../services/cardService";
import CardRender from "./cardsRender";

class SearchCard extends Component {
  // qQuery is a variable for query input
  state = { qQuery: "",
            cards:[]
          
};
  
  HandleSearch= async (e) => {
    e.preventDefault();
    const {data:cards}  = await cardService.getAllCards();
    var searchResults = cards.filter(
           (item) =>
             item.qTitle.includes(this.state.qQuery) || 
             item.qArticle.includes(this.state.qQuery)
         );
    this.setState({ cards : searchResults }); 
    }

  render() {
      return (
        <React.Fragment>
        <div className="col-12">
        <form className="form" onSubmit={ this.HandleSearch }>
          <div className="input-group md-form form-sm form-1 mt-2 col-6 float-right">
            <div className="input-group-prepend">
              <button
                className="button input-group-text cyan darken-4 bg-warning"
                id="basic-text1"
              >
                <i className="fas fa-search text-white" aria-hidden="true"></i>
              </button>
            </div>
            <input
              id="searchInput"
              className="form-control my-0 py-1 text-right"
              type="text"
              placeholder="חפש"
              aria-label="Search"
              value={this.state.qQuery}
              onChange={ ( { currentTarget: input } )=>
                           {this.setState( { qQuery: input.value} )
                          } }
            />
          </div>
        </form>
        </div>
        <br/>
        <div>
          <br/><br/><br/>
       {/*  Below : if state is defined - means that the search was used, there will display search results 
            Otherwise, takes cards from this.props = display all cards from DB */}
         { 
        (this.state.cards?.length && <CardRender cards={this.state.cards} favs={this.props.favs} onHandleFavs={this.props.onHandleFavs}/> )   
        || (this.props.cards?.length && <CardRender cards={this.props.cards} favs={this.props.favs} onHandleFavs={this.props.onHandleFavs}/> )                
        || "" }     {/* not to display zero" */}
      </div>
      </React.Fragment>
      )
    }
  }

export default SearchCard;
