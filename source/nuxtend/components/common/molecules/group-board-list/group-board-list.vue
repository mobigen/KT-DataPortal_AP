<template lang="html">
  <table class="table table--board" :class="themeClass">
    <caption class="hidden">@@@@ 게시판입니다.</caption>
    <colgroup>
      <col style="width:80px">
      <col style="width:auto">
      <col style="width:100px">
      <col style="width:120px">
      <col style="width:80px">
    </colgroup>
    <thead>
    <tr>
      <th scope="col">번호</th>
      <th scope="col">제목</th>
      <th scope="col">작성자</th>
      <th scope="col">등록일</th>
      <th scope="col">상태</th>
    </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <BaseBadge class="badge--w-primary">
            <span class="badge__label">공지</span>
          </BaseBadge></td>
        <td class="tableList--title">
          <a href="#none">게시판 이용안내입니다.</a>
          <!-- 새글 아이콘 -->
          <BaseBadge class="badge--secondary">N</BaseBadge>
        </td>
        <td>관리자</td>
        <td>2022-07-04</td>
        <td>-</td>
      </tr>
      <tr v-for="(item, index) in tableList" :key="index">
        <td>{{ item.num }}</td>
        <td class="tableList--title">
          <a href="#none">{{ item.title }}</a>
          <!-- 첨부파일 아이콘 -->
          <svg-icon class="svg-icon" name="link" aria-hidden="true"></svg-icon>
          <!-- 새글 아이콘 -->
          <BaseBadge class="badge--secondary">N</BaseBadge>
        </td>
        <td>{{ item.writer }}</td>
        <td>{{ item.date }}</td>
        <td>
          <BaseBadge class="badge--sm">확인중</BaseBadge>
          <!--
            답변완료 : BaseBadge class="badge--blue badge--sm"
            확인중 : BaseBadge class="badge--sm"
          -->
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script type="text/javascript">
import BaseBadge from "@common/atoms/base-badge/base-badge";

export default {
  name: "GroupBoardList",
  props: {
    themeClass: {
      type: String
    },
    mobileClass: {
      type: String
    }
  },
  components: {
    BaseBadge
  },
  data() {
    return {
      tableList: [
        {num: '100', writer: '이벤트', title: '2021년 당첨자 공지 2021년 공공데이터 신규개발 수요조사 커피쿠폰 증정 이벤트 당첨자', hit: '1', date:'2021-06-23'},
        {num: '99', writer: '점검', title: '시스템 점검', hit: '20', date:'2021-06-23'},
        {num: '15', writer: '공지', title: 'mobile-show : 분류 + 제목 + 등록일자', hit: '115', date:'2021-06-23'},
        {num: '1', writer: '이벤트', title: '국군의 조직과 편성은 법률로 정한다. 대한민국의 주권은 국민에게 있고, 모든 권력은 국민으로부터 나온다.', hit: '1', date:'2021-06-23'},
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "./group-board-list";
</style>
