import { hasSanityConfig, sanityEnv } from "./env";
import { postBySlugQuery, postListQuery, postSlugsQuery } from "./queries";

export interface SanityImage {
  alt?: string;
  asset?: {
    url?: string;
    metadata?: {
      lqip?: string;
      dimensions?: {
        width?: number;
        height?: number;
      };
    };
  };
}

export interface PortableTextChild {
  _key?: string;
  _type?: string;
  text?: string;
  marks?: string[];
}

export interface PortableTextBlock {
  _key?: string;
  _type?: string;
  style?: string;
  listItem?: string;
  children?: PortableTextChild[];
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  coverImage?: SanityImage;
  categories?: string[];
  body?: PortableTextBlock[];
}

type SanityResponse<T> = {
  result?: T;
};

function getEndpoint() {
  return `https://${sanityEnv.projectId}.api.sanity.io/v${sanityEnv.apiVersion}/data/query/${sanityEnv.dataset}`;
}

async function sanityQuery<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T | null> {
  if (!hasSanityConfig()) {
    return null;
  }

  try {
    const response = await fetch(getEndpoint(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, params }),
      next: {
        revalidate: 60,
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as SanityResponse<T>;
    return data.result ?? null;
  } catch {
    return null;
  }
}

export async function getBlogPosts(limit?: number) {
  const posts = await sanityQuery<BlogPost[]>(postListQuery);
  const safePosts = posts ?? [];

  return typeof limit === "number" ? safePosts.slice(0, limit) : safePosts;
}

export async function getBlogPost(slug: string) {
  return sanityQuery<BlogPost>(postBySlugQuery, { slug });
}

export async function getBlogSlugs() {
  const slugs = await sanityQuery<Array<{ slug: string }>>(postSlugsQuery);
  return slugs ?? [];
}
