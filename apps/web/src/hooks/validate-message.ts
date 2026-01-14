"use client";

import { useTranslations } from "next-intl";

export const useValidateMessage = () => {
  const t = useTranslations("validateMessage");

  return {
    required: () => t("required"),
    onlyNumber: () => t("onlyNumber"),
    email: () => t("email"),
    validDatetime: () => t("validDatetime"),
    agreeTerm: () => t("agreeTerm"),
    passwordNotMatch: () => t("passwordNotMatch"),
    lte: (max: number) => t("lte", { max }),
    gte: (min: number) => t("gte", { min }),
  };
};
