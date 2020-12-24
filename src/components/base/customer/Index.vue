<template>
  <app-page-container>
    <div class="app-data-search">
      <span class="app-link" @click="showQueryInfo">筛选</span>
      <span class="app-link" @click="persistData" v-if="perPersist">新增</span>
    </div>

    <div class="app-data-container">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list v-model:loading="listLoading" :finished="listFinished" :finished-text="finishedText" @load="loadList" >
          <div v-for="cus of customerList" :key="cus['id']" class="app-data-item" 
          :class="{'app-data-item_cur': cus['id'] == currentDataId}" @click="currentDataId = cus['id']">
            <app-row-data :data='cus'/>
          </div>
        </van-list>
      </van-pull-refresh>
    </div>
    <van-popup v-model:show="queryInfoShow" position="right" round :style="{ height: '100%',width:'70%'}">
      <app-query-param @refreshData = 'onRefresh'/>
    </van-popup>
  </app-page-container>
</template>
<script>
import {mapActions,mapGetters,mapMutations} from 'vuex';
import AppPageContainer from '@com/common/PageContainer.vue';
import AppQueryParam from './QueryParam.vue';
import AppRowData from './RowData.vue';
export default {
  components: {
    AppPageContainer,AppQueryParam,AppRowData
  },
  computed: {
    ...mapGetters('page/customer',['customerList','perPersist']),
  },
  data() {
    return {
      isLoading:true,
      listLoading: true,
      listFinished: false,
      finishedText: '我也是有底线的...',
      queryInfoShow: false,
      currentDataId: null,
    }
  },
  mounted() {
    this.queryParam()
    this.onRefresh()
  },
  methods: {
    ...mapActions('page/customer',['queryPage','addNextPage']),
    ...mapMutations('page/customer',['queryParam']),
    onRefresh() {
      this.listLoading = true
      this.queryPage(true)
        .then(res => {
          this.queryInfoShow = false
          this.listFinished = !res
          this.isLoading = false
          this.listLoading = false
        })
        .catch(() => {
          this.isLoading = false
          this.listLoading = false
        })
    },
    loadList() {
      this.addNextPage().then(res => {
        this.listLoading = false
        this.listFinished = !res
      }).catch(() => {
        this.listLoading = false
      })
    },
    showQueryInfo () {
      this.queryInfoShow = true
    },
    persistData () {
      this.$router.push('/base/customerPersist')
    }
  }
}
</script>