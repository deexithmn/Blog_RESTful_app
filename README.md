# Blog_RESTful_app
A blog web app using NodeJS, express, mongoDB and Semantic UI

Blog takes in heading, image url and the body.

* NoSQL is used to store fetch and interact with the database. We are using mongoDB as the DB. 
* Styling is done using CSS and the semantic UI library
* npm pakages like express, ejs, body-parser, mongoose, method-override and sanitizer are used.
* method-override is used as PUT and DELETE can't be written on HTML we use method-override to override the POST method written on HTML-form
* express-sanitizer is used to sanitize the user entered data which might contain script tag i.e to remove the unwanted or any script tags written on to the blog post.
