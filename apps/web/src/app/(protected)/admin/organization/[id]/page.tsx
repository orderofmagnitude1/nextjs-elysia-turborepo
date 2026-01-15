import { Container } from "@mantine/core";
import { Suspense } from "react";
import CustomBreadcrumbs from "@/components/breadcrumbs";
import { SkeletonForm } from "@/components/skeleton";
import OrganizationForm from "./form";

export default function OrganizationDetailPage() {
	return (
		<Container>
			<CustomBreadcrumbs />
			<Suspense fallback={<SkeletonForm />}>
				<OrganizationForm />
			</Suspense>
		</Container>
	);
}
