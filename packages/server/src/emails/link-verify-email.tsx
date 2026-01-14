import {
	Button,
	Container,
	Head,
	Html,
	Section,
	Tailwind,
	Text,
} from "@react-email/components";

const brandGradientColor =
	"bg-[#34d399] bg-[radial-gradient(circle_at_bottom_right,#2563eb_0%,transparent_75%)]";

export default function LinkVerifyEmail({ url }: { url: string }) {
	return (
		<Html lang="vi">
			<Head />
			<Tailwind>
				<Container>
					<Section className="flex min-h-screen w-full items-center justify-center font-sans">
						<Section className="flex w-76 flex-col items-center rounded-2xl bg-gray-50 px-6 py-1">
							<Text
								className={`w-fit bg-clip-text font-bold text-lg text-transparent ${brandGradientColor}`}
							>
								Xác thực địa chỉ email
							</Text>
							<Text className="my-0 text-gray-500">
								Hãy nhấn vào liên kết sau để xác thực địa chỉ email của bạn tại
								HQCodeLab
							</Text>
							<Button
								className={`w-full ${brandGradientColor} mt-4 rounded-md py-2 text-center text-white`}
								href={url}
							>
								Xác thực địa chỉ email
							</Button>
							<Text className="pb-4 font-light text-gray-400 text-xs">
								Liên kết này hợp lệ trong 10 phút
							</Text>
							<Text className="text-gray-600 text-xs">
								Cảm ơn bạn đã đăng ký
							</Text>
						</Section>
					</Section>
				</Container>
			</Tailwind>
		</Html>
	);
}

LinkVerifyEmail.PreviewProps = {
	url: "https://www.google.com",
};
