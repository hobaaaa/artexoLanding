import type { PortableTextBlock } from "../sanity/fetch";

function renderText(block: PortableTextBlock) {
  return block.children?.map((child) => child.text).join("") || "";
}

export default function PortableText({ value }: { value?: PortableTextBlock[] }) {
  if (!value?.length) {
    return null;
  }

  return (
    <div className="prose prose-invert max-w-none">
      {value.map((block, index) => {
        const text = renderText(block);
        const key = block._key || `${block.style}-${index}`;

        if (!text) {
          return null;
        }

        if (block.style === "h2") {
          return (
            <h2 key={key} className="mt-10 text-3xl font-semibold">
              {text}
            </h2>
          );
        }

        if (block.style === "h3") {
          return (
            <h3 key={key} className="mt-8 text-2xl font-semibold">
              {text}
            </h3>
          );
        }

        if (block.listItem) {
          return (
            <ul key={key} className="my-4 list-disc pl-6 text-muted-foreground">
              <li>{text}</li>
            </ul>
          );
        }

        return (
          <p key={key} className="my-5 text-lg leading-8 text-muted-foreground">
            {text}
          </p>
        );
      })}
    </div>
  );
}
