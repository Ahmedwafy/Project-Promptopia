"use client";
// 1-Replaced useSearchParams with window.location.search: This approach ensures
// compatibility during hydration since useSearchParams can cause issues during SSR.

// 2- Moved URL logic to useEffect: Ensures the logic runs only on the client
// after the component mounts.

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// import { useSearchParams } from "next/navigation"; // Caused error
import Form from "@components/Form";

const UpdatePrompt = () => {
  const router = useRouter();
  // const searchParams = useSearchParams(); // Caused error

  // const promptId = searchParams.get("id"); // Caused error
  const [promptId, setPromptId] = useState(null);

  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Get the prompt ID from the URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    setPromptId(id);

    const getPromptDetails = async () => {
      if (!promptId) return;

      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
      });
    };

    if (promptId) getPromptDetails(); // VIP STEP
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptId) return alert("Missing PromptId!");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;
