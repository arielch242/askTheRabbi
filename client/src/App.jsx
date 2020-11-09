import React, { Component }from "react";
import "./App.css";
import NavBar from "./components/navbar.jsx";
import Footer from "./components/footer.jsx";
import About from "./components/about.jsx";
import Home from "./components/home.jsx";
import Signup from "./components/signup.jsx";
import Signin from "./components/signin.jsx";
import { Route , Switch } from 'react-router-dom';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import userService from "./services/userService";
import Logout from "./components/logout";
import CreateCard from "./components/createCard.jsx";
import QnA from "./components/qna";
import EditCard from "./components/editCard";
import DeleteCard from "./components/deleteCard";
import ProtectedRoute from "./components/common/protectedRoute";
import AnsCard from "./components/ansCard";
import AuthorSignin from "./components/authorSignin";
import AuthorRoute from "./components/common/authorRoute";


class App extends Component {
    state = {
      userName: ""
    };
    

    
    componentDidMount (){
      const user = userService.getCurrentUser();
      this.setState({user})
   //   this.setUserName();
    }
    
    setUserName(){
      if( this.state.user?.biz )  
           {
             this.setState({userName: 'Author'})
           }    // if biz=true it means that the user is an Author so it displays it on the navbar 
               //  but he doesnt get any privileges until he signs in 
      else {
      let userName = async () => { 
              const result = await userService.getCurrentUserName(this.state.user) 
              return result } 
      (async () => {
                const results = await userName()
                this.setState({userName: results})
              })();
       }
    }
  
    render() {
      const {user} = this.state; 
  return (
    <div className="d-flex flex-column min-vh-100 bg-img">
      <ToastContainer/>
      <header>
        <NavBar user={user} username={this.state.userName}/>
      </header>
      <main className="container-fluid flex-fill">
        <Switch>
          <AuthorRoute path="/cards/answer/:id" component={AnsCard}/> 
          <ProtectedRoute path="/cards/edit/:id" component={EditCard}/>
          <ProtectedRoute path="/cards/delete/:id" component={DeleteCard}/>
          <ProtectedRoute path="/create-card" component={CreateCard} />
          <ProtectedRoute path="/qna" component={QnA}/>
          <Route path="/author-signin" component={AuthorSignin}/>
          <Route path="/logout" component={Logout} />
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <Route path="/about" component={About} />
          <Route exact path="/" component={Home} />    
        </Switch>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
  }
}

export default App;
