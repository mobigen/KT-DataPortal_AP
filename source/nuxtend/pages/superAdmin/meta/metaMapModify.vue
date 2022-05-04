<template lang="html">
  <div>
    <h2>super admin metaMap modify</h2>
    <h1>META MAP 정보 수정</h1>
    <div>
      <h3>simple-table</h3>
      <basic-table
        componentId=""
        :headerList="headerList"
        :dataList="useMetaNameList"
        rowKey="name_id"
        :useSerialNum="false"
        serialNumText=""
        :useTableButton="true"
        :tableButtonText="this.buttonList"
        @buttonAction="tableButtonClick"
        @columnAction=""
        :keyActionText="{}"
        @keyAction=""
      />

      <div class="add-button">
        <basic-button
          componentId=""
          buttonCss="text-button"
          :underline="false"
          :hoverColor="false"
          @click="addObject"
          >저장</basic-button
        >
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import { mapActions } from "vuex";
import BasicTable from "@/components/aiPlatform/basic/basic-table.vue";
import BasicButton from "@/components/aiPlatform/basic/basic-button.vue";
export default {
  name: "super-admin-metaMapList",
  extends: {},
  data() {
    return {
      // TODO : 임시
      headerList: [{ column_name: "kor_name" }, { column_name: "eng_name" }],
      buttonList: {
        textChange: {
          buttonType: "text",
          buttonName: "설정",
          buttonCss: "text-button",
          textData: ["선택취소", "선택"],
          selectButtonList: []
        }
      }
    };
  },
  props: {},
  computed: {
    useMetaNameList: {
      get() {
        const data = this.$store.getters["bizMeta/useMetaNameList"];

        // selectButtonList setting
        let selectButtonList = [];
        data.forEach((d) => {
          if (d["use_meta"]) {
            selectButtonList.push(d["name_id"]);
          }
        });
        this.buttonList.textChange.selectButtonList = selectButtonList;

        return data;
      }
    }
  },
  components: { BasicTable, BasicButton },
  methods: {
    ...mapActions("bizMeta", ["getUseMetaNameList", "addMetaMap"]),
    async addObject() {
      await this.addMetaMap(
        this.buttonList["textChange"]["selectButtonList"]
      ).then(() => {
        this.$router.push({ path: "/superAdmin/meta/metaMapList" });
      });
    },
    tableButtonClick(rowKey, btnAction) {
      if (btnAction === "textChange") {
        let selectButtonList = this.buttonList[btnAction]["selectButtonList"];
        if (selectButtonList.includes(rowKey)) {
          const index = selectButtonList.indexOf(rowKey);
          selectButtonList.splice(index, 1);
        } else {
          selectButtonList.push(rowKey);
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
  margin: 10px 0;
}
</style>
