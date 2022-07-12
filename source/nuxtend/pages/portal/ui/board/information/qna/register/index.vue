<template>
  <div>
    <h1>문의하기</h1><br/>

    <h3>문의유형</h3>
    <radio-button
      :radioButtonList="categoryList"
      labelName="qnaCategory"
      defaultValue="0"
      @changeValue="setCategory"
    /><br/>

    <h3>제목</h3>
    <input
      type="text"
      :value="title"
      placeholder="50자 이내 입력가능"
      @input="setTitle"
    /><br/><br/>

    <h3>작성자</h3>
    <div v-if="getUserInfo.authenticated">{{getUserInfo.userNm}}</div><br/>

    <h3>이메일</h3>
    <div v-if="getUserInfo.authenticated">{{getUserInfo.email ? getUserInfo.email : "test@example.com"}}</div>
    <basic-single-checkbox
      checkboxLabel="이메일 답변 받기"
      @changeData="setEmailAnsYn"
    ></basic-single-checkbox><br/>

    <h3>공개여부</h3>
    <radio-button
      :radioButtonList="openYnList"
      labelName="qnaOpenYn"
      defaultValue="0"
      @changeValue="setOpenYn"
    /><br/>

    <h3>내용</h3>
    <basic-textarea
      :inputData="contents"
      @input="setContents"
    ></basic-textarea><br/>

    <h3>첨부파일</h3>
    <file-upload-box @setFiles="setFiles" msg="첨부파일을 선택해주세요. (최대 10MB까지 등록 가능)"/>

    <h3>비밀번호</h3>
    <div>4자리 숫자 이하로 입력해주세요</div>
    <input
      type="password"
      :value="password"
      @input="setPassword"
    /><br/><br/>

    <basic-button
      @click="cancel"
    >취소</basic-button>

    <basic-button
      @click="register"
    >등록</basic-button>
  </div>
</template>

<script>

import {mapActions, mapGetters} from "vuex";
import RadioButton from "@common/atoms/radio-button";
import TextInput from "@common/atoms/text-input";
import BasicTextarea from "@common/atoms/basic-textarea";
import BasicSingleCheckbox from "@common/atoms/basic-single-checkbox";
import BasicButton from "@common/atoms/basic-button";
import FileUploadBox from "@component/common/atoms/file-upload-box/file-upload-box";

export default {
  name: "index",
  components: {FileUploadBox, BasicButton, BasicSingleCheckbox, BasicTextarea, TextInput, RadioButton},
  computed: {
    ...mapGetters("users/user",["getUserInfo"]),
  },
  asyncData({store,redirect}){
    // url로 이동시 로그인 여부 체크
    const userInfo = store.getters["users/user/getUserInfo"]
    if(!userInfo.authenticated){
      redirect("/portal/ui/board/information/qna")
      if(process.client){alert("로그인후 이용가능합니다.")}
    }
  },
  data() {
    return {
      files:[],
      title:"",
      contents:"",
      category: "일반",
      categoryList: [
        { value: 0, label: "일반" },
        { value: 1, label: "데이터" },
        { value: 2, label: "회원가입" },
        { value: 3, label: "기타" }
      ],
      openYn:"Y",
      openYnList:[
        { value: 0, label: "공개" },
        { value: 1, label: "비공개" },
      ],
      emailAnsYn:'N',
      password:''
    }
  },
  methods: {
    ...mapActions("board/qna/qna",["createQna","fileUpload"]),
    setCategory(param) {
      this.category = this.categoryList.filter((item) => item.value == param.input)[0].label;
      console.log(this.category)
    },
    setOpenYn(param){
      if(param.input==0){this.password =''}
      this.openYn = param.input == 0 ? 'Y' : 'N'
    },
    setEmailAnsYn(value){
      this.emailAnsYn = value ? 'Y' : 'N'
    },
    setTitle(e){
      const maxLength = 50;
      if(e.target.value.length>maxLength){
        alert("제목은 50자 이내 입력가능합니다.")
        e.target.value = e.target.value.substr(0,maxLength)
      }
      this.title = e.target.value
    },
    setContents(param){
      this.contents = param.input;
    },
    setPassword(e){
      if(this.openYn=="Y"){ e.target.value = '' }  // 공개일때 비밀번호 비활성화
      const maxLength = 4
      e.target.value = e.target.value.replace(/[^0-9]/g, '')  // 숫자만 입력
      if(e.target.value.length>maxLength){
        alert("비밀번호는 4자 이내 입력가능합니다.")
        e.target.value = e.target.value.substring(0,maxLength)
      }
      this.password = e.target.value
    },
    setFiles(files){
      this.files=files;
      console.log(this.files)
    },
    cancel(){
      if(confirm("취소하시겠습니까")){
        this.$router.push(`/portal/ui/board/information/qna`)
      }
    },
    async register(){
      if(this.title=="" || this.contents==""){
        alert("제목과 내용을 모두 입력해주세요"); return;
      }
      if(this.openYn=="N" && (this.password.length==0 || this.password.length>4)){
        alert("비공개시 4자리 숫자 이내로 비밀번호를 입력해주세요"); return;
      }
      const createData={
        category : this.category,
        title : this.title,
        regUser : this.getUserInfo.userId,
        email : this.getUserInfo.email ? this.getUserInfo.email : "test@example.com",
        emailAnsYn : this.emailAnsYn,
        openYn : this.openYn,
        contents: this.contents,
        password: this.password
      }
      console.log(createData)
      if(confirm("등록하시겠습니까")){
        const data = await this.createQna(createData)
        const params = {
          files: this.files,
          contentId : data.qnaId,
          service : "qna"
        }
        if(this.files.length>0){ await this.fileUpload(params)}
        this.$router.push(`/portal/ui/board/information/qna`)
      }
    }
  },
}
</script>

<style scoped>
</style>
