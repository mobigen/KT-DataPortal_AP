import Loader from "./loader.vue";

export default {
  title: 'Functional/[PCFI] 로더',
  components: Loader,
  decorators: [
    () => ({
      template: ""
    })
  ]
};

export const Default = () => ({
  components: { Loader },
  template: "<Loader></Loader>"
});
