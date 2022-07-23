import { atom } from "recoil";

export const isSignInUser = atom<boolean>({
  key: "isSignInUser",
  default: !!window.localStorage["token"],
});

export const filters = atom<{[key: string]: string}>({
  key: "filters",
  default: {
    // filterValue: filterKey (ex)온라인: online1
  },
});

export const authCode = atom<string>({
  key: "authCode",
  default: "",
});