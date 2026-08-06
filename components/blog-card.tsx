import { ArrowRightIcon, CalendarDaysIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { getLocalizedPath,type Locale } from "../dictionaries/i18n";
import type { BlogPost } from "../sanity/fetch";

interface BlogCardText {
  read: string;
  soon: string;
}

function formatDate(value: string | undefined, locale: Locale, fallback: string) {
  if (!value) {
    return fallback;
  }

  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export default function BlogCard({
  post,
  locale,
  text,
}: {
  post: BlogPost;
  locale: Locale;
  text: BlogCardText;
}) {
  return (
    <article className="flow-card shine-border rounded-md border bg-card/60 p-6 shadow-xl">
      {post.coverImage?.asset?.url && (
        <Image
          src={post.coverImage.asset.url}
          alt={
            post.coverImage.alt ||
            `${post.title} artexoApp online appointment scheduling blog image`
          }
          width={post.coverImage.asset.metadata?.dimensions?.width || 1536}
          height={post.coverImage.asset.metadata?.dimensions?.height || 1024}
          className="mb-5 aspect-[3/2] w-full rounded-md bg-muted/20 object-contain"
        />
      )}
      <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
        <CalendarDaysIcon className="size-4 text-brand" />
        {formatDate(post.publishedAt, locale, text.soon)}
      </div>
      <h3 className="mb-3 text-2xl font-semibold leading-tight">
        <Link
          href={getLocalizedPath(locale, `/blog/${post.slug}`)}
          className="hover:text-brand"
        >
          {post.title}
        </Link>
      </h3>
      {post.excerpt && (
        <p className="mb-5 line-clamp-3 leading-7 text-muted-foreground">
          {post.excerpt}
        </p>
      )}
      <Link
        href={getLocalizedPath(locale, `/blog/${post.slug}`)}
        className="inline-flex items-center gap-2 text-sm font-medium text-brand"
      >
        {text.read}
        <ArrowRightIcon className="size-4" />
      </Link>
    </article>
  );
}
