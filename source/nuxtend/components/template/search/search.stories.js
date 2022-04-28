import Search from "./search.vue";

export default {
  title: "Templates/Search"
};

const Template = () => ({
  components: { Search },
  template: "<Search />"
});

export const Normal = Template.bind({});
