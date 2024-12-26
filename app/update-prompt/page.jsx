import React from "react";
import UpdatePrompt from "@app/update-mini/page";
import { Suspense } from "react";

const updateThePrompt = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdatePrompt />
    </Suspense>
  );
};

export default updateThePrompt;
