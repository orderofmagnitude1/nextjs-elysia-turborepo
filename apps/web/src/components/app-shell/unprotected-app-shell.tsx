"use client";

import { AppShell, Group } from "@mantine/core";
import Link from "next/link";
import Logo from "../logo";
import ThemeSegmentor from "../theme-control/theme-segmentor";
import FlexGrow from "../utils/flex-grow";

export default function UnprotectedAppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md" wrap="nowrap">
          <Link href="/" style={{ textDecoration: "none" }}>
            <Logo />
          </Link>
          <FlexGrow />
          <ThemeSegmentor />
        </Group>
      </AppShell.Header>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  );
}
