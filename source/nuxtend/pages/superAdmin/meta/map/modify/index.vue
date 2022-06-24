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
        :headerLocale="$t('header')"
        rowKey="nm_id"
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
          @click="addNameIdList"
          >저장</basic-button
        >
      </div>
    </div>
  </div>
</template>

<i18n src="./index.json"></i18n>

<script type="text/javascript">
import { mapActions } from "vuex";
import BasicTable from "@component/aiPlatform/basic/basic-table.vue";
import BasicButton from "@component/aiPlatform/basic/basic-button.vue";
export default {
  name: "super-admin-metaMapList",
  extends: {},
  data() {
    return {
      // TODO : 임시
      headerList: [{ column_name: "kor_nm" }, { column_name: "eng_nm" }],
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
        const data = this.$store.getters["meta/bizMeta/useMetaNameList"].body;

        // TODO : useMetaNameList를 호출해서 vuex를 셋팅하기전에, computed가 먼저 실행되면 data가 undefined가 되어 forEach를 실행할때 에러가 발생함. 일단은 주석처리 하였으며 추후에 방안 고민.
        if (data !== undefined) {
          // selectButtonList setting
          let selectButtonList = [];
          data.forEach((d) => {
            if (d["use_meta"]) {
              selectButtonList.push(d["nm_id"]);
            }
          });
          this.buttonList.textChange.selectButtonList = selectButtonList;
        }

        return data;
      }
    }
  },
  components: { BasicTable, BasicButton },
  methods: {
    ...mapActions("meta/bizMeta", ["getUseMetaNameList", "addMetaMap"]),
    async addNameIdList() {
      await this.addMetaMap(
        this.buttonList["textChange"]["selectButtonList"]
      ).then(() => {
        this.$router.push({ path: "/superAdmin/meta/map/list" });
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
