import { atom, createStore } from "jotai";

import { Session } from "./session";

export const store = createStore();

export const sessionAtom = atom<Session | null>(null);
