<template>
  <div>
    <span class="app-store-code">{{ data["areaCode"] }}</span>
    <span>{{ data["areaName"] }}</span>
  </div>
  <div>
    <p class="app-data-item_remark">备注:{{ data["remark"] }}</p>
  </div>

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
</template>
<script>
export default {
  props: ["data"]
};
</script>
