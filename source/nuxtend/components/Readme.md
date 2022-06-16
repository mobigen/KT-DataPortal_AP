# Components 폴더 규칙

## 📂 폴더 구조

```
components/
│
├── common/                       // 공통으로 사용하는 components
│   ├── atoms/                        // 최소단위의 components
│   ├── molecules/                    // 중간단위의 components
│   └── organisms/                    // 큰단위의 components
│
├── meta/                         // meta쪽에서만 사용하는 components
│   ├── atoms/                        // 상동
│   ├── molecules/                    // 상동
│   └── organisms/                    // 상동
│
├── users/                        // 각각의 project에서 사용하는 components - 디렉토리명은 page에 맞춰서 설정.
│   ├── atoms/                        // 상동
│   ├── molecules/                    // 상동
│   └── organisms/                    // 상동
│
├── aiPlatform/                   // apTeam에서 관리합니다. 
├── DPTeam/                       // DPTeam에서 관리합니다.
├── UITeam/                       // apTeam에서 관리합니다.
│
├── organisms                     // /ui/users/social-login 에서 사용중. DP팀에서 관리 부탁드립니다.
├── functional                    // /ui/users/social-login 에서 사용중. DP팀에서 관리 부탁드립니다.  
│
├── basic-template-code.vue       // vue component 생성시 기본으로 사용할 템플릿 파일 
└── stories-container.vue         // storybook 파일
 
```
- components의 하위 디렉토리 구조는 UI 솔루션 팀에서 설정한 components 구조를 그대로 따라서 생성하였습니다.
- 각각의 팀 이름으로 생성되어있는 디렉토리는 그 팀이 관리하며, 프로젝트 종료 전에 삭제합니다.
- components/organisms, components/functional 폴더는 DP팀에서 사용중인것으로 보여 정리하지 않았습니다. DP팀에서 관리 부탁드립니다.
- UITeam에서 제공하는 components는 submodule 형태로 제공될 예정으로 (0610 회의 내용) 구현이 완료 되면 UITeam/ 디렉토리는 삭제하겠습니다. (apTeam에서 삭제)

## NOTY
- 이 파일은 AI 플랫폼 연구팀(AP팀)에서 작성하였으며, 폴더구조는 0614 회의 내용 기준으로 설정하였습니다.
- 수정이 필요한 부분은 메신저로 연락 부탁드립니다.
