import type { Route } from "./+types/home";
import { Welcome } from "~/welcome/welcome";
import {ProtectedRoute} from "~/components/ProtectedRoute"
import {ACCESS_TOKEN, REFRESH_TOKEN} from "~/constants";
import {Outlet} from "react-router";
import {useState} from "react";
import { terminal } from "virtual:terminal"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "bioplatform" },
    { name: "description", content: "A deep learning bioinformatics application." },
  ];
}

export async function clientLoader({params} : Route.ClientLoaderArgs){
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
        return null
    }
    return true
}

export default function Home({loaderData} : Route.ComponentProps) {
    const [token, setToken] = useState(loaderData)
    return (
        <Welcome token={token}>
          <Outlet />
        </Welcome>

  );
}
