const User = require("../models/User");
const sgMail = require("@sendgrid/mail");
const { v4: uuidv4 } = require("uuid");
const hashPassword =require('./hash')

//env vars
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const FEURL = process.env.FE_URL;
const MY_EMAIL = process.env.MY_EMAIL;

module.exports = {
  //registration handler
  //would also verify email here
  async register(req, res) {
    try {
      //checks if user with email exists
      const userExists = await User.findOne({ email: req.body.email },function (err, user) {
          return user;
      });
      //If the email already exists
      if (userExists != null) {
        //if the email already on an account and verified
        if (userExists.verified) {
          console.log("please login");
          return (data = {
            code: 400,
            error: "Email already used",
          });
        }
        //if the email is on an account but not verified
        if (!userExists.verified) {
          console.log(
            "We sent you a confirmation email, please authenticate your account"
          );
          return (data = {
            code: 400,
            error: "Need to authenticate",
          });
        }
      }
      //if not email is found create the account
      else {
        return (data = await this.createUser(req));
      }
      return;
    } catch (e) {
      console.log(e);
    }
  },
  async createUser(req) {
    //creates user
    try {
     let hashed = await hashPassword(req.body.pass);
      const newUser =  new User({
          first_name: req.body.firstname,
          last_name: req.body.lastname,
          email: req.body.email,
          hash: hashed,
          verified: false,
          verifyuuid: uuidv4(),
        });
      await newUser.save()
      this.verifyEmail(newUser)
      return (data = { code: 200  });
    } catch (e) {
      console.log(e);
    }
  },
  async verifyEmail(user) {
    const msg = {
      to: user.email,
      from: MY_EMAIL,
      subject: "Welcome to todo",
      text: "To sign in and verify your email please click",
      html: ' To sign in and verify your email please click <a href="' + FEURL + "ver/" + user.verifyuuid + `"> here: <br> ${FEURL}ver/${user.verifyuuid} </a>` +'You will automatically be verified and taken to the login page.'
    };
    try {
      await sgMail.send(msg);
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.error(error.response.body);
      }
    }
    return Promise.resolve();
  },
};
