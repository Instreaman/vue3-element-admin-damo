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
    body: ({ query }) => {
      const list = trackList.filter((item) => {
        if (query?.trackingNo && item.trackingNo !== query.trackingNo) return false;
        if (query?.status && !item.status?.includes(query.status)) return false;
        if (query?.carrier && !item.carrier?.includes(query.carrier)) return false;
        return true;
      });

      return {
        code: "00000",
        data: {
          list,
          total: list.length,
        },
        msg: "一切ok",
      };
    },
  },
]);

const trackList = [
  {
    id: "1",
    trackingNo: "NO20240519001",
    carrier: "快件已揽收，正在分拣",
    status: "已揽收",
    updateTime: "2024-05-19 08:12:34",
  },
  {
    id: "2",
    trackingNo: "NO20240519001",
    carrier: "快件已到达【北京转运中心】",
    status: "运输中",
    updateTime: "2024-05-19 10:12:34",
  },
  {
    id: "3",
    trackingNo: "NO20240519001",
    carrier: "快件已发往【上海转运中心】",
    status: "运输中",
    updateTime: "2024-05-19 14:22:10",
  },
  {
    id: "4",
    trackingNo: "NO20240519002",
    carrier: "快件已揽收，等待揽运",
    status: "已揽收",
    updateTime: "2024-05-19 09:05:18",
  },
  {
    id: "5",
    trackingNo: "NO20240519002",
    carrier: "快件已到达【南京中转仓】",
    status: "运输中",
    updateTime: "2024-05-19 12:35:40",
  },
  {
    id: "6",
    trackingNo: "NO20240519002",
    carrier: "快件已签收，感谢使用",
    status: "已签收",
    updateTime: "2024-05-19 18:08:10",
  },
  {
    id: "7",
    trackingNo: "NO20240519003",
    carrier: "快件已揽收，等待转运",
    status: "已揽收",
    updateTime: "2024-05-19 07:45:20",
  },
  {
    id: "8",
    trackingNo: "NO20240519003",
    carrier: "快件运输异常，请联系网点",
    status: "异常",
    updateTime: "2024-05-19 15:10:55",
  },
];

const trackMap: Record<string, any> = trackList.reduce(
  (acc, item) => {
    acc[item.id] = item;
    return acc;
  },
  {} as Record<string, any>
);
