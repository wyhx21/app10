<template>
  <van-form @submit="onSubmit" class="app-param-form">
    <van-divider dashed :style="dividerStyle">选择仓库</van-divider>
    <van-dropdown-menu>
      <van-dropdown-item
        :model-value="storeId"
        @update:modelValue="selectStore"
        :options="allStoreList"
      />
    </van-dropdown-menu>

    <van-divider dashed :style="dividerStyle">选择区域</van-divider>
    <van-dropdown-menu>
      <van-dropdown-item
        :model-value="areaId"
        @update:modelValue="selectAreaId"
        :options="allStroeAreaList"
      />
    </van-dropdown-menu>

    <van-divider dashed :style="dividerStyle">商品编码</van-divider>
    <van-field
      v-model="prodCode"
      name="prodCode"
      placeholder="商品编码"
      clearable
    />

    <div class="app-button">
      <van-button block plain type="primary" @click="resetParam"
        >重置</van-button
      >
      <van-button block type="primary" native-type="submit">提交</van-button>
    </div>
  </van-form>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters("appStore/storeAreaParam", [
      "allStoreList",
      "allStroeAreaList",
      "storeId",
      "areaId"
    ]),
    ...mapGetters("page", ["dividerStyle"])
  },
  data() {
    return {
      prodCode: ""
    };
  },
  beforeMount() {
    this.querySysStore(true);
  },
  methods: {
    ...mapMutations("appStore/storeAreaParam", ["selectAreaId"]),
    ...mapActions("appStore/storeAreaParam", ["querySysStore", "selectStore"]),
    ...mapMutations("appStore/storeProd", ["queryParam"]),
    onSubmit() {
      const param = {
        areaId: this.areaId,
        storeId: this.storeId,
        prodCode: this.prodCode
      };
      this.queryParam(param);
      this.$emit("refreshData");
    },
    resetParam() {
      this.prodCode = "";
      this.selectStore();
      this.queryParam();
    }
  }
};
</script>
