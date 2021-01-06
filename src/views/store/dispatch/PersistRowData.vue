<template>
  <div>
    <table class="app-data-item-table">
      <tr>
        <td></td>
      </tr>
    </table>
  </div>

  <div
    class="app-data-item_deleted app-data-item_deleted_1"
    @click="deletePersistRowData(data)"
  >
    <van-icon name="cross" size="15" />
  </div>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("appStore/storeDispatch", [
      "sourceAreaOptions",
      "toAreaOptions"
    ])
  },
  props: ["data"],
  methods: {
    ...mapMutations("appStore/storeDispatch", ["deletePersistRowData"])
  }
};
</script>
