export const languageFilter = /* groq */ `
  (
    language == $language ||
    ($language == "tr" && !defined(language))
  )
`;

export const postListQuery = /* groq */ `
  *[_type == "post" && defined(slug.current) && ${languageFilter}]
  | order(coalesce(publishedAt, _createdAt) desc) {
    _id,
    title,
    "slug": slug.current,
    language,
    excerpt,
    "publishedAt": coalesce(publishedAt, _createdAt),
    "coverImage": mainImage{
      alt,
      asset->{
        url,
        metadata {
          lqip,
          dimensions {
            width,
            height
          }
        }
      }
    },
    "categories": categories[]->title
  }
`;

export const postSlugsQuery = /* groq */ `
  *[_type == "post" && defined(slug.current) && ${languageFilter}] {
    "slug": slug.current,
    language
  }
`;

export const allPostSlugsQuery = /* groq */ `
  *[_type == "post" && defined(slug.current)] {
    "slug": slug.current,
    "language": coalesce(language, "tr")
  }
`;

export const postBySlugQuery = /* groq */ `
  *[_type == "post" && slug.current == $slug && ${languageFilter}][0] {
    _id,
    title,
    "slug": slug.current,
    language,
    excerpt,
    "publishedAt": coalesce(publishedAt, _createdAt),
    "coverImage": mainImage{
      alt,
      asset->{
        url,
        metadata {
          lqip,
          dimensions {
            width,
            height
          }
        }
      }
    },
    "categories": categories[]->title,
    body
  }
`;
