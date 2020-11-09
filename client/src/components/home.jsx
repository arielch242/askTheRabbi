import React, { Component }from "react";
import PageHeader from './common/pageHeader';

class Home extends Component {
  state = {
  };

  render() {
    return (
      <React.Fragment>
        <div className="container bg-img min-vh-100 text-white text-right my-5">
          <PageHeader titleText="ראשי"/>
          <h1 className="display-4">ברוכים הבאים לאתר המקוון שאלות ותשובות של בית ההוראה לשכת הגזית</h1>
          <br/>
          <h5>!   כאן תוכלו לקבל תשובות ממיטב המומחים בארץ בכל השאלות שלכם בהלכה</h5>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
