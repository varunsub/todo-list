import axios from "axios";
const url = `${process.env.VUE_APP_APIURL}addItem`;

//posts login data
class addItem {
  static async getter(data) {
    try {
      const res = await axios.post(url, data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  }
}
export default addItem;
