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
            name: "中国航空飞机订单",
            code: "C000001",
            createTime: "2021-03-25 12:39:54",
            updateTime: "2021-03-25 12:39:54",
          },
          {
            id: "2",
            name: "中国航空飞机订单2",
            code: "C000002",
            createTime: "2021-03-25 12:39:54",
            updateTime: "2021-03-25 12:39:54",
          },
          {
            id: "3",
            name: "中国航空飞机订单3",
            code: "C000003",
            createTime: "2021-03-25 12:39:54",
            updateTime: "2021-03-25 12:39:54",
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
    name: "中国航空飞机订单",
    code: "C000001",
    createTime: "2021-03-25 12:39:54",
    updateTime: "2021-03-25 12:39:54",
  },
  2: {
    id: "2",
    name: "中国航空飞机订单2",
    code: "C000002",
    createTime: "2021-03-25 12:39:54",
    updateTime: "2021-03-25 12:39:54",
  },
  3: {
    id: "3",
    name: "中国航空飞机订单3",
    code: "C000003",
    createTime: "2021-03-25 12:39:54",
    updateTime: "2021-03-25 12:39:54",
  },
};
