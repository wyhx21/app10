<template>
  <div
    v-if="modelValue.length < 1"
    class="app-data-placeholder"
    @click="showKeyboard = true"
    :class="$attrs.class"
  >
    {{ placeholder }}
  </div>
  <div v-else @click="showKeyboard = true" :class="$attrs.class">
    <span class="app-com-munber-num">{{ modelValue }}</span>
    <span class="app-com-munber-suffer">{{ suffer }}</span>
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
    modelValue: {
      default: ""
    },
    placeholder: {
      default: "请输入数值"
    },
    disabled: {
      default: true
    },
    suffer: {
      default: ""
    }
  },
  data() {
    return {
      showKeyboard: false
    };
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
