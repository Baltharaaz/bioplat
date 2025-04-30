import { type RouteConfig,
    index,
    layout,
    prefix,
    route} from "@react-router/dev/routes";

export default [
    layout("components/navbar.tsx", [
        index("routes/home.tsx"),
        route("about", "routes/about.tsx"),
        route("login", "routes/login.tsx"),
        route("logout", "routes/logout.tsx"),
        route("account", "routes/account.tsx"),
        route("register", "routes/register.tsx"),
        route("jobs/:jobId", "routes/jobdetails.tsx"),
    ]),

] satisfies RouteConfig;
