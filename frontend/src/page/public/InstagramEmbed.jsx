import { useEffect } from "react";

const reels = [
  "https://www.instagram.com/reel/Ddl1ePgJZda/",
  "https://www.instagram.com/reel/DdOD-55zHJB/",
  "https://www.instagram.com/p/DeRWerLzTTb/"
];

export default function InstagramEmbed() {
  useEffect(() => {
    if (window.instgrm) {
      window.instgrm.Embeds.process();
      return;
    }

    const existingScript = document.querySelector(
      'script[src="https://www.instagram.com/embed.js"]'
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => {
        window.instgrm?.Embeds.process();
      });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = () => {
      window.instgrm?.Embeds.process();
    };

    document.body.appendChild(script);
  }, []);

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {reels.map((url) => (
        <blockquote
          key={url}
          className="instagram-media"
          data-instgrm-permalink={url}
          data-instgrm-version="14"
          style={{
            background: "#FFF",
            border: 0,
            borderRadius: 8,
            boxShadow: "0 1px 10px rgba(0,0,0,0.12)",
            margin: 0,
            maxWidth: 400,
            minWidth: 280,
            width: "100%",
          }}
        >
          <a href={url} target="_blank" rel="noreferrer">
            Lihat postingan ini di Instagram
          </a>
        </blockquote>
      ))}
    </div>
  );
}