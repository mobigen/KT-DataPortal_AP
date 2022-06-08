import BaseRadio from "./base-radio.vue";

export default {
  title: 'Styled/Atoms/[PCFC] 라디오',
  components: BaseRadio,
  decorators: [
    () => ({
      template:
        '<div style="margin: 1em;"><h2 style="margin-bottom: 20px; font-size: 20px; color: #212121;">(예시) Radio Input Element </h2><div style="display: flex; flex-direction: row; "><story /></div></div>',
    }),
  ],
};

export const Default = () => ({
  components: { BaseRadio },
  template:
    '<BaseRadio name="radio-test" radioId="radio1"><template v-slot:label>Basic Radio</template></BaseRadio>',
});

export const RadioIcon = () => ({
  components: { BaseRadio },
  template:
    '<BaseRadio name="radio-test-icon" radioId="radio2" class="radio--icon"><template v-slot:label><svg-icon class="svg-icon mu-icon-svg" name="app-switcher" aria-hidden="true"></svg-icon><span class="hidden">카드형</span></template></BaseRadio>',
});
