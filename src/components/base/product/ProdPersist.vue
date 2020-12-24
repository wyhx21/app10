<template>
  <app-page-container>
    
    <van-form class="app-data-detail">
      <van-field name="prodCode" v-model="prodRow['prodCode']" label="商品编码"/>
      <van-field v-model="prodRow['prodName']" name="prodName" label="商品名称"/>
      <van-field name="prodType" label="商品类型">
        <template #input>
          <van-dropdown-menu>
            <van-dropdown-item v-model="prodRow['prodType']" :options="prodTypes"/>
          </van-dropdown-menu>
        </template>
      </van-field>
      <van-field v-model="prodRow['prodUnit']" name="prodUnit" label="商品单位"/>
      <van-field name="purchPrice" label="采购单价"  @touchstart.stop="purchShow = true; saleShow = false">
        <template #input>
          <div>
            <app-fiance-num :value="prodRow['purchPrice']"/>
            <van-number-keyboard v-model="prodRow['purchPrice']" :show="purchShow" :title="`采购单价:${prodRow['purchPrice']}`" theme="custom"
              extra-key="." close-button-text="完成" @blur="purchShow = false"/>
          </div>
        </template>
      </van-field>
      <van-field name="salePrice" label="销售单价"  @touchstart.stop="saleShow = true; purchShow = false">
        <template #input>
          <div>
            <app-fiance-num :value="prodRow['salePrice']"/>
            <van-number-keyboard v-model="prodRow['salePrice']" :show="saleShow" :title="`销售单价:${prodRow['salePrice']}`" theme="custom"
              extra-key="." close-button-text="完成" @blur="saleShow = false"/>
          </div>
        </template>
      </van-field>
      <van-field name="deleted" label="是否有效">
        <template #input>
          <van-switch v-model="prodRow['deleted']" size="20"/>
        </template>
      </van-field>
      <van-field  v-model="prodRow['remark']"  rows="2"  autosize  label="备注信息"  type="textarea"  maxlength="50"  placeholder="备注信息"
        show-word-limit/>
    </van-form>
    <div class="app-data-editor">
      <span @click="confirmEditor" v-if="perPersist"><van-icon name="more-o" v-if="loading"/>确认</span>
      <span @click="cancelEditor">取消</span>
    </div>
  </app-page-container>
</template>
<script>
import AppPageContainer from '@com/common/PageContainer.vue';
import AppFianceNum from '@com/common/FianceNum.vue';
import { Confirm,Message } from "@utils/messagerUtil.js";
import {mapActions,mapGetters} from 'vuex';
export default {
  components: {
    AppPageContainer,AppFianceNum
  },
  computed: {
    ...mapGetters('page/product',['prodTypes','perPersist']),
  },
  data () {
    return {
      prodRow: {
        id: 0,
        deleted: false,
        purchPrice: '0',
        salePrice: '0'
      },
      saleShow: false,
      purchShow: false,
      loading: false
    }
  },
  methods: {
    ...mapActions('page/product',['prodPersist']),
    confirmEditor(val) {
      if(this.loading == true) {
        Message({message:'请不要重复点击'});
      } else {
        Confirm({message:'确认保存?'}).then(() => {
          this.loading = true;
          this.prodPersist(this.prodRow).then(() => {
            this.$router.replace('/base/product');
            this.loading = false;
          }).catch(() => {
            this.loading = false;
          })
        }).catch(() => {})
      }
    },
    cancelEditor () {
      Confirm({message:'确认取消新增?'}).then(() => {
        this.$router.replace('/base/product')
      }).catch(() => {})
    }
  }
}
</script>