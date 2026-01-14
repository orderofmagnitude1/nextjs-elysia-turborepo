import { Container, Grid, GridCol, Stack } from "@mantine/core";
import ProtectedAppShell from "@/components/app-shell/protected-app-shell";
import CustomBreadcrumbs from "@/components/breadcrumbs";
import ActiveSession from "./active-session";
import ChangePassword from "./change-password";
import SocialAccount from "./social-account";
import UserDeletion from "./user-deletion";
import UserInfo from "./user-info";

export default function UserSettings() {
  return (
    <ProtectedAppShell>
      <Container>
        <CustomBreadcrumbs />
        <Grid gutter="md">
          <GridCol span={{ base: 12, md: 6 }}>
            <Stack gap="md">
              <UserInfo />
              <ChangePassword />
            </Stack>
          </GridCol>
          <GridCol span={{ base: 12, md: 6 }}>
            <Stack gap="md">
              <SocialAccount />
              <ActiveSession />
              <UserDeletion />
            </Stack>
          </GridCol>
        </Grid>
      </Container>
    </ProtectedAppShell>
  );
}
