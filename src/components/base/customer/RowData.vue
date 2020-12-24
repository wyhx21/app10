<template>
  <span class="app-data-item_disable" :class="data['deleted'] == 1 ? 'app-data-item_effect' : 'app-data-item_ineffect'">
    {{data['enable']}}
  </span>
  <table width='100%'>
    <tr>
      <td width='30%'>{{data['cusCode']}}</td>
      <td width='55%'>{{data['cusName']}}</td>
      <td rowspan="2"><span class="app-link" @click="gotoDetail()">详情</span></td>
    </tr>
    <tr>
      <td>{{data['linkName']}}</td>
      <td>{{data['mobile']}}</td>
    </tr>
    <tr>
      <td colspan="3"><address class="app-address">{{data['address']}}</address></td>
    </tr>
  </table>
</template>
<script>
import {mapMutations} from 'vuex';
export default {
  props: ['data'],
  methods: {
    ...mapMutations('page/customer',['currentCustomer']),
    gotoDetail() {
      this.currentCustomer(this.data)
      this.$router.push('/base/customerDetail')
    }
  }
}
</script>
<style lang="scss">
  @import '@style/component/base/customer.scss';
</style>