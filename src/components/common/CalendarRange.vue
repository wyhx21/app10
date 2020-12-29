<template>
  <div @click="showCalendar = true" v-if="hasValue" class="app-date-range">
    <span>{{ modelValue[0] }}</span>
    <span style="max-width:30px">{{ separator }}</span>
    <span>{{ modelValue[1] }}</span>
  </div>
  <div
    @click="showCalendar = true"
    class="app-date-range app-data-placeholder"
    v-else
  >
    <span>{{ placeholder[0] }}</span>
    <span style="max-width:30px">{{ separator }}</span>
    <span>{{ placeholder[1] }}</span>
  </div>
  <van-calendar
    v-model:show="showCalendar"
    type="range"
    color="#409eff"
    :min-date="minDate"
    :max-date="maxDate"
    @confirm="dataSelect"
  />
</template>
<script>
import { DateUtils } from "yao-dateutils";
export default {
  props: {
    placeholder: {
      default: ["开始时间", "结束时间"]
    },
    modelValue: {
      default: ["", ""]
    },
    separator: {
      default: "-"
    },
    dateRange: {
      default: [-93, 1]
    },
    format: {
      default: "yyyy-MM-dd"
    }
  },
  computed: {
    minDate() {
      return DateUtils.addDay(this.currentDate, this.dateRange[0]);
    },
    maxDate() {
      return DateUtils.addDay(this.currentDate, this.dateRange[1]);
    },
    hasValue() {
      return (
        this.modelValue && this.modelValue[0] && this.modelValue[0].length > 1
      );
    }
  },
  data() {
    return {
      showCalendar: false,
      currentDate: new Date()
    };
  },
  methods: {
    setValue(val) {
      this.$emit("update:modelValue", val);
    },
    dataSelect(val) {
      let [begin, end] = [...val];
      const res = [];
      res[0] = DateUtils.format(begin, this.format);
      res[1] = DateUtils.format(end, this.format);
      this.showCalendar = false;
      this.setValue(res);
    }
  }
};
</script>
<style lang="scss">
@import "@style/component/common/component.scss";
</style>
