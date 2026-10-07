import type { Metadata } from "next";
import NotFoundTool from "./components/NotFoundTool";

export const metadata: Metadata = {
  title: "Create Passport & Visa Photos Online – 50+ Countries | PixPassport",
  description:
    "Create passport and visa photos online for 50+ countries. Automatic cropping, background removal and biometric photo checks.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return <NotFoundTool />;
}
