import { Container } from "@mantine/core";
import { Suspense } from "react";
import CustomBreadcrumbs from "@/components/breadcrumbs";
import { SkeletonPage } from "@/components/skeleton";
import { OrganizationGrid } from "./grid";

export default function OrganizationPage() {
  return (
    <Container fluid>
      <CustomBreadcrumbs />
      <Suspense fallback={<SkeletonPage />}>
        <OrganizationGrid />
      </Suspense>
    </Container>
  );
}
