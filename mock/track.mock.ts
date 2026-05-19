// 1. 引入 defineMock 定义Mock函数
import { defineMock } from "./base";
// 2. 导出 自定义Mock
export default defineMock([
  // 新增订单跟踪
  {
    url: "tracks",
    method: ["POST"],
    body({ body }) {
      return {
        code: "00000",
        data: null,
        msg: "新增订单跟踪" + body.trackingNo + "成功",
      };
    },
  },

  // 获取订单跟踪数据 - 填充到编辑表单
  {
    url: "tracks/:id",
    method: ["GET"],
    body: ({ params }) => {
      return {
        code: "00000",
        data: trackMap[params.id],
        msg: "一切ok",
      };
    },
  },
  // 修改订单跟踪
  {
    url: "tracks",
    method: ["PUT"],
    body({ body }) {
      return {
        code: "00000",
        data: null,
        msg: "修改订单跟踪" + body.id + "成功",
      };
    },
  },

  // 删除订单跟踪
  {
    url: "tracks/:id",
    method: ["DELETE"],
    body({ params }) {
      return {
        code: "00000",
        data: null,
        msg: "删除订单跟踪" + params.id + "成功",
      };
    },
  },
  // 订单跟踪模块 分页查询
  {
    url: "tracks",
    method: ["GET"],
    body: {
      code: "00000",
      data: {
        list: [
          {
            id: "1",
            trackingNo: "YT20240519001",
            carrier: "顺丰速运",
            status: "运输中",
            updateTime: "2024-05-19 10:12:34",
          },
          {
            id: "2",
            trackingNo: "YT20240519002",
            carrier: "中通快递",
            status: "已签收",
            updateTime: "2024-05-19 11:08:10",
          },
          {
            id: "3",
            trackingNo: "YT20240519003",
            carrier: "圆通快递",
            status: "待揽收",
            updateTime: "2024-05-19 12:45:20",
          },
        ],
        total: 3,
      },
      msg: "一切ok",
    },
  },
]);

const trackMap: Record<string, any> = {
  1: {
    id: "1",
    trackingNo: "YT20240519001",
    carrier: "顺丰速运",
    status: "运输中",
    updateTime: "2024-05-19 10:12:34",
  },
  2: {
    id: "2",
    trackingNo: "YT20240519002",
    carrier: "中通快递",
    status: "已签收",
    updateTime: "2024-05-19 11:08:10",
  },
  3: {
    id: "3",
    trackingNo: "YT20240519003",
    carrier: "圆通快递",
    status: "待揽收",
    updateTime: "2024-05-19 12:45:20",
  },
};
