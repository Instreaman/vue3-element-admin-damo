<template>
  <div class="page-container">
    <el-card class="page-search" shadow="never">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
        <el-form-item prop="trackingNo" label="运单号">
          <el-input
            v-model="queryParams.trackingNo"
            placeholder="运单号"
            clearable
            @keyup.enter="handleQuery"
          />
        </el-form-item>

        <el-form-item prop="carrier" label="承运商">
          <el-input
            v-model="queryParams.carrier"
            placeholder="承运商"
            clearable
            @keyup.enter="handleQuery"
          />
        </el-form-item>

        <el-form-item prop="status" label="状态">
          <el-input
            v-model="queryParams.status"
            placeholder="当前状态"
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
          <el-button type="success" icon="plus" @click="handleCreateClick()">新增日志</el-button>
          <el-button icon="refresh" @click="handleQuery">刷新</el-button>
        </div>
      </div>
      <div v-loading="loading" class="track-timeline">
        <el-timeline v-if="timelineList.length > 0">
          <el-timeline-item
            v-for="item in timelineList"
            :key="item.id"
            :timestamp="formatTime(item.updateTime)"
            :type="resolveNodeType(item.status)"
            placement="top"
          >
            <el-card shadow="hover">
              <div class="track-card__title">{{ item.status || "状态未知" }}</div>
              <div class="track-card__line">物流信息：{{ item.carrier || "暂无" }}</div>
              <div class="track-card__line">运单号：{{ item.trackingNo || "-" }}</div>
              <div class="track-card__line">操作员：系统</div>
            </el-card>
          </el-timeline-item>
        </el-timeline>
        <el-empty v-else description="暂无跟踪记录" />
      </div>
      <!-- 分页组件 total、page、limit、@pagination分页事件 - 调用分页查询方法-->
      <pagination
        v-if="total > 0"
        v-model:total="total"
        v-model:page="queryParams.pageNum"
        v-model:limit="queryParams.pageSize"
        @pagination="fetchList"
      />
    </el-card>

    <!-- 新增跟踪日志弹窗 -->
    <el-dialog
      v-model="dialogState.visible"
      :title="dialogState.title"
      width="600px"
      @close="closeDialog"
    >
      <el-form ref="logFormRef" :model="logForm" :rules="rules" label-width="100px">
        <el-form-item label="状态" prop="status">
          <el-input v-model="logForm.status" placeholder="请输入状态" />
        </el-form-item>

        <el-form-item label="描述" prop="description">
          <el-input
            v-model="logForm.description"
            type="textarea"
            :rows="3"
            placeholder="例如：快件已到达【北京转运中心】"
          />
        </el-form-item>

        <el-form-item label="时间" prop="updateTime">
          <el-date-picker
            v-model="logForm.updateTime"
            type="datetime"
            placeholder="请选择时间"
            style="width: 100%"
          />
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
// 引入 订单跟踪模块 API对象
import TrackAPI from "@/api/order/track";
// 引入 订单跟踪模块 数据封装对象
import { TrackItem, TrackQueryParams, TrackForm } from "@/api/order/track";

// 表格组件加载数据动态特效开关
const loading = ref(false);
// 总记录数
const total = ref(0);
// 分页查询对象
const queryParams = reactive<TrackQueryParams>({
  pageNum: 1,
  pageSize: 10,
});

// 订单跟踪数据列表
const trackList = ref<TrackItem[]>();
// 查询表单
const queryFormRef = ref();
const timelineList = computed(() => {
  const list = trackList.value ?? [];
  return [...list].sort((a, b) => toTimeValue(b.updateTime) - toTimeValue(a.updateTime));
});

function toTimeValue(value?: Date | string): number {
  if (!value) return 0;
  if (value instanceof Date) return value.getTime();
  const time = Date.parse(value);
  return Number.isNaN(time) ? 0 : time;
}

function formatTime(value?: Date | string): string {
  if (!value) return "";
  if (value instanceof Date) return value.toLocaleString();
  return String(value);
}

function resolveNodeType(status?: string): "primary" | "success" | "info" | "warning" | "danger" {
  if (!status) return "info";
  if (status.includes("已签收")) return "success";
  if (status.includes("运输中")) return "primary";
  if (status.includes("已揽收")) return "info";
  if (status.includes("异常") || status.includes("问题")) return "danger";
  return "warning";
}
/**
 * 加载订单跟踪列表数据
 */
async function fetchList(): Promise<void> {
  // 开启加载数据动画特效
  loading.value = true;
  try {
    // 调用  TrackAPI 获取 分页数据
    const data = await TrackAPI.getPage(queryParams);
    // 从结果集 data 中获取  结果集 list 进行赋值
    trackList.value = data.list;
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

// 新增日志表单
const logFormRef = ref();

// 弹窗
const dialogState = reactive({
  title: "",
  visible: false, // 弹出窗口 false ： 默认为隐藏
});

const initialForm = (): TrackForm => ({
  id: undefined,
  trackingNo: undefined,
  carrier: undefined,
  status: undefined,
  updateTime: undefined,
});

type LogForm = {
  status?: string;
  description?: string;
  updateTime?: Date;
};

const initialLogForm = (): LogForm => ({
  status: undefined,
  description: undefined,
  updateTime: undefined,
});

const logForm = reactive<LogForm>(initialLogForm());
// 订单跟踪表单的校验规则
const rules = reactive({
  status: [{ required: true, message: "请输入状态", trigger: "blur" }],
  description: [{ required: true, message: "请输入描述", trigger: "blur" }],
  updateTime: [{ required: true, message: "请选择时间", trigger: "change" }],
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
  logFormRef.value?.resetFields();
  logFormRef.value?.clearValidate();
  Object.assign(logForm, initialLogForm());
}

/**
 * 新增按钮点击事件
 */
async function handleCreateClick(): Promise<void> {
  dialogState.title = "新增跟踪日志";
  openDialog();
}

// 提交订单跟踪表单
async function handleSubmit(): Promise<void> {
  if (!queryParams.trackingNo) {
    ElMessage.warning("请先输入运单号后再新增日志");
    return;
  }

  const valid = await logFormRef.value?.validate().then(
    () => true,
    () => false
  );
  if (!valid) return;

  const submitData: TrackForm = {
    ...initialForm(),
    trackingNo: queryParams.trackingNo,
    carrier: logForm.description,
    status: logForm.status,
    updateTime: logForm.updateTime,
  };
  loading.value = true;
  try {
    await TrackAPI.create(submitData);
    ElMessage.success("新增成功");
    closeDialog();
    handleResetQuery();
  } finally {
    loading.value = false;
  }
}

// 组件挂载后 重置查询条件为第一页 并且 加载订单跟踪列表数据
onMounted(() => {
  handleQuery();
});
</script>
