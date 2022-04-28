import SearchResultArticle from "./search-result-article.vue";
import { action } from "@storybook/addon-actions";

export default {
  title: "Organisms/SearchResultArticle",
  component: SearchResultArticle
};

const Template = (args, { argTypes }) => ({
  components: { SearchResultArticle },
  template: "<SearchResultArticle />"
});

export const Normal = Template.bind({});
