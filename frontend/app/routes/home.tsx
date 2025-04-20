import type { Route } from "./+types/home";
import { Welcome } from "~/welcome/welcome";
import Report from "../jobs/report"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "bioplatform" },
    { name: "description", content: "A deep learning bioinformatics application." },
  ];
}

export default function Home() {
  return (
      <Welcome />
  );
}
