import { AnyAction } from "redux";

export const TOGGLE = "master/TOGGLE";

export interface IMasterStateSession {
    collapsed?: boolean;
    profile?: {
        id: string;
        name: string;
    }
}

export interface IMasterState {
    session: IMasterStateSession;
}