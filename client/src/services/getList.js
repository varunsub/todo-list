import axios from "axios";
const url = `${process.env.VUE_APP_APIURL}getList`;

//gets a user's list
class getList {
  static async get(data) {
    try {
      return await axios.get(url, {
        headers: {
          Authorization: data.verificationToken,
          User: data.userId
        }
      });
    } catch (e) {
      console.log(e);
    }
  }
}
export default getList;
