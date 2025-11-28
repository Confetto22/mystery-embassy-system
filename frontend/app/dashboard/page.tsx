import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Briefcase, ListTodo, Users, TrendingUp, Bot } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
// import { useGetOverviewQuery } from "@/services/overview/hooks";
import type { AnalyticsData, Department, GenderCount } from "@/lib/types";
import { fetchOverviewData } from "../actions/overview.action";
import { ChartPieDonutText } from "@/components/PieChart";
import { AddEvent, AddMember, CheckIn } from "@/dashboard/quick-actions";
// import AddMember from "@/dashboard/quick-actions";

export default async function Dashboard() {
  const overview: AnalyticsData = await fetchOverviewData();
  // const { data: overviewData, isLoading, isError } = useGetOverviewQuery();
  // console.log(overview);
  const allMembers = overview.totalMembers?.length || 0;
  const summaryCards = [
    {
      title: "Total Members",
      value: overview.totalMembers?.length || "0",
      // subtitle: "2 Completed",
      icon: Briefcase,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "First Timers",
      value: overview.firstTimers?.length || "0",
      // subtitle: "28 Completed",
      icon: ListTodo,
      bgColor: "bg-white",
      iconColor: "text-gray-600",
    },

    {
      title: "Attendance Today",
      value: overview.presentToday?.length || "0",
      subtitle: "70%",
      icon: TrendingUp,
      bgColor: "bg-white",
      iconColor: "text-gray-600",
    },
    {
      title: "Upcoming Events",
      value: overview.upcomingEvts?.length || "0",
      // subtitle: "2 New This Month",
      icon: Users,
      bgColor: "bg-white",
      iconColor: "text-gray-600",
    },
  ];

  // interface genderDataType {
  //   _count: {
  //     id: number;
  //   };
  //   gender: string;
  //   color: string;
  // }

  const genderData =
    overview.genders?.map((gender: GenderCount) => ({
      ...gender,
      color: gender.gender === "female" ? "#EC4899" : "#0EA5E9",
    })) || [];

  const genderConfig = {
    Members: {
      label: "Members",
    },
    male: {
      label: "Male",
      color: "#0EA5E9",
    },
    female: {
      label: "Female",
      color: "#EC4899",
    },
  };

  // console.log(genderData);

  return (
    <main className="flex  flex-col gap-6 p-6 bg-gray-50 min-h-screen">
      <div className="quick-actions flex items-center gap-4  w-full justify-between">
        <h1>Mystery Embassy International</h1>
        <div className=" flex items-center gap-3">
          <AddMember />
          <AddEvent />
          <CheckIn />
        </div>
      </div>
      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {summaryCards.map((card, index) => (
          <Card key={index} className={`${card.bgColor} border-0 shadow-sm`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">
                {card.title}
              </CardTitle>
              <card.icon className={`h-5 w-5 ${card.iconColor}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {card.value}
              </div>
              <p className="text-xs text-gray-600 mt-1">{card.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <section>
        <h3>Today&apos;s service is {overview?.todayService[0]?.name}</h3>
        <h3>Today&apos;s event is {overview?.todayEvent[0]?.name}</h3>
      </section>
      {/* Main Content Area */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Population by Department */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Departments(list, no. of members, population share)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="">
                  <TableHead>Department</TableHead>
                  <TableHead>Members</TableHead>
                  <TableHead>Population Share</TableHead>
                  {/* <TableHead className="text-right">Growth</TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {overview?.deptPopulation?.map(
                  (dept: Department, index: number) => {
                    const share = Math.round(
                      (dept._count.members / allMembers) * 100
                    );
                    return (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            {/* <div
                              className={`h-10 w-10 rounded-lg ${dept.color} text-white flex items-center justify-center text-sm font-semibold`}
                            >
                              {dept.name
                                .split(" ")
                                .map((word: string) => word[0])
                                .slice(0, 2)
                                .join("")}
                            </div> */}
                            <div>
                              <div className="font-medium text-gray-900">
                                {dept.name}
                              </div>
                              <div className="text-xs text-gray-500">
                                Lead:{" "}
                                {dept._count.members > 1 ||
                                dept.members.length === 0
                                  ? "N/A"
                                  : `${dept.members[0]?.firstname} ${dept.members[0]?.lastname}`}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="font-semibold text-gray-900">
                            {dept._count?.members}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="grid grid-cols-1 gap-1 w-48">
                            <span className="text-sm text-gray-600 w-12">
                              {share}%
                            </span>
                            <Progress value={share} className="flex-1 h-2" />
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  }
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          {/* Gender Distribution */}

          <ChartPieDonutText config={genderConfig} data={genderData} />
        </div>
      </div>
    </main>
  );
}
