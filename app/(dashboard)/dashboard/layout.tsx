import DashboardWrapper from '@/src/components/module/dashboard/DashboardWrapper';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardWrapper>{children}</DashboardWrapper>;
}
