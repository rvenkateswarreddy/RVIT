import { Metadata } from "next";

export async function generateMetadata({ params }): Promise<Metadata> {
  // You can fetch the training for dynamic meta, or just use a template.
  return {
    title: "Training Details | RV IT",
    description: "View detailed information about this training program.",
    openGraph: {
      title: "Training Details | RV IT ",
      description: "View detailed information about this training program.",
      url: `https://rvit.co.in/trainings/${params.id}`,
      // Add image if you have it
    },
  };
}