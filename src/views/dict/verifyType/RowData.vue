<template>
  <span
    class="app-data-item_deleted"
    :class="
      data['deleted'] == 1
        ? 'app-data-item_deleted_1'
        : 'app-data-item_deleted_0'
    "
  >
    {{ data["enable"] }}
  </span>
  <table width="100%">
    <tr>
      <td width="40%">
        <span class="app-data-item_primary">{{ data["dicKey"] }}</span>
      </td>
      <td width="40%">
        <span class="app-data-item_primary">{{ data["dicValue"] }}</span>
      </td>
      <td>
        <span class="app-link" @click="gotoDetail()">详情</span>
      </td>
    </tr>
  </table>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  props: ["data"],
  methods: {
    ...mapMutations("appDict/verifyType", ["currentData"]),
    gotoDetail() {
      this.currentData(this.data);
      this.$router.push("/dict/verifyTypeDetail");
    }
  }
};
</script>
