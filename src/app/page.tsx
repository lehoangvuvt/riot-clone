"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { setTheme } from "@/redux/slices/appSlice";
import BaseContainer from "@/components/BaseContainer";

export default function Home() {
  const themeName = useSelector((state: RootState) => state.app.theme.name);
  const dispatch = useDispatch();

  const switchTheme = () => {
    themeName === "DARK"
      ? dispatch(setTheme("LIGHT"))
      : dispatch(setTheme("DARK"));
  };

  return <BaseContainer>Home</BaseContainer>;
}
