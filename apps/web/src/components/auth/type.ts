export interface i18nForgotPassword {
  layout: {
    title: string;
    haveAccount: string;
    signIn: string;
  };
  form: {
    email: {
      label: string;
      placeholder: string;
    };
    btnSendResetLink: string;
  };
}

export interface i18nResetPassword {
  layout: {
    title: string;
    hint: string;
  };
  form: {
    password: {
      label: string;
      placeholder: string;
    };
    passwordConfirmation: {
      label: string;
      placeholder: string;
    };
    btnResetPassword: string;
  };
}

export interface i18nSignIn {
  layout: {
    title: string;
    createAccount: string;
    doNotHaveAccountYet: string;
  };
  form: {
    email: {
      label: string;
      placeholder: string;
    };
    password: {
      label: string;
      placeholder: string;
    };
    rememberMe: string;
    doForgotPassword: string;
    btnSignIn: string;
  };
}

export interface i18nSignUp {
  layout: {
    title: string;
    haveAccount: string;
    signIn: string;
  };
  form: {
    name: {
      label: string;
      placeholder: string;
    };
    email: {
      label: string;
      placeholder: string;
    };
    password: {
      label: string;
      placeholder: string;
    };
    passwordConfirmation: {
      label: string;
      placeholder: string;
    };
    agreeToTerms: string;
    btnSignUp: string;
  };
}

export interface i18nSocialProviders {
  orContinueWith: string;
}

export interface i18nUserButtonMenu {
  userSettings: string;
  signOut: string;
}

export interface i18nUserInfo {
  title: string;
  email: {
    label: string;
    placeholder: string;
  };
  name: {
    label: string;
    placeholder: string;
  };
  btnSave: string;
}

export interface i18nChangePassword {
  title: string;
  currentPassword: {
    label: string;
    placeholder: string;
  };
  newPassword: {
    label: string;
    placeholder: string;
  };
  newPasswordConfirmation: {
    label: string;
    placeholder: string;
  };
  btnSave: string;
  btnChangePassword: string;
}

export interface i18nSocialAccounts {
  title: string;
  btnLink: string;
  btnUnlink: string;
}

export interface i18nActiveSession {
  title: string;
  revoke: string;
}

export interface i18nUserDeletion {
  title: string;
  description: string;
  modal: {
    btnDelete: string;
    title: string;
    description: string;
    confirm: string;
    cancel: string;
  };
}

export interface i18nAuthContext {
  forgotPassword: i18nForgotPassword;
  resetPassword: i18nResetPassword;
  signIn: i18nSignIn;
  signUp: i18nSignUp;
  socialProviders: i18nSocialProviders;
  userButtonMenu: i18nUserButtonMenu;
  userInfo: i18nUserInfo;
  changePassword: i18nChangePassword;
  socialAccounts: i18nSocialAccounts;
  activeSession: i18nActiveSession;
  userDeletion: i18nUserDeletion;
}

export interface AuthContextType {
  i18n: i18nAuthContext;
}
