<template>
  <div>
    <span class="app-store-code">{{ data["areaCode"] }}</span>
    <span>{{ data["areaName"] }}</span>
  </div>
  <div>
    <p class="app-data-item_thin">备注:{{ data["remark"] }}</p>
  </div>

  <span
    class="app-store-enable"
    :class="
      data['deleted'] == 1
        ? 'app-store-enable_effect'
        : 'app-store-enable_ineffect'
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
