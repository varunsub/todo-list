<template>
  <div class="hello">
    <div class="container">
      <v-card class="pa-6 py-10" outlined>
        <h1 class="text-center blue--text my-2">ToDo</h1>
        <h2 class="text-center">
          Thank you for joining us, you should recieve a confirmation email with
          a link to activate your account soon.
        </h2>
        <br />
        <h4 class="text-center">
          Once you activate your account, click
          <a href="/login">here to login</a>
        </h4>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "Verify",
  props: {
    uuid: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  width: 50%;
  margin: auto;
}
form {
  border: 3px solid #f1f1f1;
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
  background-color: #4caf50;
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

/* The "Forgot password" text */
span.psw {
  float: right;
  padding-bottom: 10px;
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
</style>
