import axios from "axios";

const url = `${process.env.VUE_APP_APIURL}updateEvent`;

class updateService {
  static async getter(data) {
    try {
      const res = await axios.post(url, data);
      console.log(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
}
export default updateService;
