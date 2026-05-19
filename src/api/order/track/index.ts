// 1. 引入 axios 封装的 request 工具方法
import request from "@/utils/request";
// 2. 引入 Track 订单跟踪模块 定义 的 数据封装类
import { TrackQueryParams, TrackItem, TrackForm } from "./types";

// 3. 声明 订单跟踪模块 请求地址
const TRACK_BASE_URL = "/api/v1/tracks";

// 4. 声明 订单跟踪模块 API对象
const TrackAPI = {
  /** 新增订单跟踪记录 */
  create(data: TrackForm) {
    return request({ url: `${TRACK_BASE_URL}`, method: "post", data });
  },
  /** 获取订单跟踪数据 - 填充编辑表单 */
  getFormData(id: string) {
    return request<any, TrackForm>({ url: `${TRACK_BASE_URL}/${id}`, method: "get" });
  },
  /** 更新订单跟踪记录 */
  update(data: TrackForm) {
    return request({ url: `${TRACK_BASE_URL}`, method: "put", data });
  },

  /** 批量删除订单跟踪，多个id以英文逗号(,)分割 */
  deleteByIds(ids: string) {
    return request({ url: `${TRACK_BASE_URL}/${ids}`, method: "delete" });
  },
  /** 获取订单跟踪分页数据 */
  getPage(queryParams?: TrackQueryParams) {
    return request<any, PageResult<TrackItem>>({
      url: `${TRACK_BASE_URL}`,
      method: "get",
      params: queryParams,
    });
  },
};

// 5. 导出 订单跟踪模块 API对象 TrackAPI
export default TrackAPI;

// 重导出类型
export * from "./types";
