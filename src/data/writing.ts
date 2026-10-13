import { articles, type WritingEntry } from "./articles";
import postArchive from "./linkedin-posts.json";

export const posts: readonly WritingEntry[] = postArchive.posts.map((post): WritingEntry => {
  if (post.kind !== "post") throw new Error("The original-post archive contains an unsupported entry.");
  return {
    title: post.title,
    url: post.url,
    summary: post.summary,
    topics: post.topics,
    kind: "post",
    ...("ageAtCapture" in post && typeof post.ageAtCapture === "string" ? { ageAtCapture: post.ageAtCapture } : {}),
  };
});

export const writing: readonly WritingEntry[] = [...articles, ...posts];
export const postArchiveInfo = {
  verifiedOn: postArchive.verifiedOn,
  moreAvailableAtCapture: postArchive.moreAvailableAtCapture,
  coverage: postArchive.coverage,
};
