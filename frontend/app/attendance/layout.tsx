import Layout from "@/components/layout";

export default function AttendanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}