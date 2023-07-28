## QuadView Blog - A Blogging Platform

QuadViewBlog is a cutting-edge CMS-style blog site that provides a unique platform for tech enthusiasts, developers, and writers to share their insights, knowledge, and opinions about the ever-evolving world of technology. It is built using Node.js, Express.js, Sequelize ORM, and MySQL for the backend, and HTML, CSS, and JavaScript for the frontend. and it uses the MVC (Model-View-Controller) architectural pattern to ensure a clear separation of concerns and maintainability.

# file structure
```
|__ Assets                            
├── config                  
|   └──connection.js               
├──controllers
|  ├── blog-routes.js                                  
|  ├──comment-routes.js                        
|  ├──user-routes.js 
├── db                  
|   └──schema.sql                
|
├── models/                            
|  ├── blogs.js                                
|  ├──comment.js                       
|  ├──index.js                     
|  ├──users.js                 
|
├── node_modules
├── Public                  
|   ├──css
|   | └──style.css
|   └──js
|     └──index.js
├── seeds/                          
|  ├── seed-blogposts.js                                  
|  ├──seed.js                               
├── utils                  
|   └──helpers.js              
├── views                              
|  ├── layouts                                        
|  | └──main.hbs        
|  ├──blogpost.hbs                   
|  ├──dashboard.hbs          
|  ├──homepage.hbs          
|  ├──login.hbs                  
|  ├──logout.hbs                   
|
├── .env
├── .eslintignore
├── .eslintrc.js
├── .gitignore            // files and folders to be ignored by git
├── ..prettierignore
├── .prettierrc.json
├──LICENSE               // MIT license
├── package.json          // npm package file
├── package-lock.json     // npm package file
├── README.md             // the read me file   
└── server.js             // the main file where the server is run from      
```

# Features

User Authentication: Users can sign up and log in to the platform to create and manage their blog posts.

```Create and Edit Blog Posts:``` Authenticated users can create new blog posts and edit their existing posts.
```Delete Blog Posts:``` Authenticated users can delete their own blog posts.
```Dashboard:``` Users have a personalized dashboard where they can view and manage their blog posts.
```Commenting:``` Users can leave comments on blog posts, and authors can reply to comments.
```Responsive Design:``` The application is fully responsive and works well on different devices.

# Installation

```Clone the repository:``` git clone git@github.com:solowon27/QuadViewBlog.git
```Install dependencies:``` npm install
```npm run seed``` then
```Run the application:``` npm start

# Usage

```Visit the homepage:``` Open your web browser and go to http://localhost:3001.
```Sign Up:``` Click on the "Sign Up" link to create a new account.
```Log In:``` After signing up, log in using your credentials.
```Create a Blog Post:``` Click on "Your Dashboard" to view your dashboard and then click on "Create a New Blog Post" to write a new blog post.
```Edit and Delete Blog Posts:``` On your dashboard, you can click on the "Edit" button to modify your blog post or the "Delete" button to remove it.
```Comment on Blog Posts:``` You can leave comments on other users' blog posts and reply to comments on your posts.

# Technologies Used
```
Node.js
Express.js
Sequelize ORM
MySQL
HTML
CSS
JavaScript
```

# Contributing
If you would like to contribute to QuadView Blog, please follow these steps:

Fork the repository.
Create a new branch: git checkout -b feature/new-feature
Make your changes and commit them: git commit -m "Add new feature"
Push to the branch: git push origin feature/new-feature
Submit a pull request.

# Credits
github copilot and me 

License
This project is licensed under the MIT License.

# Contact
If you have any questions or need support, please email us at solowon27@hotmail.com.