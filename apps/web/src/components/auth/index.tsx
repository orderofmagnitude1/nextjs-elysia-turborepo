"use client";

import { useTranslations } from "next-intl";
import ForgotPassword from "./base/forgot-password";
import BaseAuthLayout from "./base/layout";
import ResetPassword from "./base/reset-password";
import SignIn from "./base/sign-in";
import SignOut from "./base/sign-out";
import SignUp from "./base/sign-up";
import UserButtonMenu from "./base/user-button-menu";
import UserSettings from "./base/user-settings";
import { AuthContextProvider } from "./provider";
import type { AuthContextType } from "./type";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations("auth");
  const contextValue: AuthContextType = {
    i18n: {
      forgotPassword: {
        layout: {
          title: t("forgotPassword.layout.title"),
          haveAccount: t("forgotPassword.layout.haveAccount"),
          signIn: t("forgotPassword.layout.signIn"),
        },
        form: {
          email: {
            label: t("forgotPassword.form.email.label"),
            placeholder: t("forgotPassword.form.email.placeholder"),
          },
          btnSendResetLink: t("forgotPassword.form.btnSendResetLink"),
        },
      },
      resetPassword: {
        layout: {
          title: t("resetPassword.layout.title"),
          hint: t("resetPassword.layout.hint"),
        },
        form: {
          password: {
            label: t("resetPassword.form.password.label"),
            placeholder: t("resetPassword.form.password.placeholder"),
          },
          passwordConfirmation: {
            label: t("resetPassword.form.passwordConfirmation.label"),
            placeholder: t(
              "resetPassword.form.passwordConfirmation.placeholder",
            ),
          },
          btnResetPassword: t("resetPassword.form.btnResetPassword"),
        },
      },
      signIn: {
        layout: {
          title: t("signIn.layout.title"),
          createAccount: t("signIn.layout.createAccount"),
          doNotHaveAccountYet: t("signIn.layout.doNotHaveAccountYet"),
        },
        form: {
          email: {
            label: t("signIn.form.email.label"),
            placeholder: t("signIn.form.email.placeholder"),
          },
          password: {
            label: t("signIn.form.password.label"),
            placeholder: t("signIn.form.password.placeholder"),
          },
          rememberMe: t("signIn.form.rememberMe"),
          doForgotPassword: t("signIn.form.doForgotPassword"),
          btnSignIn: t("signIn.form.btnSignIn"),
        },
      },
      signUp: {
        layout: {
          title: t("signUp.layout.title"),
          haveAccount: t("signUp.layout.haveAccount"),
          signIn: t("signUp.layout.signIn"),
        },
        form: {
          name: {
            label: t("signUp.form.name.label"),
            placeholder: t("signUp.form.name.placeholder"),
          },
          email: {
            label: t("signUp.form.email.label"),
            placeholder: t("signUp.form.email.placeholder"),
          },
          password: {
            label: t("signUp.form.password.label"),
            placeholder: t("signUp.form.password.placeholder"),
          },
          passwordConfirmation: {
            label: t("signUp.form.passwordConfirmation.label"),
            placeholder: t("signUp.form.passwordConfirmation.placeholder"),
          },
          agreeToTerms: t("signUp.form.agreeToTerms"),
          btnSignUp: t("signUp.form.btnSignUp"),
        },
      },
      socialProviders: {
        orContinueWith: t("socialProviders.orContinueWith"),
      },
      userButtonMenu: {
        userSettings: t("userButtonMenu.userSettings"),
        signOut: t("userButtonMenu.signOut"),
      },
      userInfo: {
        title: t("userSettings.userInfo.title"),
        email: {
          label: t("userSettings.userInfo.email.label"),
          placeholder: t("userSettings.userInfo.email.placeholder"),
        },
        name: {
          label: t("userSettings.userInfo.name.label"),
          placeholder: t("userSettings.userInfo.name.placeholder"),
        },
        btnSave: t("userSettings.userInfo.btnSave"),
      },
      changePassword: {
        title: t("userSettings.changePassword.title"),
        currentPassword: {
          label: t("userSettings.changePassword.currentPassword.label"),
          placeholder: t(
            "userSettings.changePassword.currentPassword.placeholder",
          ),
        },
        newPassword: {
          label: t("userSettings.changePassword.newPassword.label"),
          placeholder: t("userSettings.changePassword.newPassword.placeholder"),
        },
        newPasswordConfirmation: {
          label: t("userSettings.changePassword.newPasswordConfirmation.label"),
          placeholder: t(
            "userSettings.changePassword.newPasswordConfirmation.placeholder",
          ),
        },
        btnSave: t("userSettings.changePassword.btnSave"),
        btnChangePassword: t("userSettings.changePassword.btnChangePassword"),
      },
      socialAccounts: {
        title: t("userSettings.socialAccounts.title"),
        btnLink: t("userSettings.socialAccounts.btnLink"),
        btnUnlink: t("userSettings.socialAccounts.btnUnlink"),
      },
      activeSession: {
        title: t("userSettings.activeSession.title"),
        revoke: t("userSettings.activeSession.revoke"),
      },
      userDeletion: {
        title: t("userSettings.userDeletion.title"),
        description: t("userSettings.userDeletion.description"),
        modal: {
          btnDelete: t("userSettings.userDeletion.modal.btnDelete"),
          title: t("userSettings.userDeletion.modal.title"),
          description: t("userSettings.userDeletion.modal.description"),
          confirm: t("userSettings.userDeletion.modal.confirm"),
          cancel: t("userSettings.userDeletion.modal.cancel"),
        },
      },
    },
  };

  return (
    <AuthContextProvider contextValue={contextValue}>
      {children}
    </AuthContextProvider>
  );
};

export default function AuthView({
  path,
  variant = "base",
}: {
  path: string;
  variant?: "base";
}) {
  const Layout = ({ children }: { children: React.ReactNode }) => {
    if (variant === "base") {
      return <BaseAuthLayout>{children}</BaseAuthLayout>;
    }
    return <BaseAuthLayout>{children}</BaseAuthLayout>;
  };

  if (path === "sign-in") {
    return (
      <AuthWrapper>
        <Layout>
          <SignIn />
        </Layout>
      </AuthWrapper>
    );
  }
  if (path === "sign-up") {
    return (
      <AuthWrapper>
        <Layout>
          <SignUp />
        </Layout>
      </AuthWrapper>
    );
  }
  if (path === "sign-out") {
    return <SignOut />;
  }
  if (path === "forgot-password") {
    return (
      <AuthWrapper>
        <Layout>
          <ForgotPassword />
        </Layout>
      </AuthWrapper>
    );
  }
  if (path === "reset-password") {
    return (
      <AuthWrapper>
        <Layout>
          <ResetPassword />
        </Layout>
      </AuthWrapper>
    );
  }

  if (path === "user-button-menu") {
    return (
      <AuthWrapper>
        <UserButtonMenu />
      </AuthWrapper>
    );
  }
  if (path === "user-settings") {
    return (
      <AuthWrapper>
        <UserSettings />
      </AuthWrapper>
    );
  }
  return null;
}
