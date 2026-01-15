import { notifications } from "@mantine/notifications";
import { IconCheck, IconInfoCircle, IconX } from "@tabler/icons-react";

interface INotifyOptions {
	title?: string;
	message: string;
	color?: "blue" | "green" | "red";
	autoClose?: number;
	loading?: boolean;
	icon?: React.ReactNode;
	withBorder?: boolean;
}

export const useCustomNotification = () => {
	const notifyInfo = (options: INotifyOptions) => {
		notifications.show({
			title: options.title,
			message: options.message,
			color: options.color ?? "blue",
			autoClose: options.autoClose ?? 2000,
			loading: options.loading ?? false,
			icon: options.icon ?? <IconInfoCircle size={20} />,
			withBorder: options.withBorder ?? true,
		});
	};

	const notifySuccess = (options: INotifyOptions) => {
		notifications.show({
			title: options.title,
			message: options.message,
			color: options.color ?? "green",
			autoClose: options.autoClose ?? 2000,
			loading: options.loading ?? false,
			icon: options.icon ?? <IconCheck size={20} />,
			withBorder: options.withBorder ?? true,
		});
	};

	const notifyError = (options: INotifyOptions) => {
		notifications.show({
			title: options.title,
			message: options.message,
			color: options.color ?? "red",
			autoClose: options.autoClose ?? 2000,
			loading: options.loading ?? false,
			icon: options.icon ?? <IconX size={20} />,
			withBorder: options.withBorder ?? true,
		});
	};

	return {
		notifyInfo,
		notifySuccess,
		notifyError,
	};
};
