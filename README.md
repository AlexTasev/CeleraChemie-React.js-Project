# CeleraChemie-React.js-Project
Celera Chemie Ltd. company web site. Build as web project for the ReactJS fundamentals course at SoftUni.

Celera Chemie is an international company, dealing with laboratory supplies in the South-east Europe region. The company operates sales and logistic offices in Bucuresti, Nicosia and Sofia and multy- language service in English, Bulgarian, Greek and Romanian is required.

The Celera Chemie's web application has three levels of access to it's content: administrator, registered user and guest user roles are implemented.

The Administrator has full access to the system and permissions to administer all major information objects. The Administrator is authorised to create / edit / delete product information related with the suppliers. This includes but is not limited to the following: supliers description, product catalogue and/or price information. The Administrator is authorised to review registered customers contact information and if appropriate- to remove (unauthorise) a registered user when a doubt of scam and/ or unpropriate use of the web application is presented. The following sections are available only to the Administrator: "Products" -> "Edit Product" / "Delete Product"; create "New Product"; view "All Users" -> "Delete User".

After registration and subsequent successful Login to the system, a registered user is authorised to access products related information. This includes detailed product information, a product ctalogue and/ or price list available to download and used by the customer. The registered user could edit his account information at any time. If the customer desides that Celera-Chemie services are no longer required, the user profile could be permanently deleted on demand. The registered user is permited to view the following sections:
"Products" -> "Download Catalogue" -> "Visit Official Website"; "User Profile" -> "Edit Profile" / "Delete Profile".

The guest user has acces to general information about the company. The following pages are public and visible to any visitor on Celera Chemie Ltd. company web site : "Contacts", "About us", "Certificates", "Register", "Login".

The application is built entirely on latest JavaScript technologies: React.js (client side) and node.js (server side). All rights of their respective owners are reserved.

## Resolve Dependencies
When the project is cloned or downloaded, type in the terminal the following in both Server and CLient directory:
```javascript
npm install
```
## Run the web server
The app uses nodemon. To run the web server type in terminal from Server-Celera-Chemie the following:
```javascript
nodemon index
```
## Run the React app
The app uses React on client side. To run the React app type in terminal from celera-chemie-web-project the following:
```javascript
npm start
```
By default, the app runs on 
```
localhost:3000
```
