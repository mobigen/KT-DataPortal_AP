import StoriesContainer from "../stories-container.vue"

import Locale from "./locale/locale.vue"
import SearchTab from "./search/search-tab.vue"

import {action} from "@storybook/addon-actions";

export default {
  title: 'All/Molecules',
}

const Template = ()  => ({
  components: {StoriesContainer, Locale, SearchTab},
  template:
    '<StoriesContainer>' +
    '<h2>Locale</h2><Locale @changeLocale="onChangeLocale"/><br/>' +
    '<h2>Search Tab</h2><SearchTab />' +
    '</StoriesContainer>',
  methods: {
    onChangeLocale(p) {
      action('changeLocale')(p);
    }
  }
});

export const Normal = Template.bind({});
