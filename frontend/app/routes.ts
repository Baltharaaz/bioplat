import { type RouteConfig,
    index,
    layout,
    prefix,
    route} from "@react-router/dev/routes";

export default [
    layout("components/navbar.tsx", [
        index("routes/home.tsx"),
        route("about", "about/about.tsx"),
        route("login", "routes/login.tsx"),
        route("logout", "routes/logout.tsx"),
        route("account", "routes/account.tsx"),
        route("register", "routes/register.tsx"),
    ]),

] satisfies RouteConfig;
