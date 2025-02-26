import React from "react";
import { Routes, Route } from "react-router";
import { AppFooter } from "./cmps/AppFooter";
import { PostIndex } from "./pages/postIndex.jsx";

export function RootCmp() {
  return (
    <div className="">
    <main>
      <Routes>
        <Route path="/" element={<PostIndex />} />
      </Routes>
    </main>
    <AppFooter />
  </div>
  )
}