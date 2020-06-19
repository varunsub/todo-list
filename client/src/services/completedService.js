import axios from "axios";

const url = `${process.env.VUE_APP_APIURL}updateCompleted`;

//post to updated completed status of an item

class updateCompleted {
  static async post(id) {
    try {
      const res = await axios.post(url, id);
      console.log(res);
      return res.data.errorCode;
    } catch (err) {
      console.log(err);
    }
  }
}
export default updateCompleted;
