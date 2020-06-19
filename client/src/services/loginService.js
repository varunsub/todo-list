import axios from "axios";

const url = `${process.env.VUE_APP_APIURL}login`;
class loginService {
  static async getter(data) {
    try {
      const res = await axios.post(url, data);
      return res.data.data;
    } catch (err) {
      console.log(err);
    }
  }
}
export default loginService;
