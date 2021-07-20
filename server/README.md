
# Apis for voteRookie 

 This project will only have the api services of voterookie app.

## Usage
 - npm install
 - npm start
    
 .env file stru

## Testing 
 - npm test  
 You can check ../test/integrationTest.js for all the service test.

 ### Some sample postman calls: 
 If you are running locally, please uncomment this line in server.js
 ``` const dotenv = require('dotenv').config(); ```

 For more details, please check https://voterookie.atlassian.net/l/c/m8w0WYAQ 

 #### 1) Get Project  
  Type: Get  
  URL: http://localhost:3000/api/v1/projects
  Headers:  ``` { "Authorization": `JWT ${yourKey}` } ```  

  #### 2) Create Project  
  Type: POST  
  URL: http://localhost:3000/api/v1/projects  
  Headers:  ``` { "Authorization": `JWT ${yourKey}` } ```  
  <details>
  <summary>Body:  </summary>
  <p>

  ```javascript 
  {
    "attribute1": "test"
 }
 ```
  </p> 
  </details>     
