import { type RouteConfig,
    index,
    layout,
    prefix,
    route} from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("jobs/:jobID", "jobs/report.tsx")
] satisfies RouteConfig;
