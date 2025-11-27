"use client";

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
import { useEffect, useState } from "react";
import { useGetOverviewQuery } from "@/services/overview/hooks";
import type { Department, GenderCount } from "@/lib/types";

const Dashboard = () => {
  const { data: overviewData, isLoading, isError } = useGetOverviewQuery();
  const {
    absentToday,
    deptPopulation,
    firstTimers,
    genders,
    presentToday,
    upcomingEvts,
    totalMembers,
  } = overviewData || {};
  // console.log(overviewData);
  const allMembers = totalMembers?.length || 0;
  const summaryCards = [
    {
      title: "Total Members",
      value: totalMembers?.length || "0",
      // subtitle: "2 Completed",
      icon: Briefcase,
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
    },
    {
      title: "First Timers",
      value: firstTimers?.length || "0",
      // subtitle: "28 Completed",
      icon: ListTodo,
      bgColor: "bg-white",
      iconColor: "text-gray-600",
    },

    {
      title: "Attendance Today",
      value: presentToday?.length || "0",
      subtitle: "70%",
      icon: TrendingUp,
      bgColor: "bg-white",
      iconColor: "text-gray-600",
    },
    {
      title: "Upcoming Events",
      value: upcomingEvts?.length || "0",
      // subtitle: "2 New This Month",
      icon: Users,
      bgColor: "bg-white",
      iconColor: "text-gray-600",
    },
  ];

  interface genderDataType {
    name: string;
    value: number;
    color: string;
  }

  const genderData =
    genders?.map((gender: GenderCount) => {
      const name = gender.gender;
      const value = gender._count.id;
      const color = gender.gender === "female" ? "#EC4899" : "#0EA5E9";
      return { name, value, color };
    }) || [];
  const totalGender = genderData.reduce(
    (sum: number, item: genderDataType) => sum + item.value,
    0
  );

  return (
    <main className="flex flex-1 flex-col gap-6 p-6 bg-gray-50 min-h-screen">
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

      {/* Main Content Area */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Population by Department */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Population by Department
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
                {deptPopulation?.map((dept: Department, index: number) => {
                  const share = Math.round(
                    (dept._count.members / allMembers) * 100
                  );
                  return (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-10 w-10 rounded-lg ${dept.color} text-white flex items-center justify-center text-sm font-semibold`}
                          >
                            {dept.name
                              .split(" ")
                              .map((word: string) => word[0])
                              .slice(0, 2)
                              .join("")}
                          </div>
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
                        <div className="flex items-center gap-3 w-48">
                          <Progress value={share} className="flex-1 h-2" />
                          <span className="text-sm text-gray-600 w-12">
                            {share}%
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Right Column */}
        <div className="flex flex-col gap-6">
          {/* Gender Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Gender Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="">
              <div className="flex flex-col  items-center gap-6">
                <div className="w-full  h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={genderData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={70}
                        outerRadius={90}
                        paddingAngle={2}
                      >
                        {genderData.map((segment: genderDataType) => {
                          const percentage = Math.round(
                            (segment.value / totalGender) * 100
                          );
                          return (
                            <Cell
                              key={segment.name}
                              fill={segment.color}
                              stroke="transparent"
                            />
                          );
                        })}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid space-y-4 w-full">
                  {genderData.map((segment: genderDataType) => {
                    const percentage = Math.round(
                      (segment.value / totalGender) * 100
                    );
                    return (
                      <div
                        key={segment.name}
                        className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="h-3 w-3 rounded-full"
                            style={{ backgroundColor: segment.color }}
                          />
                          <div>
                            <p className="text-sm font-semibold text-gray-900">
                              {segment.name}
                            </p>
                            <p className="text-xs text-gray-500">
                              {percentage}% of total population
                            </p>
                          </div>
                        </div>
                        <span className="text-lg font-semibold text-gray-900">
                          {segment.value}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;