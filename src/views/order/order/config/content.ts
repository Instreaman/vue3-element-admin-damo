import OrderAPI from "@/api/order/order";
import type { OrderItem, OrderQueryParams } from "@/api/order/order";
import type { IContentConfig } from "@/components/CURD/types";

const contentConfig: IContentConfig<OrderQueryParams, OrderItem> & {
  indexColumn: boolean;
  selectionColumn: boolean;
} = {
  indexColumn: true,
  selectionColumn: true,
  table: {
    border: true,
    highlightCurrentRow: true,
  },
  pagination: {
    background: true,
    layout: "prev,pager,next,jumper,total,sizes",
    pageSize: 10,
    pageSizes: [10, 20, 30, 50],
  },
  indexAction(params) {
    return OrderAPI.getPage(params);
  },
  deleteAction: OrderAPI.deleteByIds,
  pk: "id",
  toolbar: ["add", "delete"],
  defaultToolbar: ["refresh", "filter", "search"],
  cols: [
    { type: "selection", width: 50, align: "center" },
    { type: "index", label: "索引", width: 60, align: "center" },
    { label: "订单编号", prop: "orderNo", align: "center", minWidth: 140 },
    { label: "门店名称", prop: "storeName", align: "center", minWidth: 140 },
    { label: "订单种类", prop: "orderType", align: "center", minWidth: 120 },
    { label: "品类", prop: "category", align: "center", minWidth: 120 },
    { label: "净重", prop: "netWeight", align: "center", minWidth: 100 },
    { label: "始发地", prop: "origin", align: "center", minWidth: 120 },
    { label: "目的地", prop: "destination", align: "center", minWidth: 120 },
    { label: "账号", prop: "account", align: "center", minWidth: 120 },
    { label: "顾客姓名", prop: "customerName", align: "center", minWidth: 120 },
    { label: "审核回复", prop: "auditReply", align: "center", minWidth: 160 },
    {
      label: "审核状态",
      prop: "auditStatus",
      align: "center",
      minWidth: 120,
      templet: "custom",
      slotName: "statusSlot",
    },
    {
      label: "操作",
      align: "center",
      fixed: "right",
      width: 200,
      templet: "tool",
      operat: ["edit", "delete"],
    },
  ],
};

export default contentConfig;
