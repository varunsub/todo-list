# todo-list

ENV vars

In project root directory run nano env.sh

export VUE_APP_APIURL=<your api url>
export CONNECTION_URL=<database url>
export SENDGRID_API_KEY=<sendgrid api key>
export FE_URL=<Vue dev server url>
export MY_EMAIL=<Verified email address on Sendgrid>


Local Deployment


To view the front end through in a Vue development server, navigate to the client directory
cd ./client

To start 
run npm run serve

To start the backend server, navigate to the todo directory
cd ./todo

or 

if you are in the client directory
cd ../todo

Then run
npm run start
