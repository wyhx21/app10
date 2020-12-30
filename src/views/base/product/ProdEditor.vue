<template>
  <app-page-container>
    <van-form class="app-data-detail">
      <van-field name="prodCode" label="商品编码">
        <template #input>
          <span>{{ prodRow["prodCode"] }}</span>
        </template>
      </van-field>
      <van-field
        v-model="prodRow['prodName']"
        name="prodName"
        label="商品名称"
      />
      <van-field name="prodType" label="商品类型">
        <template #input>
          <van-dropdown-menu>
            <van-dropdown-item
              v-model="prodRow['prodType']"
              :options="prodTypes"
            />
          </van-dropdown-menu>
        </template>
      </van-field>
      <van-field
        v-model="prodRow['prodUnit']"
        name="prodUnit"
        label="商品单位"
      />
      <van-field name="purchPrice" label="采购单价">
        <template #input>
          <app-fiance-num
            v-model="prodRow['purchPrice']"
            placeholder="采购单价"
          />
        </template>
      </van-field>
      <van-field name="salePrice" label="销售单价">
        <template #input>
          <app-fiance-num
            v-model="prodRow['salePrice']"
            placeholder="销售单价"
          />
        </template>
      </van-field>
      <van-field name="deleted" label="是否有效">
        <template #input>
          <van-switch v-model="prodRow['deleted']" size="20" />
        </template>
      </van-field>
      <van-field
        v-model="prodRow['remark']"
        rows="2"
        autosize
        label="备注信息"
        type="textarea"
        maxlength="50"
        placeholder="备注信息"
        show-word-limit
      />
    </van-form>
    <div class="app-bottom-fixed-search-button">
      <span @click="confirmEditor"
        ><van-icon name="more-o" v-if="loading" />确认</span
      >
      <span @click="cancelEditor">取消</span>
    </div>
  </app-page-container>
</template>
<script>
import AppPageContainer from "@com/common/PageContainer.vue";
import AppFianceNum from "@com/common/FianceNum.vue";
import { Confirm, Message } from "@utils/messagerUtil.js";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    AppPageContainer,
    AppFianceNum
  },
  computed: {
    ...mapGetters("page/product", ["currentProduct", "prodTypes"])
  },
  data() {
    return {
      prodRow: {
        purchPrice: "",
        salePrice: ""
      },
      loading: false
    };
  },
  watch: {
    currentProduct: {
      handler(val) {
        this.prodRow = { ...val };
        this.prodRow.deleted = val.deleted == 1;
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions("page/product", ["prodMerge"]),
    confirmEditor() {
      if (this.loading == true) {
        Message({ message: "请不要重复点击" });
      } else {
        Confirm({ message: "确认保存修改?" })
          .then(() => {
            this.loading = true;
            this.prodMerge(this.prodRow)
              .then(() => {
                this.$router.replace("/base/product");
                this.loading = false;
              })
              .catch(() => {
                this.loading = false;
              });
          })
          .catch(() => {});
      }
    },
    cancelEditor() {
      Confirm({ message: "确认取消修改?" })
        .then(() => {
          this.$router.replace("/base/productDetail");
        })
        .catch(() => {});
    }
  }
};
</script>
