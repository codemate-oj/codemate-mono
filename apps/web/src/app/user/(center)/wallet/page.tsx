"use client";
import { Tabs, TabsProps } from "antd";
import React from "react";
import Overview from "@/components/user/account/Overview";
import Detail from "@/components/user/account/Detail";
import { useUrlParamState } from "@/hooks/useUrlParamState";

const tabItems: TabsProps["items"] = [
  { key: "overview", label: "账户", children: <Overview /> },
  {
    key: "details",
    label: "交易明细",
    children: <Detail />,
  },
];

const Account = () => {
  const [curTab, setCurTab] = useUrlParamState("accountTab", tabItems[0].key);

  return (
    <div>
      <Tabs items={tabItems} activeKey={curTab} onChange={setCurTab} />
    </div>
  );
};

export default Account;
