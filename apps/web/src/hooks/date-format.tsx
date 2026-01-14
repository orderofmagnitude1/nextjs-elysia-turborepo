"use client";

import { format } from "date-fns";
import { useLocale } from "next-intl";
import { capitalizeFirstLetter, getDateLocale } from "@/lib/utils";

type ParameterDate = Parameters<typeof format>[0];

export const useDateFormatter = () => {
  const locale = useLocale();
  const dateLocale = getDateLocale(locale);
  return (date: ParameterDate, formatString: string) => {
    return capitalizeFirstLetter(
      format(date, formatString, { locale: dateLocale }),
    );
  };
};
