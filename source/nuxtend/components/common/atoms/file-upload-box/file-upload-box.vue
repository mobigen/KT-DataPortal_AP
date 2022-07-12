<template>
  <div>
    <div class="flex-box">
      <label class="file-upload-button" for="file-upload-input">파일 선택</label>
      <input id="file-upload-input" type="file" @change="setFiles" multiple/>
      <div class="file-upload-msg">{{msg}}</div>
    </div>
    <div class="flex-box" v-if="defaultFiles.length!=0" v-for="(file,index) of defaultFiles">
      <div class="file-item">{{ file.fileName }}</div>
      <div class="remove-button" @click="deleteFile(file,index)">x</div>
    </div>
    <div class="flex-box" v-if="defaultFiles.length==0" v-for="(file,index) of files">
      <div class="file-item">{{ file.name }}</div>
      <div class="remove-button" @click="deleteFile(file,index)">x</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "file-upload-box",
  props:{
    msg:{
      default:""
    },
    defaultFiles:{
      type: Array,
      default(){return []}
    }
  },
  data() {
    return {
      files: [],
      deletedFiles:[]
    }
  },
  methods: {
    setFiles(e){
      this.files = [...e.target.files]
      this.$emit("setFiles",this.files)
    },
    deleteFile(file,index){
      if(this.defaultFiles.length!=0){
        this.deletedFiles.push(file);
        this.defaultFiles.splice(index,1);
        this.$emit("setDeletedFiles",this.deletedFiles);return;
      }
      else{this.files.splice(index,1); return;}
    }
  },
}
</script>

<style scoped>
.flex-box{
  display: flex;
}
.file-upload-button{
  border: 1px #BFBDBE dashed;
  padding: 3px;
  background-color: #F2F2F2;
}
.file-upload-button:hover{
  cursor: pointer;
}
#file-upload-input{
  display: none;
}
.file-upload-msg{
  margin-left: 10px;
  align-self: center;
}
.file-item{
  margin-right: 5px;
}
.remove-button{
  color: red;
}
.remove-button:hover{
  cursor: pointer;
}

</style>
