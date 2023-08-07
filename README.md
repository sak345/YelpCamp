# YelpCamp
YelpCamp is an exciting web application currently in the development stage. It is designed to be a platform for users to review campgrounds and share their outdoor experiences with the community. Built using JavaScript as the primary language and a small amount of embedded JavaScript, the project utilizes various powerful tools, including Node.js, Express, MongoDB, and Mongoose.

The project follows the concept of RESTful routes, providing a structured and consistent way to handle different CRUD (Create, Read, Update, Delete) operations for campgrounds and reviews. RESTful routes are used to define endpoints for managing campgrounds, ensuring a clear and intuitive API design.

The application maintains a database using MongoDB, a NoSQL database known for its flexibility and scalability. Mongoose, a MongoDB object modeling library for Node.js, is employed to interact with the database and define data models for campgrounds, users, and reviews.

The platform includes a comprehensive campground listing, showcasing various campgrounds contributed by users. Each campground entry includes essential details such as the campground's name, location, description, and images, providing potential campers with valuable insights before planning their trips.

The application is designed with error handling in mind, providing informative and user-friendly error messages for scenarios like invalid inputs, failed API calls, or authentiction issues. These error handling mechanisms ensure that users have a smooth experience while navigating the platform.

Overall, YelpCamp is an ambitious project that aims to create a robust and engaging community-driven platform for camping enthusiasts. Though still in the development stage, the utilization of modern JavaScript technologies, the RESTful route architecture, and the inclusion of essential tools like Node.js, Express, MongoDB, and Mongoose set the foundation for a promising and feature-rich camping experience.

## TO RUN THE CODE:

1) Simply download the code in ZIP format and extract it.
   
2) Open the terminal and go to the directory where the code is extracted.
   
3) Type - ```npm install``` or ```npm i``` to install all the required packages. (you can look at all the package dependencies in package.json file).
4) After all the packages have been successfully installed, type - `cd seeds` to go inside the seeds folder and type `node index.js` to run the index.js file, which will seed the initial random data into the database. You'll see a message `Database Connected, Closing connection` which means the database has been successfully seeded.

5) After the database has been seeded with some initial data, type - ```node app.js``` or ```nodemon app.js``` (if you have nodemon installed globally) to start the server. You'll see this message in the console - ```Serving on port: 3000, Database connected``` which means that the local server has started.
   
6) Open your web browser and go to - 'http://localhost:3000/campgrounds' and the application will be up! :)

NOTE: One account has already been made for you, `username: admin, password: admin`, and all the initial campgrounds are posted by this account and hence can be edited only by admin.


## FUTURE ADD-ONS TO THE YelpCamp:
### 1) **User Authentication and Authorization**
I aim to integrate a robust user authentication and authorization system to ensure secure access and protect user data. This will involve user registration and login functionalities, allowing campers to create accounts and securely log in to access personalized features. Additionally, I will implement role-based authorization, granting different levels of access to users based on their roles (e.g., regular user, campground owner, administrator).
### 2) **Customer Review and Feedback System**
I will introduce a customer review and feedback system to enrich the YelpCamp community further. Authenticated users can leave reviews and star ratings for campgrounds they have visited, sharing their experiences with others. This will empower fellow campers to make well-informed decisions when choosing their next camping destination. Users will also have the option to interact with reviews through comments and replies, fostering engagement and camaraderie within the platform.
### 3) **Interactive and Fancy Cluster Map**  
To provide an engaging and visually captivating browsing experience, I plan to create an interactive, fancy cluster map. This map will display the locations of all campgrounds in an intuitive and visually appealing way. Campgrounds that are geographically close together will be clustered, and as users zoom in, the clusters will dynamically expand to reveal individual campground markers. Clicking on a marker will display essential details about the campground, enticing users to explore and discover new camping spots seamlessly.
### 4) **Enhanced Search and Filtering Options**  
I will introduce enhanced search and filtering options to empower users to find their ideal camping destinations. Users can filter campgrounds based on criteria such as location, amenities, ratings, and user reviews. The search functionality will be refined to deliver accurate and relevant results, making it easier for users to discover campgrounds that align with their preferences.

## Additional Notes:
### 1) Extracting Images from Unsplash API
As part of my efforts to enhance the visual appeal of YelpCamp, I have integrated the Unsplash API to provide captivating images for each campground. However, at the moment, the Unsplash API only generates one image per page, resulting in all campgrounds having the same image. I recognize that this limitation impacts the diversity and uniqueness of our campground representations. Rest assured. I'm actively working on improving this feature in future releases. I'm exploring ways to leverage advanced techniques that will allow us to extract multiple and relevant images for each campground, enriching the overall experience for our users.

### 2) Enhancing the Campground Review System
As you explore the current version of YelpCamp, the campground review system is relatively basic, employing MongoDB data relationships to manage user reviews. While this implementation allows users to add or delete reviews for each campground, I acknowledge room for improvement to enrich the review experience. In the spirit of continuous improvement, I have exciting plans to enhance the campground review system in future updates. Among the forthcoming features, I will introduce a star rating system instead of a range input and grant authorized members the privilege to edit their reviews. This capability will empower users to update their thoughts and experiences, ensuring that the reviews remain up-to-date and relevant.


#### For a comprehensive list and details of all the latest features, improvements, and bug fixes, please visit the [Releases](https://github.com/sak345/YelpCamp/releases) section.
