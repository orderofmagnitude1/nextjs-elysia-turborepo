import { Container } from "@mantine/core";
import { Suspense } from "react";
import CustomBreadcrumbs from "@/components/breadcrumbs";
import { SkeletonForm } from "@/components/skeleton";
import OrganizationForm from "../form";

export default function OrganizationUpdatePage() {
  return (
    <Container>
      <CustomBreadcrumbs />
      <Suspense fallback={<SkeletonForm />}>
        <OrganizationForm isUpdateState />
      </Suspense>
    </Container>
  );
}
