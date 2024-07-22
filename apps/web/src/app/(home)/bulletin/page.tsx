import PageTitle from "@/components/common/page-title";
import type { Metadata } from "next";
import React from "react";
import TreeSelector from "@/components/bulletin/tree-selector";
import BulletinItemList from "@/components/bulletin/bulletin-item-list";
import SideLayout from "@/components/common/side-layout";
import { BRANCH_NAME } from "@/constants/misc";

export const metadata: Metadata = {
  title: `告示墙 - ${BRANCH_NAME}`,
};
const BulletinPage = async () => {
  return (
    <div>
      <PageTitle>告示墙</PageTitle>
      <SideLayout>
        <TreeSelector />
        <BulletinItemList />
      </SideLayout>
    </div>
  );
};

export default BulletinPage;
