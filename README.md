# Mynotes-backend 

This is the backend of the project Mynotes

Techs/libraries/skills used-> MongoDB,expressjs,Nodejs,bcrypt,jwt

Has two models-> users:storing user data,notes:storing user notes
routes-> authentication: login,signup,changepassword,get logged in user data, notes: CRUD operation of notes

Signup->
checks for data validation,consitency
check for email already registered
hashing + adding salt to user password
error response for invalid data

Login-> 
checks for data validation
check if data is present corresponding to the email
authenticating password
sending authentication token

get user notes->
check if authentication is present/valid
fetching notes corresponding to the user id
responding with data

change password->
current and old password matching
old password authentication
saving new password to database

CRUD operations-> 
authentication using authentication token
performing curd operations
