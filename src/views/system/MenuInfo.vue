<template>
  <div>
    <div v-for="item1 of roleMenu" :key="item1['id']">
      <van-divider :style="style.divider" dashed>{{
        item1.menuName
      }}</van-divider>
      <div v-for="item2 of item1['children']" :key="item2['id']">
        <p class="app-data-item_remark">{{ item2["menuName"] }}</p>
        <van-grid :column-num="3" :gutter="10">
          <van-grid-item
            v-for="item3 of item2['children']"
            :key="item3['id']"
            :icon="item3['menuIcon']"
            :text="item3['menuName']"
            :to="item3['menuUrl']"
          />
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters("userRoleAuth", ["roleMenu"])
  },
  data() {
    return {
      style: {
        divider: {
          color: "#ccc",
          borderColor: "#ccc",
          fontSize: ".9em"
        }
      }
    };
  },
  mounted() {
    this.purchaseOrderParam();
    this.persistSupplier();
    this.purchaseProductList();
    this.persistCustomer();
    this.saleProductList();
  },
  methods: {
    ...mapMutations("appOrder/purchaseOrder", {
      purchaseOrderParam: "queryParam"
    }),
    ...mapMutations("appOrder/purchaseOrder", {
      persistSupplier: "persistSupplier",
      purchaseProductList: "persistProductList"
    }),
    ...mapMutations("appOrder/saleOrder", {
      persistCustomer: "persistCustomer",
      saleProductList: "persistProductList"
    })
  }
};
</script>
