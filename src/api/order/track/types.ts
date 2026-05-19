/**
 * Track 订单跟踪模块 类型定义
 */

// 分页查询条件 - 基础服务类型
import type { BaseQueryParams } from "@/api/common";

/** Track 订单跟踪分页查询参数 - 分页查询 */
export interface TrackQueryParams extends BaseQueryParams {
  /** 运单号 */
  trackingNo?: string;
  /** 承运商 */
  carrier?: string;
  /** 当前状态 */
  status?: string;
}

/** 订单跟踪分页对象 - 列表查询 */
export interface TrackItem {
  /** 记录ID */
  id?: string;
  /** 运单号 */
  trackingNo?: string;
  /** 承运商 */
  carrier?: string;
  /** 当前状态 */
  status?: string;
  /** 更新时间 */
  updateTime?: Date;
}

/** 订单跟踪表单对象 - 新增/修改 */
export interface TrackForm {
  /** 记录ID */
  id?: string;
  /** 运单号 */
  trackingNo?: string;
  /** 承运商 */
  carrier?: string;
  /** 当前状态 */
  status?: string;
  /** 更新时间 */
  updateTime?: Date;
}
