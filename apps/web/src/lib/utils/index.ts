import { enUS, vi } from "date-fns/locale";

export const getDateLocale = (locale: string) => {
	switch (locale) {
		case "vi":
			return vi;
		default:
			return enUS;
	}
};

export const capitalizeFirstLetter = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1);
};
