# AI Chatbot API
[Postman Documentation](https://documenter.getpostman.com/view/22495929/2s9Y5YRh8F)  
[Deployed Link](https://chatbot-api-y4tz.onrender.com/)
- Index
  - [Tech Stack](#tech-stack)
  - [Steps to run locally](#steps-to-run-locally)
  - [Data flow](#data-flow)

### Tech stack
* Node.js
* ExpressJS
* Typescript
* JWT
* SQLite
* Sequelizer
  
### Steps to run locally
* Clone this repo
    ```
    git clone https://github.com/rahulsm20/ai-chatbot-api.git
    ```
* Enter cloned folder
    ```
    cd ai-chatbot-api
    ```
* Install packages
    ```
    npm install 
    ```
* Create a .env file at the root of the project to hold your JWT Secret as an environment variable named JWT_SECRET and the port on which you want the server to run
  * Example
    ```
    JWT_SECRET=VRXn04qgdzqfmvqRlmFQ1JA1f
    PORT=4000
    ```
* Run the project
  * Dev mode
    ```
    npm run dev
    ```
  * Production mode
    * Create a build
        ```
        npm run build
        ``` 
    * Run build
      ```
      npm start
      ``` 
* Run using docker 
  * Build the image
    * ```
      docker build -t <image-name> .
      ```
  * Run
    * ```
      docker run -p <port_forward>:<port_running> <image-name>
      ```

### Data flow
![data-flow](https://github.com/rahulsm20/ai-chatbot-api/assets/77540672/e9e9b183-7e47-4aa9-8883-fda92ac7bce4)

### Database Schema
![schema-diagram](https://github.com/rahulsm20/ai-chatbot-api/assets/77540672/1a31504c-6ffc-4344-bbc4-af8a4b6b00cc)