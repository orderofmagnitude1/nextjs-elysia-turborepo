"use client";

import { Alert } from "@mantine/core";
import { useEffect, useState } from "react";

type FormMessageType = "error" | "success" | "info" | "warning";

export const useFormMessage = () => {
	const [isShowFormMessage, setIsShowFormMessage] = useState(false);
	const [type, setType] = useState<FormMessageType>("info");
	const [message, setMessage] = useState<string | undefined>(undefined);

	const FormMessage = () => {
		return (
			isShowFormMessage && (
				<Alert color={type} py="5">
					{message}
				</Alert>
			)
		);
	};

	const setFormMessage = (
		message: string | undefined,
		type: FormMessageType = "info"
	) => {
		setType(type);
		setMessage(message);
	};

	const setErrorFormMessage = (message: string) => {
		setFormMessage(message, "error");
	};

	const setSuccessFormMessage = (message: string) => {
		setFormMessage(message, "success");
	};

	const setInfoFormMessage = (message: string) => {
		setFormMessage(message, "info");
	};

	const setWarningFormMessage = (message: string) => {
		setFormMessage(message, "warning");
	};

	const clearFormMessage = () => {
		setFormMessage(undefined);
	};

	useEffect(() => {
		if (message) {
			setIsShowFormMessage(true);
		} else {
			setIsShowFormMessage(false);
		}
	}, [message]);

	return {
		FormMessage,
		setErrorFormMessage,
		setSuccessFormMessage,
		setInfoFormMessage,
		setWarningFormMessage,
		clearFormMessage,
		isShowFormMessage,
	};
};
