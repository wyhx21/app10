<template>
  <div
    v-if="modelValue.length < 1"
    class="app-fiance-num app-data-placeholder"
    @click="showKeyboard = true"
  >
    {{ placeholder }}
  </div>
  <div class="app-fiance-num" v-else @click="showKeyboard = true">
    <span class="app-fiance_currency">{{ currency }}</span>
    <span class="app_fiance_integer">{{ numInteger }}</span>
    <span>.</span>
    <span class="app_fiance_decimal">{{ numDecimal }}</span>
  </div>

  <van-number-keyboard
    v-if="disabled"
    :show="showKeyboard"
    theme="custom"
    extra-key="."
    :title="`${placeholder}:${modelValue}`"
    close-button-text="完成"
    @blur="showKeyboard = false"
    @input="onInput"
    @delete="onDelete"
  />
</template>
<script>
export default {
  props: {
    currency: {
      default: "¥"
    },
    modelValue: {
      default: ""
    },
    placeholder: {
      default: "请输入金额"
    },
    disabled: {
      default: true
    }
  },
  data() {
    return {
      showKeyboard: false
    };
  },
  computed: {
    numInteger() {
      return `${this.modelValue}.00`.split(/\./g)[0];
    },
    numDecimal() {
      const dec = `${this.modelValue}.00`.split(/\./g)[1].padEnd(2, "00");
      if (dec.length > 4) {
        return dec.substring(0, 4);
      }
      return dec;
    }
  },
  methods: {
    setValue(val) {
      this.$emit("update:modelValue", val);
    },
    onInput(val) {
      if (!this.modelValue && this.modelValue != 0) {
        this.setValue(val);
        return;
      }
      if ("." == val) {
        const len = [...`${this.modelValue}`].filter(o => o == val).length;
        if (len > 0) {
          return;
        }
      }
      this.setValue(`${this.modelValue}${val}`);
    },
    onDelete() {
      if (!this.modelValue) {
        this.setValue("");
        return;
      }
      const len = `${this.modelValue}`.length;
      const val = `${this.modelValue}`.substring(0, len - 1);
      this.setValue(val);
    }
  }
};
</script>
<style lang="scss">
@import "@style/component/common/component.scss";
</style>
