import { atom, createStore } from "jotai";
import { Session } from "./session";
import { Car } from "@booking/types/booking";

export const store = createStore();

export const sessionAtom = atom<Session | undefined>(undefined);
export const selectedCarAtom = atom<Car | null>(null);
