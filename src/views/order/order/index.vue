<template>
  <div class="page-container">
    <page-search
      ref="searchRef"
      :search-config="searchConfig"
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />

    <page-content
      ref="contentRef"
      :content-config="contentConfig"
      @add-click="handleAdd"
      @operate-click="handleOperateClick"
      @search-click="handleSearchClick"
      @filter-change="handleFilterChange"
    >
      <template #statusSlot="scope">
        <el-tag :type="resolveStatusType(scope.row[scope.prop])">
          {{ scope.row[scope.prop] || "-" }}
        </el-tag>
      </template>
    </page-content>

    <page-modal ref="addModalRef" :modal-config="modalConfig" @submit-click="handleSubmitClick" />
    <page-modal ref="editModalRef" :modal-config="modalConfig" @submit-click="handleSubmitClick" />
  </div>
</template>

<script setup lang="ts">
import OrderAPI from "@/api/order/order";
import type { IObject } from "@/components/CURD/types";
import usePage from "@/components/CURD/usePage";
import { useRouter } from "vue-router";
import contentConfig from "./config/content";
import modalConfig from "./config/modal";
import searchConfig from "./config/search";

const {
  searchRef,
  contentRef,
  addModalRef,
  editModalRef,
  handleQueryClick,
  handleResetClick,
  handleAddClick,
  handleEditClick,
  handleSubmitClick,
  handleSearchClick,
  handleFilterChange,
} = usePage();

const router = useRouter();

function resolveStatusType(status?: string): "success" | "warning" | "danger" | "info" {
  if (status === "已通过") return "success";
  if (status === "审核中") return "warning";
  if (status === "已驳回") return "danger";
  return "info";
}

function setModalMode(mode: "add" | "edit"): void {
  if (mode === "add") {
    modalConfig.dialog = { ...modalConfig.dialog, title: "新增订单信息" };
    modalConfig.formAction = OrderAPI.create;
    return;
  }
  modalConfig.dialog = { ...modalConfig.dialog, title: "修改订单信息" };
  modalConfig.formAction = OrderAPI.update;
}

function handleAdd(): void {
  setModalMode("add");
  handleAddClick();
}

const handleOperateClick = (data: IObject) => {
  if (data.name === "track") {
    const orderNo = data.row?.orderNo;
    if (!orderNo) {
      ElMessage.warning("订单编号为空，无法查看物流");
      return;
    }
    router.push({ path: "/order/track", query: { orderNo } });
    return;
  }
  if (data.name === "edit") {
    setModalMode("edit");
    handleEditClick(data.row, async () => OrderAPI.getFormData(data.row.id));
    return;
  }
  if (data.name === "delete") {
    ElMessageBox.confirm("确认删除该订单信息?", "警告", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(
      () => {
        OrderAPI.deleteByIds(String(data.row.id)).then(() => {
          ElMessage.success("删除成功");
          handleSubmitClick();
        });
      },
      () => {
        ElMessage.info("已取消删除");
      }
    );
  }
};

onMounted(() => {
  setModalMode("add");
});
</script>
