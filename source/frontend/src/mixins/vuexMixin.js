export default {
  methods: {
    commonMixin_testCall() {
      console.log("testCall");
    },
    /**
     * 목록을 조회한 row 데이터를, grid 형식이 맞게 쓸수 있도록 변형해준다.
     */
    commonMixin_ConvertSql(oldData) {
      console.log(oldData);
      if (Object.prototype.hasOwnProperty.call(oldData, "header")) {
      }
      if (Object.prototype.hasOwnProperty.call(oldData, "body")) {
      }
      return null;
    }
  }
};
