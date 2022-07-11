<template>
  <Dialog
    :dialog-name="name"
    :width="'970px'"
    :height="'auto'"
    :title="'데이터 활용 신청하기'"
    confirmButtonText="신청"
    :confirmButtonDisabled="confirmButtonDisabled"
    @confirm="requestConfirmBtnClick"
    @close="resetRequestData"
  >
    <div slot="body" class="modal__body">
      <div class="table-wrap">
        <!-- formbox -->
        <table class="formbox">
          <caption class="hidden">
            데이터 활용 신청하기 게시판
          </caption>
          <colgroup>
            <col style="width: 140px" />
            <col style="width: auto" />
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">데이터명</th>
              <td>
                <ul class="data-name-list">
                  <li>
                    {{ data.data_nm }}
                    <p
                      class="txt-info color--danger"
                      v-if="data.law_evl_conf_yn === 'y'"
                    >
                      <strong class="required">필수</strong>법률검토 필요
                    </p>
                  </li>
                </ul>
              </td>
            </tr>
            <tr>
              <th scope="row">신청자<strong class="required">필수</strong></th>
              <td>
                <base-input id="inp-apyr" @input="setRequestData"></base-input>
                <!--
        TODO: 임시로 신청자 입력하게 해놓음, 추후 수정
        {{ `${requestData.apyr}(${requestData.emp_num})` }}
        -->
              </td>
            </tr>
            <tr>
              <th scope="row">
                신청내용<strong class="required">필수</strong> <br />(활용목적)
              </th>
              <td>
                <BaseTextarea
                  id="text-apy_sbst"
                  rows="6"
                  element-class="text-area--fixed scrollCustomize"
                  placeholder="데이터 신청 개요와 활용 목적을 입력하세요."
                  :useCheckByte="false"
                  @input="setRequestData"
                ></BaseTextarea>
              </td>
            </tr>
            <tr>
              <th scope="row">
                법률검토<strong
                  class="required"
                  v-if="data.law_evl_conf_yn === 'y'"
                  >필수</strong
                >
              </th>
              <td>
                <div class="v-group">
                  <BaseTextarea
                    id="text-law_evl_conf_dt"
                    rows="6"
                    element-class="text-area--fixed scrollCustomize"
                    placeholder="법률검토 대상 데이터입니다. 법률검토 내용을 입력하거나 파일로첨부하세요. "
                    :useCheckByte="false"
                    @input="setRequestData"
                  ></BaseTextarea>
                  <GroupFileAttach> </GroupFileAttach>
                </div>
              </td>
            </tr>
            <tr>
              <th scope="row">
                기간설정<strong class="required">필수</strong>
              </th>
              <td>
                <Date-picker
                  :range="true"
                  :endDate="requestData.end_date"
                  @change="setDatePicker"
                />
              </td>
            </tr>
          </tbody>
        </table>
        <!-- // formbox -->
      </div>
    </div>
  </Dialog>
</template>

<script type="text/javascript">
import BaseTextarea from "@component/common/atoms/base-textarea/base-textarea.vue";
import GroupFileAttach from "@component/common/molecules/group-file-attach/group-file-attach";
import Dialog from "@functional/dialog/dialog.vue";
import BaseInput from "@component/common/atoms/base-input/base-input";
import DatePicker from "@functional/datepicker/date-picker.vue";
import moment from "moment";
import { errorAlert, successAlert } from "@functional/alert/alert-default";

export default {
  name: "requestDataDialog",
  props: {
    name: {
      type: String,
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  },
  components: {
    BaseTextarea,
    GroupFileAttach,
    Dialog,
    BaseInput,
    DatePicker
  },
  data() {
    return {
      requestData: {},
      confirmButtonDisabled: true
    };
  },
  methods: {
    resetRequestData() {
      this.requestData = {
        biz_dataset_id: this.data.biz_dataset_id,
        apyr: "", // 신청자
        emp_num: "20161665", //사원번호
        apy_sbst: "", // 신청내용
        law_evl_conf_dt: "", // 법률검토 내용
        start_date: "", // 활용기간 시작일
        end_date: moment().add(1, "Y").format() // 활용기간 종료일
      };
      this.confirmButtonDisabled = this.data.law_evl_conf_yn === "y";
    },
    setRequestData({ id, input }) {
      const key = id.split("-").pop();
      this.requestData[key] = input;
      // TODO: 법률검토 or 파일 입력 안하면 버튼 비활성화, 현재 법률검토만 확인함 추후 수정해야함
      if (this.data.law_evl_conf_yn === "y") {
        this.confirmButtonDisabled = !this.requestData["law_evl_conf_dt"];
      }
    },
    setDatePicker(e) {
      this.requestData["start_date"] = e.at(0);
      this.requestData["end_date"] = e.at(1);
    },
    requestConfirmBtnClick(name) {
      // TODO: 신청자를 입력값으로 받기때문에 체크, 추후 삭제
      if (!(this.requestData.apyr && this.requestData.apy_sbst)) {
        errorAlert({ content: "필수 값들을 입력해주세요" });
        return;
      }
      console.log(this.requestData);
      // TODO: 일단 3개의 데이터만 보냄, 추후 수정
      let data = {};
      data.biz_dataset_id = this.requestData.biz_dataset_id;
      data.apyr = this.requestData.apyr;
      data.apy_sbst = this.requestData.apy_sbst;
      this.$axios
        .post(this.$config.ROUTE_API_META_PREFIX + "/insertUseBoardData", data)
        .then((res) => {
          if (res !== false) {
            successAlert({
              title: "데이터 활용 신청이 완료되었습니다.",
              content:
                "활용신청하신 데이터는 마이페이지 > 내 활용내역에서 확인할 수 있습니다."
            });
            this.resetRequestData();
            this.$modal.hide(name);
          }
        });
    }
  },
  mounted() {
    this.resetRequestData();
  }
};
</script>
