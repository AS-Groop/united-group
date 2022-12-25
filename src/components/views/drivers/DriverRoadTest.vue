<template>
  <div class="road__test">
    <div class="road__test-title text-h3-SBold">Record of Road Test</div>
    <div class="road__test-inputs">
      <v-input :error="validate && !by_user_test.name" v-model="by_user_test.name" label="Name" place="Enter name"/>
      <v-input :error="validate && !by_user_test.date_of_test" v-model="by_user_test.date_of_test" label="Date of Test"
               type="date" place="Enter name"/>
      <v-input :error="validate && !by_user_test.license" v-model="by_user_test.license" label="License#"
               place="Enter name"/>
      <v-input :error="validate && !by_user_test.state" v-model="by_user_test.state" class-name="state" label="State"
               place="--"/>
      <v-input :error="validate && !by_user_test.truck" v-model="by_user_test.truck" class-name="truck" label="Truck"
               place="Enter truck#"/>
      <v-input :error="validate && !by_user_test.trailer" v-model="by_user_test.trailer" class-name="truck"
               label="Trailer" place="Enter trailer#"/>
    </div>
    <div class="road__test-title text-h3-SBold">Record of Road Test</div>
    <div class="road__test-tests">
      <div class="road__test-items">
        <template :key="i" v-for="(test,i) in by_user_test.tests">
          <div class="road__test-item" v-if="i<4">
            <div class="title">
              <span class="text-h4">{{ test.title }}</span>
              <div class="icons">
                <v-radio-input label="" @click="()=>test.status='checked'" :v-checked="test?.status==='checked'"
                               :name='"name"+i' value=""/>
                <v-close-icon @click="()=>test.status='unchecked'" :check="test?.status==='unchecked'"/>
              </div>
            </div>
            <pre class="body text-h4" v-if="test.body" v-html="test.body"></pre>
          </div>
        </template>
      </div>
      <div class="road__test-items">
        <template :key="i" v-for="(test,i) in by_user_test.tests">
          <div class="road__test-item" v-if="i>3">
            <div class="title">
              <span class="text-h4">{{ test.title }}</span>
              <div class="icons">
                <v-radio-input label="" @click="()=>test.status='checked'" :v-checked="test?.status==='checked'"
                               :name='"name"+i' value=""/>
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
      <v-radio-input @myChange="checkStatus" :v-checked="by_user_test.test_status === 'pass'" label="Pass" name="select" value="pass"/>
      <v-radio-input @myChange="checkStatus" :v-checked="by_user_test.test_status === 'needs_training'" label="Needs Training" name="select" value="needs_training"/>
      <v-radio-input @myChange="checkStatus" :v-checked="by_user_test.test_status === 'fail'" label="Fail" name="select" value="fail"/>
    </div>
    <div class="road__test-docs ">
      <div class="road__test-items box1 ">
        <div class="road__test-doc">
          <v-input :error="validate && !by_user_test.examiner_name" v-model="by_user_test.examiner_name"
                   class-name="my-15" label="Examiner Name" place="Enter Examiner Name"/>
          <div class="title"><span class="text-h1">Company representative Signature</span></div>
          <div class="box box-img" :class="{'error':validate && !by_user_test.signature_id}" @click="image_draw=true">
            <div class="img" ref="img"></div>
          </div>
        </div>
      </div>
      <div class="road__test-items ">
        <div class="road__test-doc">
          <div class="title"><span class="text-h1">Note</span></div>
          <div class="box">
            <v-input-modal :error="validate && !by_user_test.note" @onChange="val=>by_user_test.note = val"
                           :inputValue="by_user_test.note"/>
          </div>
        </div>
      </div>
      <div class="road__test-items ">
        <div class="road__test-doc">
          <div class="title"><span class="text-h1">Attachments</span></div>
          <div class="box box-file">
            <label class="file">
              <input type="file" class="d-none" accept="image/jpeg,image/gif,image/png,application/pdf,image/x-eps" @change="uploadImage">
              <v-svg width="61" height="60" id="loaded-image"/>
              <span>Upload</span>
            </label>
            <div class="file" @click="fileDownload(i)" v-for="(i,index) in by_user_test.attachment_ids">
              <v-svg width="60" height="60" id="file-download"/>
              <span>File{{ index }}</span>
              <svg class="remove" @click.stop="remove(i)" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="6.9" transform="rotate(90 10 10)" stroke="#BDBDBD" stroke-width="1.2"/>
                <path d="M13.333 13.3333L6.66634 6.66663" stroke="#BDBDBD" stroke-width="1.2" stroke-linecap="round"
                      stroke-linejoin="round"/>
                <path d="M13.333 6.66671L6.66634 13.3334" stroke="#BDBDBD" stroke-width="1.2" stroke-linecap="round"
                      stroke-linejoin="round"/>
              </svg>
            </div>

          </div>
        </div>
      </div>
      <div class="road__test-items ">
        <div class="road__test-doc">
          <div class="title"><span class="text-h1">Comments</span></div>
          <textarea v-model="commit.text" class="box box-file"></textarea>
        </div>
      </div>
      <div class="road__test-items " v-for="i in by_user_test.comments">
        <div class="road__test-doc">
          <div class="title"><span class="text-h1">Comments</span></div>
          <textarea v-model="i.text" disabled class="box"></textarea>
          <div class="info">
            <div class="name">{{ i.created_by }}</div>
            <div class="date">{{ i.created_at }}</div>
          </div>
        </div>
      </div>
    </div>
    <v-btn class="mt-15" @click="save">save</v-btn>
  </div>
  <teleport to="body">
    <ModalDraw  v-if="image_draw" @close="image_draw = false" title="Company representative Signature" />
  </teleport>
</template>
<script>
import VInput from "@/components/ui/vInput";
import CheckListItem from "@/components/app/modals/modal-check-list/CheckListItem";
import VRadioInput from "@/components/ui/vRadioInput";
import VCloseIcon from "@/components/ui/vCloseIcon";
import {onMounted, onUnmounted, ref, watch} from "vue";
import VInputModal from "@/components/ui/vInputModal";
import {by_user_test, by_user_test0, getUserTest, updateUserTest} from "@/hooks/road_test/useRoadTest";
import router from "@/router";
import VBtn from "@/components/ui/vBtn";
import {user_profile} from "@/hooks/user/useUser";
import {fetchImg, getFileById, uploadFile} from "@/hooks/file/useFile";
import ModalDraw from "@/components/app/modals/ModalDraw";
import VSvg from "@/components/ui/vSvg";
import {changeInput} from "@/hooks/app/department";

export default {
  components: {VBtn, VSvg, ModalDraw, VCloseIcon, VInput, VRadioInput, VInputModal},
  name: "DriverRoadTest",
  setup() {
    let validate = ref(false);
    const img = ref(null);
    const image_draw = ref(false);
    const commit = ref({
      created_at: "",
      created_by: "",
      text: ""
    })

    watch(fetchImg,(a)=>{
      if(a?.file_id){
        by_user_test.value.signature_id = a.file_id;
        getImage();
      }
    })


    function save() {
      validate.value = true;
      let date = new Date();
      commit.value.created_at = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.toLocaleTimeString('ru-Ru');
      commit.value.created_by = user_profile.value?.first_name + ' ' + user_profile.value?.last_name;
      if (by_user_test.value.name &&
          by_user_test.value.date_of_test &&
          by_user_test.value.license &&
          by_user_test.value.signature_id &&
          by_user_test.value.state &&
          by_user_test.value.truck &&
          by_user_test.value.trailer &&
          by_user_test.value.examiner_name &&
          by_user_test.value.note) {
        commit.value?.text ? by_user_test.value.comments.push({text:commit.value.text,created_by:commit.value.created_by,created_at:commit.value.created_at,}) : '';
        updateUserTest(by_user_test.value);
      }
    }

    const getImage = ()=> {
      if (by_user_test.value?.signature_id) getFileById(by_user_test.value.signature_id).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const Img = new Image();
        Img.src = url;
        img.value.innerHTML = '';
        img.value.appendChild(Img);
      });
    }

    const fileDownload = (value) => getFileById(value).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      console.log(url)
      link.setAttribute('download', 'file.' + response.data.type.split('/')[response.data.type.split('/').length - 1]); //or any other extension
      document.body.appendChild(link);
      link.click();
    })
    async function uploadImage(e) {
      let file = e.target.files[0];
      const data = new FormData();
      data.append('file', file);
      await uploadFile(data).then(data => {
        if(data?.file_id)by_user_test.value.attachment_ids.push(data.file_id)
      });
    }

    const remove = (id) => {
      by_user_test.value.attachment_ids = by_user_test.value.attachment_ids.filter(i => i !== id);
      // ctx.emit('update:item', props.item);
    }




    onMounted(() => {
      by_user_test.value.driver_id = router.currentRoute.value.params.id
      getUserTest(router.currentRoute.value.params.id)
          .then(data => {
            if(data?.data){
              console.log(data)
              by_user_test.value = data.data;
              getImage();
            }

          })
          .catch(e => {
            console.log(e);
          });
    });

    onUnmounted(()=> {
      by_user_test.value = by_user_test0;
    })

    return {
      validate, save, img, fileDownload,uploadImage,
      by_user_test, commit,image_draw,getImage,remove,
      checkStatus(e) {
        if (e.target.checked) by_user_test.value.test_status = e.target.value;
      }
    }
  }
}
</script>