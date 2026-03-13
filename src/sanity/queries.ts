export const PROJECTS_QUERY = `*[_type == "project"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  summary,
  tags,
  mainImage,
  color,
  publishedAt
}`;

export const PROJECT_BY_SLUG_QUERY = `*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  summary,
  tags,
  mainImage,
  color,
  description,
  projectUrl,
  githubUrl,
  platform,
  playStoreUrl,
  appStoreUrl,
  gallery,
  challenge,
  solution,
  publishedAt
}`;

export const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  type,
  excerpt,
  publishedAt,
  mainImage,
  "category": category->title
}`;

export const POST_BY_SLUG_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  type,
  excerpt,
  body,
  mainImage,
  "author": author->name,
  "category": category->title,
  publishedAt,
  readTime,
  externalLink,
  relatedPosts[]->{
    _id,
    title,
    "slug": slug.current,
    publishedAt
  },
  seoTitle,
  metaDescription,
  focusKeyword,
  canonicalUrl,
  noIndex,
  ogImage,
  twitterHandle
}`;
