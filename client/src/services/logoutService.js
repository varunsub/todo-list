import axios from "axios";

const url = `${process.env.VUE_APP_APIURL}logout`;
class logoutService {
  static async logout(bToken, user) {
    try {
      const res = await axios.post(url, {
        authorization: bToken,
        user: user
      });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // console.log(res.data.data.errorCode)
      return res.data.data.errorCode;
    } catch (err) {
      console.log(err);
    }
  }
}
export default logoutService;
