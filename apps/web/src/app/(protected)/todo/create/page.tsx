import { Container } from "@mantine/core";
import { Suspense } from "react";
import CustomBreadcrumbs from "@/components/breadcrumbs";
import { SkeletonForm } from "@/components/skeleton";
import Form from "./form";

export default function Index() {
	return (
		<Container>
			<CustomBreadcrumbs />
			<Suspense fallback={<SkeletonForm />}>
				<Form />
			</Suspense>
		</Container>
	);
}
