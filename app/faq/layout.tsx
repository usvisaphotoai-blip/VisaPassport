import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | PixPassport Support",
  description: "Find answers to common questions about passport and visa photo requirements, biometric compliance, payment, and privacy.",
  alternates: {
    canonical: "https://www.pixpassport.com/faq",
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
