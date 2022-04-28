import StoriesContainer from "../stories-container.vue"

import BaseButton from "./base-button/base-button.vue";
import BaseBadge from "./base-badge/base-badge.vue";
import BaseTag from "./base-tag/base-tag.vue";
import BaseLoader from "./base-loader/base-loader.vue";
export default {
  title: 'All/Atoms',
}

const Template = ()  => ({
  components: {StoriesContainer, BaseButton, BaseTag, BaseBadge, BaseLoader },
  template:
    '<StoriesContainer>' +
    '<h2>Base Button</h2><BaseButton><span class="button__text">Base Button</span></BaseButton><br/>' +
    '<h2>Base Tag</h2><BaseTag><span class="tag__label">Base Tag</span></BaseTag><br/>' +
    '<h2>Base Badge</h2><BaseBadge><span class="badge__label">Base Badge</span></BaseBadge><br/>' +
    '<h2>Base Loader</h2><BaseLoader>Base-Loader</BaseLoader><br/>' +
    '</StoriesContainer>'
});

export const Normal = Template.bind({});
