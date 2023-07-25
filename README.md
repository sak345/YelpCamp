# YelpCamp
Yelp Camp is an exciting web application currently in the development stage. It is designed to be a platform for users to review campgrounds and share their outdoor experiences with the community. Built using JavaScript as the primary language and a small amount of embedded JavaScript, the project utilizes various powerful tools, including Node.js, Express, MongoDB, and Mongoose.

The project follows the concept of RESTful routes, providing a structured and consistent way to handle different CRUD (Create, Read, Update, Delete) operations for campgrounds and reviews. RESTful routes are used to define endpoints for managing campgrounds and reviews, ensuring a clear and intuitive API design.

One of the project's core features is the user registration and authentication system. New users can create accounts using their email and password, allowing them to access exclusive functionalities such as leaving reviews and interacting with the campground listings. This authentication mechanism helps maintain the security and integrity of the platform.

The application maintains a database using MongoDB, a NoSQL database known for its flexibility and scalability. Mongoose, a MongoDB object modeling library for Node.js, is employed to interact with the database and define data models for campgrounds, users, and reviews.

The platform includes a comprehensive campground listing, showcasing various campgrounds contributed by users. Each campground entry includes essential details such as the campground's name, location, description, and images, providing potential campers with valuable insights before planning their trips.

In addition to viewing campground details, users can read and leave reviews for the campgrounds they have visited. Reviews and ratings play a vital role in helping others understand the quality and overall experience of each campground. Users can also interact with each other by liking, commenting on, or replying to reviews, fostering a strong and interactive camping community.

The application is designed with error handling in mind, providing informative and user-friendly error messages for scenarios like invalid inputs, failed API calls, or authorization issues. These error handling mechanisms ensure that users have a smooth experience while navigating the platform.

Furthermore, Yelp Camp implements search and filtering functionalities, enabling users to find specific campgrounds based on criteria like location, amenities, and user ratings. This feature allows campers to discover the most suitable campgrounds tailored to their preferences.

Overall, Yelp Camp is an ambitious project that aims to create a robust and engaging community-driven platform for camping enthusiasts. Though still in the development stage, the utilization of modern JavaScript technologies, the RESTful route architecture, and the inclusion of essential tools like Node.js, Express, MongoDB, and Mongoose set the foundation for a promising and feature-rich camping experience.

TO RUN THE CODE: 
1) Simply download the code in ZIP format and extract it.
2) Open the terminal and go to the directory where the code is extracted.
3) Type - ```npm install``` or ```npm i``` to install all the required packages. (you can look at all the packages used in package.json file)
4) After all the packages have been successfully been installed, type - ```node app.js``` or ```nodemon app.js```(if you have nodemon install globally)
5) You'll see a message - ```Serving on port: 3000, Database connected``` which means that the local server has started.
6) Open your web browser and go to - 'http://localhost:3000/campgrounds' and the site will be up! :)
