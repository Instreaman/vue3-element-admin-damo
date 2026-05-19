// 1. 引入 axios 封装的 request 工具方法
import request from "@/utils/request";
// 2. 引入 Order 订单模块 定义 的 数据封装类
import { OrderQueryParams, OrderItem, OrderForm } from "./types";

// 3. 声明 订单管理模块 请求地址
const ORDER_BASE_URL = "/api/v1/orders";

// 3. 声明 订单管理模块 API对象
const OrderAPI = {
  /** 新增订单 */
  create(data: OrderForm) {
    return request({ url: `${ORDER_BASE_URL}`, method: "post", data });
  },
  /** 获取订单数据 - 填充编辑表单 */
  getFormData(id: string) {
    return request<any, OrderForm>({ url: `${ORDER_BASE_URL}/${id}`, method: "get" });
  },
  /** 更新订单 */
  update(data: OrderForm) {
    return request({ url: `${ORDER_BASE_URL}`, method: "put", data });
  },

  /** 批量删除订单，多个id以英文逗号(,)分割 */
  deleteByIds(ids: string) {
    return request({ url: `${ORDER_BASE_URL}/${ids}`, method: "delete" });
  },
  /** 获取订单分页数据 */
  getPage(queryParams?: OrderQueryParams) {
    return request<any, PageResult<OrderItem>>({
      url: `${ORDER_BASE_URL}`,
      method: "get",
      params: queryParams,
    });
  },
};

// 4. 导出 订单管理模块 API对象 OrderAPI
export default OrderAPI;

// 重导出类型
export * from "./types";
