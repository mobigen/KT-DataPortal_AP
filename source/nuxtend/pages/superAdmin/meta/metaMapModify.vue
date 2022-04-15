<template lang="html">
  <div>
    <h2>super admin metaMap modify</h2>
    <h1>META MAP 정보 수정</h1>
    <div>
      <h3>simple-table</h3>
      <basic-table
        :headerList="headerList"
        :dataList="useMetaNameList"
        rowKey="name_id"
        buttonHeaderUse
        :buttonHeaderText="this.buttonList"
        @buttonAction="tableButtonClick"
      />

      <div class="add-button">
        <basic-button @click="addObject" buttonCss="text-button"
          >저장</basic-button
        >
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapActions, mapGetters } from "vuex";
import BasicTable from "@/components/basic/basic-table.vue";
import BasicButton from "@/components/basic/basic-button.vue";
export default {
  name: "super-admin-metaMapList",
  extends: {},
  data() {
    return {
      // 임시
      headerList: [{ column_name: "kor_name" }, { column_name: "eng_name" }],
      buttonList: [
        {
          buttonName: "설정",
          buttonCss: "text-button",
          textData: ["선택취소", "선택"],
          buttonAction: "textChange",
          selectButtonList: []
        }
      ]
    };
  },
  props: {},
  computed: {
    ...mapGetters("bizMeta", ["useMetaNameList"])
  },
  watch: {
    useMetaNameList(data) {
      data.forEach((d) => {
        if (d["use_meta"]) {
          this.buttonList[0]["selectButtonList"].push(d["name_id"]);
        }
      });
    }
  },
  components: { BasicTable, BasicButton },
  methods: {
    ...mapActions("bizMeta", ["getUseMetaNameList", "addMetaMap"]),
    async addObject() {
      await this.addMetaMap(this.buttonList[0]["selectButtonList"]);
      this.$router.go(-1);
    },
    tableButtonClick(rowKey, btnAction) {
      if (btnAction === "textChange") {
        let selectButtonList = this.buttonList[0]["selectButtonList"];
        if (!selectButtonList.includes(rowKey)) {
          selectButtonList.push(rowKey);
        } else {
          const index = selectButtonList.indexOf(rowKey);
          selectButtonList.splice(index, 1);
        }
      }
    }
  },
  created() {
    this.getUseMetaNameList();
  }
};
</script>

<style lang="scss">
.add-button {
  display: flex;
  justify-content: flex-end;
  margin: 10px 0px;
}
</style>
