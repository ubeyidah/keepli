import { DataTable } from "@/components/data-table";
import React from "react";
import data from "./data.json";
const Dashboard = () => {
  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        {/* <SectionCards /> */}
        <div className="px-4 lg:px-6"></div>
        <DataTable data={data} />
      </div>
    </div>
  );
};

export default Dashboard;
