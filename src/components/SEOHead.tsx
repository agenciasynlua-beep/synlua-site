import { useEffect } from "react";

const SITE_URL = "https://www.synlua.com.br";
const DEFAULT_IMAGE =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/DHuBpRpQh3RDq4zDEcoN6SbuEYS2/social-images/social-1761568829637-2.png";

interface SEOHeadProps {
  /** Título completo da página (já com marca, quando fizer sentido). Máx. ~60 caracteres. */
  title: string;
  description: string;
  keywords?: string;
  /** URL absoluta da imagem de compartilhamento. */
  image?: string;
  /** Caminho da rota, ex.: "/" ou "/briefing". */
  path?: string;
  type?: string;
  noindex?: boolean;
}

const SEOHead = ({
  title,
  description,
  keywords = "marketing digital, agência de marketing, tráfego pago, social media, audiovisual, Barueri",
  image = DEFAULT_IMAGE,
  path = "/",
  type = "website",
  noindex = false,
}: SEOHeadProps) => {
  useEffect(() => {
    const url = `${SITE_URL}${path === "/" ? "/" : path.replace(/\/$/, "")}`;
    document.title = title;

    const updateMetaTag = (name: string, content: string, property?: string) => {
      const selector = property ? `meta[property="${property}"]` : `meta[name="${name}"]`;
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        if (property) element.setAttribute("property", property);
        else element.setAttribute("name", name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords);
    updateMetaTag("robots", noindex ? "noindex, nofollow" : "index, follow");

    updateMetaTag("", title, "og:title");
    updateMetaTag("", description, "og:description");
    updateMetaTag("", image, "og:image");
    updateMetaTag("", url, "og:url");
    updateMetaTag("", type, "og:type");
    updateMetaTag("", "Synlua Marketing", "og:site_name");
    updateMetaTag("", "pt_BR", "og:locale");

    updateMetaTag("twitter:card", "summary_large_image");
    updateMetaTag("twitter:title", title);
    updateMetaTag("twitter:description", description);
    updateMetaTag("twitter:image", image);

    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", url);
  }, [title, description, keywords, image, path, type, noindex]);

  return null;
};

export default SEOHead;
