<template>
  <div class="page-container">
    <el-card class="page-search" shadow="never">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item prop="name" label="订单名称">
          <el-input
            v-model="queryParams.name"
            placeholder="订单名称"
            clearable
            @keyup.enter="handleQuery"
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" icon="search" @click="handleQuery">搜索</el-button>
          <el-button icon="refresh" @click="handleResetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="page-content" shadow="never">
      <div class="page-toolbar">
        <div class="page-toolbar__left">
          <el-button type="success" icon="plus" @click="handleCreateClick()">新增</el-button>
          <el-button
            type="danger"
            :disabled="ids.length === 0"
            icon="delete"
            @click="handleBatchDelete()"
          >
            批量删除
          </el-button>
        </div>
      </div>
      <!-- 
         ref="dataTableRef"
      -->
      <el-table
        v-loading="loading"
        :data="orderList"
        highlight-current-row
        border
        @selection-change="handleSelectionChange"
      >
        <!-- 复选框 -->
        <el-table-column type="selection" width="55" align="center" />
        <!-- 订单业务字段 -->
        <el-table-column label="订单名称" prop="name" min-width="100" />
        <el-table-column label="订单编码" prop="code" width="150" />
        <!-- 系统字段 -->
        <el-table-column label="创建时间" prop="createTime" width="160" />
        <el-table-column label="修改时间" prop="updateTime" width="160" />

        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              link
              icon="edit"
              @click="handleEditClick(scope.row.id)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              size="small"
              link
              icon="delete"
              @click="handleDelete(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 total、page、limit、@pagination分页事件 - 调用分页查询方法-->
      <pagination
        v-if="total > 0"
        v-model:total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="fetchList"
      />
    </el-card>

    <!-- 订单表单弹窗 -->
    <el-dialog
      v-model="dialogState.visible"
      :title="dialogState.title"
      width="600px"
      @close="closeDialog"
    >
      <el-form ref="orderFormRef" :model="formData" :rules="rules" label-width="100px">
        <el-form-item label="订单名称" prop="name">
          <el-input v-model="formData.name" placeholder="请输入订单名称" />
        </el-form-item>

        <el-form-item label="订单编码" prop="code">
          <el-input v-model="formData.code" placeholder="请输入订单编码" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleSubmit">确定</el-button>
          <el-button @click="closeDialog">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
// 引入 订单管理模块 API对象
import OrderAPI from "@/api/order/order";
// 引入 订单管理模块 数据封装对象
import { OrderItem, OrderQueryParams, OrderForm } from "@/api/order/order";

// 表格组件加载数据动态特效开关
const loading = ref(false);
// 总记录数
const total = ref(0);
// 分页查询对象
const queryParams = reactive<OrderQueryParams>({
  pageNum: 1,
  pageSize: 10,
});

// 订单表格数据列表
const orderList = ref<OrderItem[]>();
// 查询表单
const queryFormRef = ref();
/**
 * 加载订单列表数据
 */
async function fetchList(): Promise<void> {
  // 开启加载数据动画特效
  loading.value = true;
  try {
    // 调用  OrderAPI 获取 分页数据
    const data = await OrderAPI.getPage(queryParams);
    // 从结果集 data 中获取  结果集 list 进行赋值
    orderList.value = data.list;
    // 从结果集 data 中获取 总记录数 total 进行赋值
    total.value = data.total ?? 0;
  } finally {
    // 关闭加载数据动画特效
    loading.value = false;
  }
}

// 查询（重置页码后获取数据）
function handleQuery(): void {
  queryParams.pageNum = 1;
  fetchList();
}

/**
 * 重置查询条件
 */
function resetQuery(): void {
  queryFormRef.value?.resetFields();
}

/**
 * 重置查询条件并重新查询
 */
function handleResetQuery(): void {
  resetQuery();
  handleQuery();
}

// 删除一行记录 和 批量删除 功能
const ids = ref<string[]>([]); // 用于保存表格 复选框组件 的选中记录的ids 数组

// 行复选框选中
function handleSelectionChange(selection: OrderItem[]): void {
  ids.value = selection.map((item) => item.id ?? "");
}

// 删除订单
function handleDelete(tempId?: string): void {
  // tempId 有传值 删除1条记录  没有传值 批量删除ids
  const tempIds = tempId ? tempId : ids.value.filter(Boolean).join(",");
  if (!tempIds) {
    ElMessage.warning("请勾选删除项");
    return;
  }

  ElMessageBox.confirm("确认删除已选中的数据项?", "警告", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  }).then(
    () => {
      loading.value = true;
      OrderAPI.deleteByIds(tempIds)
        .then(() => {
          ElMessage.success("删除成功");
          handleResetQuery();
        })
        .finally(() => (loading.value = false));
    },
    () => {
      ElMessage.info("已取消删除");
    }
  );
}

/**
 * 批量删除按钮点击事件
 */
function handleBatchDelete(): void {
  handleDelete();
}

// 编辑订单数据功能：
const orderFormRef = ref();

// 弹窗
const dialogState = reactive({
  title: "",
  visible: false, // 弹出窗口 false ： 默认为隐藏
});

// 订单的表单对象
const formData = reactive<OrderForm>({});
// 订单表单的校验规则
const rules = reactive({
  name: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
  code: [{ required: true, message: "请输入角色编码", trigger: "blur" }],
});

/**
 * 打开表单弹窗
 */
function openDialog(): void {
  dialogState.visible = true;
}

/**
 * 关闭表单弹窗
 */
function closeDialog(): void {
  dialogState.visible = false;
  resetForm();
}

/**
 * 重置表单数据和验证状态
 */
function resetForm(): void {
  // 1.重置orderFormRef 表单所有字段
  orderFormRef.value?.resetFields();
  // 2.重置orderFormRef 表单所有校验
  orderFormRef.value?.clearValidate();

  // 3. 设置 清空业务字段
  formData.id = undefined;
  formData.name = undefined;
  formData.code = undefined;
  formData.createTime = undefined;
  formData.updateTime = undefined;

  // 4. 设置[下拉列表\复选框\单选按钮组] 的默认值
}

/**
 * 新增按钮点击事件
 */
async function handleCreateClick(): Promise<void> {
  dialogState.title = "新增订单";
  openDialog();
}

/**
 * 编辑按钮点击事件
 * @param roleId 角色ID
 */
async function handleEditClick(id: string): Promise<void> {
  // 1. 设置 弹出窗口 的标题
  dialogState.title = "修改订单";
  // 2. 根据当记录行id 查询要修改的订单数据
  const data = await OrderAPI.getFormData(id);
  // 3.复制 修改的行数据 到 表单对象上
  Object.assign(formData, data);
  // 4.打开 弹出窗口
  openDialog();
}

// 提交角色表单
async function handleSubmit(): Promise<void> {
  // 1. 判断表单所有的值是否通过校验
  const valid = await orderFormRef.value?.validate().then(
    () => true,
    () => false
  );
  // 2. 如果没有通过校验 则直接退出提交事件
  if (!valid) return;

  // 3. 如果通过校验 则运行下面代码

  // 3.1 解构 formData 的数据 赋值到 submitData 中
  const submitData = { ...formData };
  loading.value = true;
  try {
    const id = formData.id;
    if (id) {
      await OrderAPI.update(submitData);
      ElMessage.success("修改成功");
    } else {
      await OrderAPI.create(submitData);
      ElMessage.success("新增成功");
    }
    closeDialog();
    handleResetQuery();
  } finally {
    loading.value = false;
  }
}

// 组件挂载后 重置查询条件为第一页 并且 加载订单列表数据
onMounted(() => {
  handleQuery();
});
</script>
