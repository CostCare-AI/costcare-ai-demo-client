"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { extractAllUrls, getDomain, getYouTubeId, isImageUrl } from "../../lib/url";

interface UrlPreviewProps {
  text: string;
}

function SingleUrlPreview({ url }: { url: string }) {
  const ytId = getYouTubeId(url);
  if (ytId) {
    return (
      <div className="mt-2">
        <iframe
          className="rounded-md w-full aspect-video"
          src={`https://www.youtube.com/embed/${ytId}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  const [imageError, setImageError] = useState(false);
  if (isImageUrl(url) && !imageError) {
    return (
      <div className="mt-2 relative w-full aspect-video rounded-md overflow-hidden">
        <Image
          src={url}
          alt="Link preview"
          fill
          unoptimized
          className="object-contain"
          onError={() => setImageError(true)}
          sizes="(max-width: 768px) 100vw, 512px"
        />
      </div>
    );
  }

  const domain = getDomain(url);
  const faviconSrc = domain
    ? `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=64`
    : "";
  const [faviconError, setFaviconError] = useState(false);

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-2 block border border-[#E6E8F0] rounded-md p-2 hover:bg-[#F6F7FB] transition-colors"
    >
      <div className="flex items-center gap-2">
        {faviconSrc && !faviconError ? (
          <Image
            src={faviconSrc}
            alt=""
            width={20}
            height={20}
            unoptimized
            className="w-5 h-5 rounded-sm"
            onError={() => setFaviconError(true)}
          />
        ) : null}
        <div className="min-w-0">
          <div className="text-sm text-[#111827] truncate">{domain}</div>
          <div className="text-xs text-[#6B7280] truncate">{url}</div>
        </div>
      </div>
    </Link>
  );
}

export function UrlPreview({ text }: UrlPreviewProps) {
  const urls = extractAllUrls(text);
  if (!urls.length) return null;
  return (
    <>
      {urls.map((u, i) => (
        <SingleUrlPreview url={u} key={`${u}-${i}`} />
      ))}
    </>
  );
}


