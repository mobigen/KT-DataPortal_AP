## 개요
- 이 문서는 AI 플랫폼 연구팀 에서 IRIS Web Developement Framework 를 기반으로 구현한 KT-DATA Portal 기준으로 작성되었습니다.
- 본 문서에서는 KT-DATA Portal을 사용할때 필요한 데이터 형식이나, 데이터의 rebuild, 사용법에 관해서 기술되어 있습니다.

### Store-plugins

- /src/store/plugins/storePlugin.js의 사용법에 대한 설명입니다.
- plugin 사용 방법은 아래와 같습니다.
  - \*\*\*Service.java에 @SQLHeader을 설정한다. (example : MetaMenagementService.java)
  - @SQLHeader에 추가 파라메터로 'useRebuildBody = true'를 설정한다.
  - vuex의 action을 이용하여 api를 호출한다.
  - action에서 데이터를 response 받아 action에서 mutation으로 commit을 실행하면, 이 plugin으로 넘어온다.
  - mutation plugin 에서 rebuild가 실행되면, state로 자동 commit 된다.
- subscriptAction을 사용하지 않은 이유는, vuex의 action에서 $api를 사용한 탓인지, 동작하지 않아서 사용하고 있지 않습니다.
- SQL 데이터 조회한 형식은 다음과 같습니다.
  - HEADER
    - | name_id | kor_name | eng_name    |
      | ------- | -------- | ----------- |
      | i202201 | 접근권한 | access_auth |
      | i202202 | 분류     | cate        |
  - BODY
    - | rowid | data         | columnkey |
      | ----- | ------------ | --------- |
      | m1abc | {공개, 건설}   | {1, 2}    |
      | m2abc | {비공개, 항공}  | {1, 2}    |
- vuex plugin에서, 이 데이터를 아래의 형태로 변경해줍니다.
  - AFTER PLUGIN
    - ```json
      {
        "header": [
          { "column_name": "접근권한" }, 
          { "column_name": "분류" }
      ],
        "body": [
          { "rowId": "m1abc", "접근권한": "공개", "분류": "건설" },
          { "rowId": "m2acc", "접근권한": "비공개", "분류": "항공" }
        ]
      }
      ```
    - ** 지금은 kor_name으로 하드 코딩 되어있는 상태입니다. 
      - Locale 처리를 위해서 위의 부분은 변경될 수 있습니다.
    - ** json 형태는 basic-table.vue 에 바로 적용 할 수 있는 형태입니다.
    - 위의 개발 내용은 추후에 변경될 수 있습니다.
