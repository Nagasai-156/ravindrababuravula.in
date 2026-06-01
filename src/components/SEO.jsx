import { Helmet } from "react-helmet-async";

const SITE = "https://ravindrababuravula.in";
const DEFAULT_IMAGE = `${SITE}/logo.png`;

export default function SEO({ title, description, path = "/", image, schema }) {
  const fullTitle = title
    ? `${title} | Prof. Ravindrababu Ravula`
    : "Prof. Ravindrababu Ravula | Pioneer of EdTech in India | Educator, Entrepreneur & Visionary";
  const fullUrl = `${SITE}${path}`;
  const desc = description || "Official website of Prof. Ravindrababu Ravula — India's EdTech pioneer with 690K+ YouTube subscribers, 90M+ views. IISc alumnus, PhD in AI/ML & Finance. Founder of Raudra Technologies.";
  const img = image || DEFAULT_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={img} />
      <meta property="og:site_name" content="Prof. Ravindrababu Ravula" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />

      {/* Schema */}
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
}
