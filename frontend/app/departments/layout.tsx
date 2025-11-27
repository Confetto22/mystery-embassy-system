import Layout from "@/components/layout";

export default function DepartmentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}