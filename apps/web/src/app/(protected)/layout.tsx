import ProtectedAppShell from "@/components/app-shell/protected-app-shell";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedAppShell>{children}</ProtectedAppShell>;
}
