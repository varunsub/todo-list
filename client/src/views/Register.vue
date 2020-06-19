<template>
  <v-container fluid class="mt-0 pa-0 pt-0 mycont" width="100vw">
    <v-app-bar flat color="white">
      <v-row>
        <span class="display-1 font-weight-bold blue--text pl-4">
          ToDo
        </span>
        <v-spacer />
        <v-btn
          text
          href="/login"
          color="white"
          class="mr-8 link-btn"
          style=" max-width:150px;"
          :disabled="loading"
          >Login</v-btn
        >
      </v-row>
    </v-app-bar>
    <v-row align="center" style="height:90%;">
      <v-card fluid shaped class="hello mt-4" width="30%">
        <v-form
          @submit="handleSubmit"
          class="loginForm text-center"
          v-model="valid"
        >
          <v-row style="height:100%;">
            <v-col col="1" class="container  pa-0">
              <v-row justify="center" class="mt-4">
                <span style="color:#2196F3; font-weight:bold; font-size:2em"
                  >ToDo</span
                >
              </v-row>
              <v-card-title class=""
                ><v-spacer />Register<v-spacer
              /></v-card-title>
              <v-text-field
                class="mx-10 mt-6"
                type="firstname"
                placeholder="First Name"
                label="First Name"
                for="firstname"
                v-model="firstname"
                outlined
                required
                autofocus
                hide-details
              ></v-text-field>
              <v-text-field
                class="mx-10 mt-6"
                type="lastname"
                placeholder="Last name"
                label="Last name"
                name="lastname"
                for="lastname"
                id="lastname"
                v-model="lastname"
                outlined
                required
                hide-details
              />
              <v-text-field
                class="mx-10 mt-6"
                type="email"
                placeholder="Email Adress"
                label="Email Adress"
                name="email"
                for="email"
                id="email"
                v-model="email"
                outlined
                required
                hide-details
              />
              <v-text-field
                class="mx-10 my-6 "
                outlined
                type="password"
                placeholder="Password"
                label="Password"
                for="pss"
                name="pss"
                id="password"
                v-model="pss"
                required
                hide-details
              />
              <v-text-field
                class="mx-10 my-6 "
                outlined
                type="password"
                placeholder=" Confirm password"
                label=" Confirm password"
                for="cpassword"
                name="cpassword"
                id="cpassword"
                v-model="cpss"
                required
                hide-details
              />
              <p v-if="registerError == 2">Passwords did not match</p>
              <p v-if="registerError == 3">
                Your password must be atleast 6 characters
              </p>
              <p v-if="registerError == 4">Email must be valid</p>
              <p v-if="registerError == 5">
                Must input name first and last name
              </p>
              <p v-if="registerError == 6">
                Already registered, did you mean to <a href="/login">log in?</a>
              </p>
              <p v-if="registerError == 7">
                Please check your email for your verification link
              </p>

              <v-row justify="center" class="mx-10 pb-6">
                <v-btn
                  type="submit"
                  :loading="loading"
                  @click.native="handleSubmit"
                  >Register</v-btn
                >
              </v-row>
            </v-col>
          </v-row>
        </v-form>
      </v-card>
      <!-- <v-col class="tag float-right" lg="16" align="center" justify="start"> test</v-col> -->
      <v-col class="tag" align="center">
        <span class="display-1">
          Start <span class="blue--text">doing</span> differently
        </span>
        <div style="height:5%" />
        <span class="title" style="max-width:350px;">
          Life is hectic, we are here to help.
          <div style="height:1%" />
          Stay on top of life by organizing what is important to
          <span class="blue--text">you.</span>
        </span>
        <div class="imageGroup">
          <img
            src="../../public/combined.png"
            class="fishes"
            style="width: 40vw; height: auto; position:relative; display:block; right:-5%; bottom:-10%"
          />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import registerService from "../services/registerService";
export default {
  name: "Register",
  data: () => ({
    firstname: "",
    lastname: "",
    email: "",
    pss: "",
    cpss: "",
    valid: false,
    registerError: -1,
    loading: false
  }),
  methods: {
    handleSubmit: async function(e) {
      this.loading = true;
      e.preventDefault();
      if (this.pss != this.cpss) {
        this.registerError = 2;
        this.loading = false;
        return;
      }
      if (this.pss.length < 6) {
        this.registerError = 3;
        this.loading = false;

        return;
      }
      var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!this.email.match(emailPattern)) {
        this.registerError = 4;
        this.loading = false;
        return;
      }
      if (this.firstname.length < 1 || this.lastname.length < 1) {
        console.log(5);
        this.registerError = 5;
        this.loading = false;
        return;
      }
      let data = {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        pass: this.pss
      };
      var status = await registerService.getter(data);
      if (status.code == 200) {
        this.$router.replace({ name: "awaitVerification" });
      } else if (status.error == "Email already used") {
        this.registerError = 6;
        this.loading = false;
        return;
      } else if (status.error == "Need to authenticate") {
        this.registerError = 7;
        this.loading = false;
        return;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  width: 40%;
  margin-left: 10%;
  min-width: 300px;
}
form {
  border: 3px solid #f1f1f1;
}

/* Set a style for all buttons */
button {
  background-color: #2196f3 !important;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

/* Add a hover effect for buttons */
button:hover {
  opacity: 0.8;
}

/* Add padding to containers */
.container {
  padding: 16px;
}
.loginForm {
  border: 4px;
}
/* The "Forgot password" text */
span.psw {
  float: right;
  padding-bottom: 10px;
}
.tag {
  height: 80%;
  width: 100%;
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
  span.psw {
    display: block;
    float: none;
  }
  .cancelbtn {
    width: 100%;
  }
}
.mycont {
  height: 100%;
  background-color: #f5f5f5;
}
.space {
  height: 15%;
}
.imageGroup {
  right: 0px;
  bottom: 0px;
  width: auto;
  height: 80%;
}
.link-btn {
  background-color: #2196f3 !important;
}
@media only screen and (max-width: 1000px) {
  .imageGroup {
    display: none;
  }
  .tag {
    display: none;
  }
  .hello {
    min-width: 300px;
    margin: auto;
  }
}
@media only screen and (max-height: 500px) {
  .imageGroup {
    display: none;
  }
  .hello {
    min-width: 250px;
    margin: auto;
  }
  .tag {
    display: none;
  }
}
</style>

<style scoped>
/*
        <label>
          <input type="checkbox" checked="checked" name="remember" /> Remember me
        </label>
        */
</style>
