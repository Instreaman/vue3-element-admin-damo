import OrderAPI from "@/api/order/order";
import type { OrderForm } from "@/api/order/order";
import type { IModalConfig } from "@/components/CURD/types";

const modalConfig: IModalConfig<OrderForm> = {
  dialog: {
    title: "新增订单信息",
    width: 800,
    draggable: true,
  },
  form: {
    labelWidth: 100,
  },
  formAction: OrderAPI.create,
  formItems: [
    {
      label: "订单编号",
      prop: "orderNo",
      rules: [{ required: true, message: "订单编号不能为空", trigger: "blur" }],
      type: "input",
      attrs: {
        placeholder: "请输入订单编号",
      },
      col: { xs: 24, sm: 12 },
    },
    {
      label: "门店名称",
      prop: "storeName",
      type: "input",
      attrs: { placeholder: "请输入门店名称" },
      col: { xs: 24, sm: 12 },
    },
    {
      label: "订单种类",
      prop: "orderType",
      type: "input",
      attrs: { placeholder: "请输入订单种类" },
      col: { xs: 24, sm: 12 },
    },
    {
      label: "品类",
      prop: "category",
      type: "input",
      attrs: { placeholder: "请输入品类" },
      col: { xs: 24, sm: 12 },
    },
    {
      label: "净重",
      prop: "netWeight",
      type: "input",
      attrs: { placeholder: "请输入净重" },
      col: { xs: 24, sm: 12 },
    },
    {
      label: "始发地",
      prop: "origin",
      type: "input",
      attrs: { placeholder: "请输入始发地" },
      col: { xs: 24, sm: 12 },
    },
    {
      label: "目的地",
      prop: "destination",
      type: "input",
      attrs: { placeholder: "请输入目的地" },
      col: { xs: 24, sm: 12 },
    },
    {
      label: "账号",
      prop: "account",
      type: "input",
      attrs: { placeholder: "请输入账号" },
      col: { xs: 24, sm: 12 },
    },
    {
      label: "顾客姓名",
      prop: "customerName",
      type: "input",
      attrs: { placeholder: "请输入顾客姓名" },
      col: { xs: 24, sm: 12 },
    },
    {
      label: "审核回复",
      prop: "auditReply",
      type: "input",
      attrs: { placeholder: "请输入审核回复" },
      col: { xs: 24, sm: 12 },
    },
    {
      label: "审核状态",
      prop: "auditStatus",
      type: "select",
      attrs: { placeholder: "请选择审核状态" },
      options: [
        { label: "已通过", value: "已通过" },
        { label: "审核中", value: "审核中" },
        { label: "已驳回", value: "已驳回" },
      ],
      col: { xs: 24, sm: 12 },
    },
  ],
};

export default reactive(modalConfig);
