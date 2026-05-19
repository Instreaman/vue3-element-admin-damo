import type { ISearchConfig } from "@/components/CURD/types";

const searchConfig: ISearchConfig = {
  formItems: [
    {
      type: "input",
      label: "订单编号",
      prop: "orderNo",
      attrs: {
        placeholder: "请输入订单编号",
        clearable: true,
        style: { width: "200px" },
      },
    },
    {
      type: "input",
      label: "门店名称",
      prop: "storeName",
      attrs: {
        placeholder: "请输入门店名称",
        clearable: true,
        style: { width: "200px" },
      },
    },
  ],
};

export default searchConfig;
