import {createCookieSessionStorage} from "react-router";
import {createCookie} from "react-router";

type SessionData = {
    jwitoken: string;
};

type SessionFlashData = {
    error: string;
};

const { getSession, commitSession, destroySession } = createCookieSessionStorage<SessionData, SessionFlashData>();