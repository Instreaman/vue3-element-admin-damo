/**
 * Order 订单模块 类型定义
 */

// 分页查询条件 - 基础服务类型
import type { BaseQueryParams } from "@/api/common";

/** Order 订单分页查询参数 - 分页查询*/
export interface OrderQueryParams extends BaseQueryParams {
  /** 订单编号 */
  orderNo?: string;
  /** 门店名称 */
  storeName?: string;
  /** 订单种类 */
  orderType?: string;
  /** 品类 */
  category?: string;
  /** 净重 */
  netWeight?: string;
  /** 始发地 */
  origin?: string;
  /** 目的地 */
  destination?: string;
  /** 账号 */
  account?: string;
  /** 顾客姓名 */
  customerName?: string;
  /** 审核回复 */
  auditReply?: string;
  /** 审核状态 */
  auditStatus?: string;
}

/** 订单分页对象 - 列表查询 */
export interface OrderItem {
  /** 订单ID */
  id?: string;
  /** 订单编号 */
  orderNo?: string;
  /** 门店名称 */
  storeName?: string;
  /** 订单种类 */
  orderType?: string;
  /** 品类 */
  category?: string;
  /** 净重 */
  netWeight?: string;
  /** 始发地 */
  origin?: string;
  /** 目的地 */
  destination?: string;
  /** 账号 */
  account?: string;
  /** 顾客姓名 */
  customerName?: string;
  /** 审核回复 */
  auditReply?: string;
  /** 审核状态 */
  auditStatus?: string;
}

/** 订单表单对象 - 新增/修改 */
export interface OrderForm {
  /** 订单ID */
  id?: string;
  /** 订单编号 */
  orderNo?: string;
  /** 门店名称 */
  storeName?: string;
  /** 订单种类 */
  orderType?: string;
  /** 品类 */
  category?: string;
  /** 净重 */
  netWeight?: string;
  /** 始发地 */
  origin?: string;
  /** 目的地 */
  destination?: string;
  /** 账号 */
  account?: string;
  /** 顾客姓名 */
  customerName?: string;
  /** 审核回复 */
  auditReply?: string;
  /** 审核状态 */
  auditStatus?: string;
}
