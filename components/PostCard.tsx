import Image from "next/image";
import type { PostView } from "@/lib/data";
import { formatDate, getDict } from "@/lib/i18n";
import { ArrowIcon } from "./Icons";

export default function PostCard({
  post,
  locale,
  sizes,
  heading = "h3",
  excerpt = true,
  delay = 0,
  reveal = false,
}: {
  post: PostView;
  locale: string;
  sizes: string;
  heading?: "h2" | "h3";
  excerpt?: boolean;
  delay?: number;
  reveal?: boolean;
}) {
  const t = getDict(locale);
  const Heading = heading;
  return (
    <a
      href={`/${locale}/news/${post.slug}`}
      className="post"
      data-reveal={reveal || undefined}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      <div className="post__img">
        <Image src={post.image} alt="" fill sizes={sizes} />
      </div>
      <p className="post__meta">
        <span>{t.news.categories[post.category]}</span>
        <time dateTime={post.iso}>{formatDate(locale, post.iso)}</time>
      </p>
      <Heading className="post__title">{post.title}</Heading>
      {excerpt && <p className="post__text">{post.text}</p>}
      <span className="post__more">
        {t.ui.readMore}
        <ArrowIcon className="link__arrow" />
      </span>
    </a>
  );
}
