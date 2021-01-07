<template>
  <div>
    <table class="app-data-item-table">
      <tr class="app-data-item_header">
        <td width="50%">
          <span>调出区域</span>
        </td>
        <td>
          <span>调入区域</span>
        </td>
      </tr>
      <tr>
        <td>
          <van-dropdown-menu>
            <van-dropdown-item
              :model-value="data['sourceAreaId']"
              @update:modelValue="selectSourceArea"
              :options="sourceAreaOptions"
            />
          </van-dropdown-menu>
        </td>
        <td>
          <van-dropdown-menu>
            <van-dropdown-item
              :model-value="data['toAreaId']"
              @update:modelValue="selectToArea"
              :options="toAreaOptions"
            />
          </van-dropdown-menu>
        </td>
      </tr>
      <tr class="app-data-item_header">
        <td>
          <span>调出商品</span>
        </td>
        <td>
          <span>调入库存</span>
        </td>
      </tr>
      <tr>
        <td>
          <van-dropdown-menu>
            <van-dropdown-item
              :model-value="data['sourceProdId']"
              @update:modelValue="selectSourceProd"
              :options="data['prodOptions']"
            />
          </van-dropdown-menu>
        </td>
        <td>
          <app-number
            class="app-data-center"
            placeholder="调入库存"
            :model-value="data['toProdNum']"
            :suffer="`(${data['prodUnit']})`"
            disabled
          />
        </td>
      </tr>
      <tr>
        <td>
          <app-number
            class="app-data-center"
            placeholder="调出库存"
            :model-value="data['prodNum']"
            :suffer="`(${data['prodUnit']})`"
            disabled
          />
        </td>
        <td>
          <app-number
            class="app-data-center"
            placeholder="调度数量"
            :model-value="data['dispatchNum']"
            @update:modelValue="selectDispatchNum"
            :suffer="`(${data['prodUnit']})`"
          />
        </td>
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
import { mapMutations, mapGetters, mapActions } from "vuex";
import { Message } from "@utils/messagerUtil.js";
import AppNumber from "@com/common/Number.vue";
export default {
  components: {
    AppNumber
  },
  computed: {
    ...mapGetters("appStore/storeDispatch", [
      "sourceAreaOptions",
      "toAreaOptions"
    ])
  },
  props: ["data"],
  data() {
    return {
      sourceAreaId: ""
    };
  },
  methods: {
    ...mapMutations("appStore/storeDispatch", [
      "deletePersistRowData",
      "sourceProductSelect",
      "dispatchNumSelect"
    ]),
    ...mapActions("appStore/storeDispatch", [
      "sourecAreaSelect",
      "toAreaSelect"
    ]),
    selectSourceArea(sourceAreaId) {
      const { rowId } = this.data;
      this.sourecAreaSelect({ rowId, sourceAreaId })
        .then(() => {})
        .catch(err => {
          Message({ message: err });
        });
    },
    selectSourceProd(sourceProdId) {
      const { rowId } = this.data;
      this.sourceProductSelect({ rowId, sourceProdId });
    },
    selectToArea(toAreaId) {
      // 调出区域
      const { prodId, rowId, sourceProdId } = this.data;
      if (!prodId) {
        Message({ message: "请先选择调出商品" });
        return;
      }
      // 调出区域 调出商品  调出的storeProdId
      this.toAreaSelect({ rowId, prodId, toAreaId, sourceProdId })
        .then(() => {})
        .catch(message => {
          Message({ message });
        });
    },
    selectDispatchNum(dispatchNum) {
      const { rowId } = this.data;
      this.dispatchNumSelect({ rowId, dispatchNum });
    }
  }
};
</script>
