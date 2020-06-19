import axios from "axios";

const url = `${process.env.VUE_APP_APIURL}ver`;

class verifyService {
  static async getter(uuid) {
    try {
      var data = { uuid: uuid };
      console.log(url + uuid);
      const res = await axios.post(url, data);
      console.log(res.data.code);
      return data;
    } catch (err) {
      console.log(err);
    }
  }
}
export default verifyService;
