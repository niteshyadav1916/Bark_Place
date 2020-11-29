#BarkPlace

##Initial Setup

•Add Landing Page
•Add dogs Page that lists all dogs
Each dog has:

•Name
•Image
##Layout and Basic Styling

•Create our header and footer partials
•Add in Bootstrap
##Creating New dogs

•Setup new dog POST route
•Add in body-parser
•Setup route to show form
•Add basic unstyled form
##Style the dogs page

•Add a better header/title
•Make dogs display in a grid
##Style the Navbar and Form

•Add a navbar to all templates
•Style the new dog form
##Add Mongoose

•Install and configure Mongoose
•Setup dog model
•Use dog model inside of our routes
##Show Page

•Review the RESTful routes we've seen so far
•Add description to our dog model
•Show db.collection.drop()
•Add a show route/template
##Refactor Mongoose Code

•Create a models directory
•Use module.exports
•Require everything correctly!
##Add Seeds File

•Add a seeds.js file
•Run the seeds file every time the server starts
##Add the Comment model!

•Make our errors go away!
•Display comments on dog show page
##Comment New/Create

•Discuss nested routes
•Add the comment new and create routes
•Add the new comment form
##Style Show Page

•Add sidebar to show page
•Display comments nicely
##Finish Styling Show Page

•Add public directory
•Add custom stylesheet
##Auth Pt. 1 - Add User Model

•Install all packages needed for auth
•Define User model
##Auth Pt. 2 - Register

•Configure Passport
•Add register routes
•Add register template
##Auth Pt. 3 - Login

•Add login routes
•Add login template
##Auth Pt. 4 - Logout/Navbar

•Add logout route
•Prevent user from adding a comment if not signed in
•Add links to navbar
##Auth Pt. 5 - Show/Hide Links

•Show/hide auth links in navbar
##Refactor The Routes

•Use Express router to reoragnize all routes
##Users + Comments

•Associate users and comments
•Save author's name to a comment automatically
##Users + dogs

•Prevent an unauthenticated user from creating a dog
•Save username+id to newly created dog
•Editing dogs
•Add Method-Override
•Add Edit Route for dogs
•Add Link to Edit Page
•Add Update Route
#Deleting dogs

•Add Destroy Route
•Add Delete button
#Authorization Part 1: dogs

•User can only edit his/her dogs
•User can only delete his/her dogs
•Hide/Show edit and delete buttons
#Editing Comments

•Add Edit route for comments
•Add Edit button
•Add Update route
•dog Edit Route: Comment Edit Route:

#Deleting Comments

•Add Destroy route
•Add Delete button
•dog Destroy Route: /dogs/:id Comment Destroy Route: /dogs/:id/comments/:comment_id

#Authorization Part 2: Comments

•User can only edit his/her comments

•User can only delete his/her comments

•Hide/Show edit and delete buttons

•Refactor Middleware

BOOTSTRAP NAV COLLPASE JS

•Flash Messages

•Refactor container div to header

•Show/hide delete and update buttons

•style login/register forms

•Random Background Landing Page

•Refactor middleware

•change styling in show template - comment delete/update

•UPDATE/DELETE dog# BarkPlace

name url verb desc.

INDEX /dogs NEW /dogs/new CREATE /dogs SHOW /dogs/:id

NEW dogs/:id/comments/new GET CREATE dogs/:id/comments POST
