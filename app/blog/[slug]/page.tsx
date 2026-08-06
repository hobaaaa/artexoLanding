import { redirect } from "next/navigation";

interface LegacyBlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function LegacyBlogPostPage({ params }: LegacyBlogPostPageProps) {
  const { slug } = await params;
  redirect(`/tr/blog/${slug}`);
}
