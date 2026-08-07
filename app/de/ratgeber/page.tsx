import GermanGuidesHubPage, { metadata as hubMetadata } from "../guides/page";

export const metadata = {
  ...hubMetadata,
  alternates: {
    canonical: "https://www.pixpassport.com/de/ratgeber",
    languages: {
      de: "https://www.pixpassport.com/de/ratgeber",
    },
  },
};

export default function RatgeberPage() {
  return <GermanGuidesHubPage />;
}
