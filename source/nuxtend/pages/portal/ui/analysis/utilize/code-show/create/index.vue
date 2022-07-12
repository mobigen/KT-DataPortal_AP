<template>
  <div>
    <h1>코드뽐내기 등록</h1>
    <h3>정보 입력</h3>

    <h3>제목</h3>
    <input
      type="text"
      :value="title"
      placeholder="제목을 입력해주세요(50자 내외)"
      @beforeinput="setTitle"
    /><br/><br/>
    <h3>설명</h3>
    <base-textarea
      :input-data="contents"
      @input="setContents"
    ></base-textarea>
  </div>
</template>

<script>
import BaseTextarea from "@common/atoms/base-textarea/base-textarea";
export default {
  name: "createCodeShow",
  components: {BaseTextarea},
  data(){
    return{
      contentsInfo:""
    }
  },
  mounted() {
  },
  computed:{

  },
  methods:{
    setTitle(e) {
      if (e.target.value.length > 50) {
        alert('50자 이내 입력 가능합니다.');
        e.preventDefault();
      }
    },
    setContents(param){
      this.contentsInfo=param.input;
    }
  }
}
</script>

<style scoped>

</style>
