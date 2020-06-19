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
          href="/register"
          color="white"
          class="mr-8 link-btn"
          style=" max-width:150px;"
          >Join today</v-btn
        >
      </v-row>
    </v-app-bar>
    <v-row fluid align="center" style="height:90%;">
      <v-card shaped class="hello" width="30%">
        <v-form @submit.prevent="handleSubmit" class="loginForm text-center">
          <v-row style="height:100%;">
            <v-col col="1" class="container  pa-0">
              <v-row justify="center" class="mt-4">
                <span style="color:#2196F3; font-weight:bold; font-size:2em"
                  >ToDo</span
                >
              </v-row>

              <v-card-title class=""
                ><v-spacer />Login<v-spacer
              /></v-card-title>
              <v-text-field
                class="mx-10 mt-6"
                type="email"
                placeholder="Email Adress"
                name="email"
                for="email"
                id="email"
                v-model="email"
                outlined
                required
                autofocus
                hide-details
              />
              <v-text-field
                class="mx-10 my-6 "
                outlined
                type="password"
                placeholder="Password"
                for="password"
                name="password"
                id="password"
                v-model="pss"
                required
                hide-details
              />
              <p class="mx-4" v-if="loginErrors == 2">Incorrect Password</p>
              <p class="mx-4" v-if="this.loginErrors == 3">
                There is no account associated with this email, did you mean to
                <a href="./register">register?</a>
              </p>
              <p class="mx-4" v-if="loginErrors == 4">
                We ran into an error, it's our fault. If the problem persists
                please contact us
              </p>
              <p class="mx-4" v-if="loginErrors == 5">
                Please check your email and click the verification link to sign
                in
              </p>
              <v-row justify="center" class="mx-10 pb-6">
                <v-btn
                  class=""
                  type="submit"
                  @click.stop.prevent="handleSubmit"
                  :loading="loading"
                  >Login</v-btn
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
import loginService from "../services/loginService";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      pss: "",
      loginErrors: -1,
      loading: false
    };
  },
  methods: {
    async handleSubmit(e) {
      this.loading = true;
      e.preventDefault();
      let data = {
        email: this.email,
        pass: this.pss
      };
      const res = await loginService.getter(data);
      if (res.serverCode == true) {
        localStorage.setItem("user", JSON.stringify(res.user));
        localStorage.setItem("token", res.token);
        this.$router.push({ name: "listApp" });
      } else {
        this.loginErrors = res;
        this.loading = false;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

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
.link-btn {
  background-color: #2196f3 !important;
}
/* Full-width inputs */

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
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
  height: 18%;
}
.imageGroup {
  right: 0px;
  bottom: 0px;
  width: auto;
  height: 90%;
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
