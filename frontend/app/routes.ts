import { type RouteConfig,
    index,
    layout,
    prefix,
    route} from "@react-router/dev/routes";

export default [
    layout("components/navbar.tsx", [
        index("routes/home.tsx"),
        route("jobs/:jobID", "jobs/report.tsx"),
        route("about", "about/about.tsx"),
    ]),

    route("jobs/newJob", "jobs/newJob.tsx"),
] satisfies RouteConfig;
