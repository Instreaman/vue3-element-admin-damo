/**
 * Order 订单模块 类型定义
 */

// 分页查询条件 - 基础服务类型
import type { BaseQueryParams } from "@/api/common";

/** Order 订单分页查询参数 - 分页查询*/
export interface OrderQueryParams extends BaseQueryParams {
  /** 搜索关键字 */
  name?: string;
}

/** 订单分页对象 - 列表查询 */
export interface OrderItem {
  /** 订单ID */
  id?: string;
  /** 订单编码 */
  code?: string;
  /** 订单名称 */
  name?: string;
  /** 创建时间 */
  createTime?: Date;
  /** 修改时间 */
  updateTime?: Date;
}

/** 订单表单对象 - 新增/修改 */
export interface OrderForm {
  /** 角色ID */
  id?: string;
  /** 订单编码 */
  code?: string;
  /** 订单名称 */
  name?: string;
  /** 创建时间 */
  createTime?: Date;
  /** 修改时间 */
  updateTime?: Date;
  /** 自定义数据权限部门ID列表(当dataScope=5时有效) */
  // deptIds?: string[];
}
