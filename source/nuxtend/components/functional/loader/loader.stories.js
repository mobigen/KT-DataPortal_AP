import Loader from "./loader.vue";

export default {
  title: "Functional/Loader",
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
