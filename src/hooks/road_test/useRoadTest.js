import {ref} from "vue";
import axios from "axios";
import toast from "@/use/toast";


export const by_user_test = ref({
  attachment_ids: [],
  comments: [],
  date_of_test: "",
  driver_id: "",
  examiner_name: "",
  license: "",
  name: "",
  note: "",
  signature_id: "",
  state: "",
  test_status: "pass",
  tests: [
    {
      "title": "1) Pre-Trip Inspection and Emergency Equipment",
      "body": null,
      "status": "unchecked"
    },
    {
      "title": "2) Coupling and Uncoupling",
      "body": null,
      "status": "unchecked"
    },
    {
      "title": "3) Placing Vehicle in motion and Use of Control",
      "body": "C. Brakes\nD. Steering\nE. Lights",
      "status": "unchecked"
    },
    {
      "title": "4) Backing and Parking",
      "body": "A. Backing\nB. Parking (City)\nC. Parking (Road)",
      "status": "unchecked"
    },
    {"title": "5) Slowing and Stopping", "body": null, "status": "unchecked"},
    {
      "title": "6) Operating in Traffic Passing And Turning",
      "body":
        "A. Turning\nB. Traffic Signs and Signals\nC. Intersections\nD. Grade Crossings\nE. Passing\nF. Speed",
      "status": "unchecked"
    },
    {
      "title": "7) Miscellaneous",
      "body":
        "A. General driving Ability and Habits\nB. Handling of Freight\nC. Rules and Regulations",
      "status": "unchecked"
    }
  ],
  trailer: "",
  truck: ""
});

export function getUserTest(id) {
  return new Promise((resolve, reject) => {
    axios.get(`/v1/road-test/${id}`).then(response => {
      // by_user_test.value = response?.data;
      resolve(response)
    })
      .catch(e=>reject(e))
  })
}

export async function updateUserTest(obj){
  try{
    await axios.post(`/v1/road-test/${obj.driver_id}`, obj);
    toast('100','success')
  }catch (e) {
    toast('400','error')
    console.log(e)
  }
}



