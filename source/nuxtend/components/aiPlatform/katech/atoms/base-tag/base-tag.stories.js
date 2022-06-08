import BaseTag from "./base-tag.vue";

export default {
  title: 'Styled/Atoms/[PCFC] 태그',
  components: BaseTag,
  decorators: [
    () => ({
      template:
        '<div style="margin: 1em;"><h2 style="margin-bottom: 20px; font-size: 20px; color: #212121;">(예시) Tag Element </h2><div style="display: flex; flex-direction: row; "><story /></div></div>',
    }),
  ],
};

export const Default = () => ({
  components: { BaseTag },
  template:
    '<BaseTag class="tag--cyan-deep" href="https://www.naver.com" target="_blank"><span class="tag__label" >Tag - Default</span><svg-icon class="svg-icon tag__remove-button" name="close" aria-hidden="true"></svg-icon></BaseTag>',
});

export const TagSmall = () => ({
  components: { BaseTag },
  template:
    '<BaseTag class="tag--sm tag--red-deep" title="Tag Small" target="_parent"><span class="tag__label">Tag - small</span> </BaseTag>',
});

export const TagLarge = () => ({
  components: { BaseTag },
  template:
    '<BaseTag class="tag--lg tag--purple-deep"><span class="tag__label">Tag - Large</span> </BaseTag>',
});
