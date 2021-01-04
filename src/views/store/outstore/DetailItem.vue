<template>
  <table width="100%">
    <tr>
      <td width="50%">
        <span>{{ data["prodCode"] }}</span>
      </td>
      <td>
        <span>{{ data["prodName"] }}</span>
      </td>
    </tr>
    <tr>
      <td>
        <span>{{ data["prodUnit"] }}</span>
      </td>
      <td>
        <span>{{ data["prodNum"] }}</span>
      </td>
    </tr>
    <tr>
      <td>
        <van-dropdown-menu>
          <van-dropdown-item
            :model-value="data['areaId']"
            @update:modelValue="updateStoreArea"
            :options="storeAreaList"
          />
        </van-dropdown-menu>
      </td>
      <td>
        <span>{{ data["storeNum"] }}</span>
      </td>
    </tr>
    <tr>
      <td colspan="2">
        <p class="app-data-item_remark">{{ data["remark"] }}</p>
      </td>
    </tr>
  </table>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters("store/outstore", ["storeAreaList"])
  },
  props: {
    data: {
      default: {}
    }
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions("store/outstore", ["selectStoreArea"]),
    updateStoreArea(areaId) {
      const id = this.data["id"];
      this.selectStoreArea({ id, areaId });
    }
  }
};
</script>
