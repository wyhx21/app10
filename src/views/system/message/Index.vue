<template>
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
    <van-list
      v-model:loading="listLoading"
      :finished="listFinished"
      :finished-text="finishedText"
      @load="loadList"
    >
      <div
        v-for="data of dataList"
        :key="data['id']"
        class="app-data-item app-messager"
        :class="{ 'app-data-item_cur': data['id'] == currentDataId }"
        @click="currentDataId = data['id']"
      >
        <h4>{{ data["title"] }}</h4>
        <p>{{ data["content"] }}</p>
      </div>
    </van-list>
  </van-pull-refresh>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  components: {},
  computed: {
    ...mapGetters("appDict/message", ["dataList"]),
    ...mapGetters("page", ["finishedText"])
  },
  data() {
    return {
      isLoading: true,
      listLoading: true,
      listFinished: false,
      currentDataId: null
    };
  },
  mounted() {
    this.onRefresh();
  },
  methods: {
    ...mapActions("appDict/message", ["queryPage", "addNextPage"]),
    onRefresh() {
      this.listLoading = true;
      this.queryPage(true)
        .then(res => {
          this.listFinished = !res;
          this.isLoading = false;
          this.listLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
          this.listLoading = false;
        });
    },
    loadList() {
      this.addNextPage()
        .then(res => {
          this.listLoading = false;
          this.listFinished = !res;
        })
        .catch(() => {
          this.listLoading = false;
        });
    }
  }
};
</script>
<style lang="scss">
@import "@style/component/system/messager.scss";
</style>
