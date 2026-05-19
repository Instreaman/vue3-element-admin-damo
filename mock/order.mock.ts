// 1. 引入 defineMock 定义Mock函数
import { defineMock } from "./base";
// 2. 导出 自定义Mock
export default defineMock([
  // 新增订单
  {
    url: "orders",
    method: ["POST"],
    body({ body }) {
      return {
        code: "00000",
        data: null,
        msg: "新增订单" + body.name + "成功",
      };
    },
  },

  // 获取订单数据 - 填充到编辑表单
  {
    url: "orders/:id",
    method: ["GET"],
    body: ({ params }) => {
      return {
        code: "00000",
        data: orderMap[params.id],
        msg: "一切ok",
      };
    },
  },
  // 修改角色
  {
    url: "orders",
    method: ["PUT"],
    body({ body }) {
      return {
        code: "00000",
        data: null,
        msg: "修改订单" + body.id + "成功",
      };
    },
  },

  // 删除订单
  {
    url: "orders/:id",
    method: ["DELETE"],
    body({ params }) {
      return {
        code: "00000",
        data: null,
        msg: "删除订单" + params.id + "成功",
      };
    },
  },
  // 订单管理模块 分页查询
  {
    url: "orders",
    method: ["GET"],
    body: {
      code: "00000",
      data: {
        list: [
          {
            id: "1",
            orderNo: "NO20240519001",
            storeName: "华北直营店",
            orderType: "零售",
            category: "生鲜",
            netWeight: "12.5kg",
            origin: "北京",
            destination: "上海",
            account: "store_hb_01",
            customerName: "张三",
            auditReply: "信息完整，准予通过",
            auditStatus: "已通过",
          },
          {
            id: "2",
            orderNo: "NO20240519002",
            storeName: "华东旗舰店",
            orderType: "批发",
            category: "冻品",
            netWeight: "30kg",
            origin: "南京",
            destination: "杭州",
            account: "store_hd_02",
            customerName: "李四",
            auditReply: "缺少质检附件",
            auditStatus: "审核中",
          },
          {
            id: "3",
            orderNo: "NO20240519003",
            storeName: "华南直营网点",
            orderType: "零售",
            category: "干货",
            netWeight: "8kg",
            origin: "深圳",
            destination: "广州",
            account: "store_hn_03",
            customerName: "王五",
            auditReply: "信息不完整，请补充",
            auditStatus: "已驳回",
          },
        ],
        total: 3,
      },
      msg: "一切ok",
    },
  },
]);

const orderMap: Record<string, any> = {
  1: {
    id: "1",
    orderNo: "NO20240519001",
    storeName: "华北直营店",
    orderType: "零售",
    category: "生鲜",
    netWeight: "12.5kg",
    origin: "北京",
    destination: "上海",
    account: "store_hb_01",
    customerName: "张三",
    auditReply: "信息完整，准予通过",
    auditStatus: "已通过",
  },
  2: {
    id: "2",
    orderNo: "NO20240519002",
    storeName: "华东旗舰店",
    orderType: "批发",
    category: "冻品",
    netWeight: "30kg",
    origin: "南京",
    destination: "杭州",
    account: "store_hd_02",
    customerName: "李四",
    auditReply: "缺少质检附件",
    auditStatus: "审核中",
  },
  3: {
    id: "3",
    orderNo: "NO20240519003",
    storeName: "华南直营网点",
    orderType: "零售",
    category: "干货",
    netWeight: "8kg",
    origin: "深圳",
    destination: "广州",
    account: "store_hn_03",
    customerName: "王五",
    auditReply: "信息不完整，请补充",
    auditStatus: "已驳回",
  },
};
