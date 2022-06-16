import BaseButton from "./base-button.vue";

export default {
  title: 'Styled/Atoms/[PCFC] 버튼',
  component: BaseButton,
  decorators: [
    () => ({
      template:
        '<div style="margin: 1em;"><h2 style="margin-bottom: 20px; font-size: 20px; color: #212121;">(예시) Button Element </h2><div style="display: flex; flex-direction: row; "><story /></div></div>',
    }),
  ],
  argTypes: {
    buttonType: {
      control: {
        type: "select",
        options: ["button", "icon"],
      },
      defaultValue: "button",
    },
    theme: {
      control: {
        type: "select",
        options: ["primary", "second", "support", "negative"],
      },
      defaultValue: "primary",
    },
    size: {
      control: {
        type: "select",
        options: ["sm", "md", "lg"],
      },
      defaultValue: "sm",
    },
  },
};

export const Default = () => ({
  components: { BaseButton },
  template:
    '<BaseButton class="button--negative" title="Button Default"><span class="button__text">Button - Default</span> </BaseButton>',
});


export const ButtonSmall = () => ({
  components: { BaseButton },
  template:
    '<BaseButton class="button--sm button--tertiary" title="Button Sample"><span class="button__text">Button - small</span> </BaseButton>',
});

export const ButtonLarge = () => ({
  components: { BaseButton },
  template:
    '<BaseButton class="button--lg button--primary" submitId="submit-1"><span class="button__text">Button - Large</span> </BaseButton>',
});
