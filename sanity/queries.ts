export const postListQuery = /* groq */ `
  *[_type == "post" && defined(slug.current)]
  | order(coalesce(publishedAt, _createdAt) desc) {
    _id,
    title,
    "slug": slug.current,
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
  *[_type == "post" && defined(slug.current)] {
    "slug": slug.current
  }
`;

export const postBySlugQuery = /* groq */ `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
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
