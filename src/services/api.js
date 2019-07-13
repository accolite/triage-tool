import HTTPStatus from "http-status";
import login from "./login.json";
import createEvent from "./createEvent.json"
const mockServer = "http://localhost:3000";

const Endpoints = {
    LOGIN = `${mockServer}/login`,
    CREATE_EVENT = `${mockServer}/createEvent`
}

export const login = () => {
    return login;
} 

export const createEvent = () => {
    return createEvent;
}