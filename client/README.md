General Instructions

This is Q&A site for Halacha questions
The main links are dispalyed on the Navabar. In order To view the Q&A (the main component) one should press the link on the Navbar
In order to CRUD question, one must register and then sign in
The login/registertion details are validated using Joi (form.jsx)
When logged in, one can post a new question. 
User is able to view all question cards but To CRUD only his cards ( using protectedRoute.jsx component)
The question fiels are valideted by also by Joi ( form,jsx generic component for client-side validations)
User can bookmark question cards which he choose by pressing the bookmark button. The list is refreshed to his favs and and press shows the full list again. 
User can search for cards containing his search term ( searchCard.jsx ). The searchCard renders the results.
all services are on services folder. different service for user/cards/authors( like users with small changes for authors)
There authors are able to answer the questions (special route only but only for answers - AuthorRoute.jsx)
They must log in via כניסה למשיב link on Navbar. The Autor login user is general with fixed userName and password (  which I validate on the API code ) { AutorName : admin1  ,  password : admin9 - stored in config/default.json } .
Author user is not stored in DB because it has nothing to store in DB.
The answer is shown in AnsCard which takes the values from the card except the answer which is TextArea for the author to write in.
Their answer is written to qAnswer field on the DB ( which is accessiable only for the Authors )
The difference from regular users is that for the authors the mongo biz is : true   while for regular users it is  -  biz: false ( I used the biz for bolean if the user logged is author or not)


APi Code
----------------
like React code - different route for authors ( like users with small changes)