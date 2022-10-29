<template>
  <div class="road__test">
    <div class="road__test-title text-h3-SBold">Record of Road Test</div>
    <div class="road__test-inputs">
      <v-input  label="Name" place="Enter name"/>
      <v-input  label="Date of Test"  type="date" place="Enter name"/>
      <v-input  label="License#" place="Enter name"/>
      <v-input  class-name="state" label="State" place="--"/>
      <v-input  class-name="truck" label="Truck" place="Enter truck#"/>
      <v-input  class-name="truck" label="Trailer" place="Enter trailer#"/>
    </div>
    <div class="road__test-title text-h3-SBold">Record of Road Test</div>
    <div class="road__test-tests">
      <div class="road__test-items">
        <template :key="i" v-for="(test,i) in tests">
          <div class="road__test-item" v-if="i<4">
            <div class="title">
              <span class="text-h4">{{test.title}}</span>
              <div class="icons">
                <v-radio-input label="" @click="()=>test.status='checked'" :v-checked="test?.status==='checked'" :name='"name"+i' value=""/>
                <v-close-icon @click="()=>test.status='unchecked'" :check="test?.status==='unchecked'"/>
              </div>
            </div>
            <pre class="body" v-if="test.body" v-html="test.body"></pre>
          </div>
        </template>
      </div>
      <div class="road__test-items">
        <template :key="i" v-for="(test,i) in tests">
          <div class="road__test-item" v-if="i>3">
            <div class="title">
              <span class="text-h4">{{test.title}}</span>
              <div class="icons">
                <v-radio-input label="" @click="()=>test.status='checked'" :v-checked="test?.status==='checked'" :name='"name"+i' value=""/>
                <v-close-icon @click="()=>test.status='unchecked'" :check="test?.status==='unchecked'"/>
              </div>
            </div>
            <pre class="body text-h4" v-if="test.body" v-html="test.body"></pre>
          </div>
        </template>
      </div>
    </div>
    <div class="road__test-title text-h3-SBold mt-15">Select</div>
    <div class="road__test-select">
      <v-radio-input label="Pass"  name="select" value=""/>
      <v-radio-input label="Needs Training"  name="select" value=""/>
      <v-radio-input label="Fail"  name="select" value=""/>
    </div>
    <div class="road__test-docs ">
<!--      <div class="road__test-items px-15">-->
<!--        <div class="road__test-doc">-->
<!--          <div class="title"><span class="text-h1">Examiner Name</span></div>-->
<!--          <v-input  label=""  place="Enter Examiner Name"/>-->
<!--        </div>-->
<!--      </div>-->
      <div class="road__test-items box1 ">
        <div class="road__test-doc">
          <!--          <div class="title"><span class="text-h1">Examiner Name</span></div>-->
          <v-input class-name="my-15" label="Examiner Name"  place="Enter Examiner Name"/>
          <div class="title"><span class="text-h1">Company representative Signature</span></div>
          <div class="box box-img"></div>
        </div>
      </div>
      <div class="road__test-items ">
        <div class="road__test-doc">
          <div class="title"><span class="text-h1">Note</span></div>
          <div class="box">
            <v-input-modal/>
          </div>
        </div>
      </div>
      <div class="road__test-items ">
        <div class="road__test-doc">
          <div class="title"><span class="text-h1">Attachments</span></div>
          <div class="box box-file">
          </div>
        </div>
      </div>
      <div class="road__test-items ">
        <div class="road__test-doc">
          <div class="title"><span class="text-h1">Comments</span></div>
          <textarea class="box box-file"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import VInput from "@/components/ui/vInput";
import CheckListItem from "@/components/app/modals/modal-check-list/CheckListItem";
import VRadioInput from "@/components/ui/vRadioInput";
import VCloseIcon from "@/components/ui/vCloseIcon";
import {ref} from "vue";
import VInputModal from "@/components/ui/vInputModal";
export default {
  components:{VCloseIcon, VInput,VRadioInput,VInputModal},
  name: "DriverRoadTest",
  setup() {
    let tests=ref( [
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
            "A. Turing\nB. Traffic Signs and Signals\nC. Intersections\nD. Grade Crossings\nE. Passing\nF. Speed",
        "status": "unchecked"
      },
      {
        "title": "7) Miscellaneous",
        "body":
            "A. General driving Ability and Habits\nB. handling of Freight\nC. rules and Regulations",
        "status": "unchecked"
      }
    ])
    return {tests}
  }
}
</script>