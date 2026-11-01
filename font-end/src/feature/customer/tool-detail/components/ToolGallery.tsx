"use client";

import React, { useState } from "react";

export function ToolGallery({ screenshotUrl, galleryUrls = [] }: { screenshotUrl: string; galleryUrls?: string[] }) {
  const allImages = [screenshotUrl, ...galleryUrls].filter(Boolean);
  const [activeImage, setActiveImage] = useState(allImages[0]);

  return (
    <div className="space-y-3">
      {/* Main Image Frame with 16:9 ratio */}
      <div className="relative w-full aspect-video rounded-2xl bg-slate-950 overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg group">
        <img
          src={activeImage}
          alt="Giao diện phần mềm"
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-102"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Thumbnails row */}
      {allImages.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveImage(img)}
              className={`relative h-16 w-28 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                activeImage === img
                  ? "border-blue-600 dark:border-cyan-400 shadow-md"
                  : "border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100"
              }`}
            >
              <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

