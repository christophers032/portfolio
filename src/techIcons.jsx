import {
  siApachespark,
  siDocker,
  siDotnet,
  siElasticsearch,
  siFortran,
  siGit,
  siGithubactions,
  siGo,
  siJavascript,
  siJest,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siOpenjdk,
  siPhp,
  siPostgresql,
  siPython,
  siReact,
  siSnowflake,
  siSpringboot,
  siStrapi,
  siTypescript,
} from "simple-icons";

// Official brand marks (single-colour paths from simple-icons), keyed by a normalised name.
const brand = {
  python: siPython,
  react: siReact,
  nodejs: siNodedotjs,
  docker: siDocker,
  net: siDotnet,
  elasticsearch: siElasticsearch,
  strapi: siStrapi,
  mysql: siMysql,
  pyspark: siApachespark,
  spark: siApachespark,
  springboot: siSpringboot,
  snowflake: siSnowflake,
  php: siPhp,
  javascript: siJavascript,
  nextjs: siNextdotjs,
  typescript: siTypescript,
  postgresql: siPostgresql,
  golang: siGo,
  java: siOpenjdk,
  jest: siJest,
  fortran: siFortran,
  git: siGit,
  githubactions: siGithubactions,
};

// Simple line icons for things that have no brand mark (or whose mark isn't available).
const line = {
  aws: <path d="M7 18a4 4 0 0 1-.6-7.96A5.5 5.5 0 0 1 17 8.5a4.75 4.75 0 0 1 .5 9.5H7Z" />,
  sql: (
    <>
      <ellipse cx="12" cy="5.5" rx="7.5" ry="2.8" />
      <path d="M4.5 5.5v13c0 1.55 3.35 2.8 7.5 2.8s7.5-1.25 7.5-2.8v-13M4.5 12c0 1.55 3.35 2.8 7.5 2.8s7.5-1.25 7.5-2.8" />
    </>
  ),
  ai: (
    <path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8L12 3ZM18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8L18 15Z" />
  ),
  cicd: (
    <path d="M4 12a8 8 0 0 1 13.7-5.6L20 8.5M20 4v4.5h-4.5M20 12a8 8 0 0 1-13.7 5.6L4 15.5M4 20v-4.5h4.5" />
  ),
  api: (
    <path d="M9 4C7 4 6 5 6 7v2c0 1-1 2-2 3 1 1 2 2 2 3v2c0 2 1 3 3 3M15 4c2 0 3 1 3 3v2c0 1 1 2 2 3-1 1-2 2-2 3v2c0 2-1 3-3 3" />
  ),
  auth: <path d="M7 11V8a5 5 0 0 1 10 0v3M5 11h14v9H5zM12 15v2" />,
  scrape: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" />
    </>
  ),
  test: (
    <>
      <path d="M9 3h6M10 3v6L5 19a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 19l-5-10V3" />
      <path d="m9.5 15 2 2 3.5-3.5" />
    </>
  ),
  // AWS services each get their own glyph
  server: (
    <>
      <rect x="3" y="4" width="18" height="6" rx="1.5" />
      <rect x="3" y="14" width="18" height="6" rx="1.5" />
      <path d="M7 7h.01M7 17h.01M12 7h6M12 17h6" />
    </>
  ),
  funnel: <path d="M3 4h18l-7 8.5V19l-4 2v-8.5L3 4Z" />,
  bucket: (
    <>
      <ellipse cx="12" cy="6" rx="8" ry="2.5" />
      <path d="M4 6l2 13a2 2 0 0 0 2 1.6h8a2 2 0 0 0 2-1.6L20 6" />
    </>
  ),
  warehouse: <path d="M3 7l9-4 9 4-9 4-9-4ZM3 12l9 4 9-4M3 17l9 4 9-4" />,
  lambda: <path d="M6 20h3.5l3-7.5M9 4h2.5L18 20" />,
  monitor: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M7 12l3-3 3 2 4-4M9 20h6M12 16v4" />
    </>
  ),
  bell: <path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2h-15L6 16ZM10 20a2 2 0 0 0 4 0" />,
  key: (
    <>
      <circle cx="8" cy="15" r="4" />
      <path d="M11 12l9-9M16 7l3 3M14 9l2 2" />
    </>
  ),
};

// normalised name -> line icon key
const alias = {
  aws: "aws",
  azure: "aws",
  sqlserver: "sql",
  awsec2: "server",
  awsglue: "funnel",
  amazons3: "bucket",
  amazonredshift: "warehouse",
  awslambda: "lambda",
  amazoncloudwatch: "monitor",
  amazonsns: "bell",
  amazonrds: "sql",
  awsiam: "key",
  awssecretsmanager: "auth",
  json: "api",
  aiml: "ai",
  ai: "ai",
  nlp: "ai",
  cicd: "cicd",
  restapis: "api",
  restapi: "api",
  api: "api",
  auth: "auth",
  webscraping: "scrape",
  dataprocessing: "gear",
  automatedtesting: "test",
};

const norm = (s) => s.toLowerCase().replace(/[^a-z0-9#]/g, "");

export default function TechIcon({ name }) {
  const key = norm(name);
  const b = brand[key];

  if (b) {
    return (
      <span className="tech" style={{ "--c": `#${b.hex}` }} title={name} aria-label={name}>
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d={b.path} />
        </svg>
      </span>
    );
  }

  if (key === "sql") {
    return (
      <span className="tech line" title={name} aria-label={name}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <text
            x="12"
            y="15.5"
            textAnchor="middle"
            fontSize="9.5"
            fontWeight="700"
            fontFamily="ui-monospace, Consolas, monospace"
            fill="currentColor"
          >
            SQL
          </text>
        </svg>
      </span>
    );
  }

  if (key === "c#") {
    return (
      <span className="tech" style={{ "--c": "#9b4f96" }} title={name} aria-label={name}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <text
            x="12"
            y="16.5"
            textAnchor="middle"
            fontSize="12.5"
            fontWeight="700"
            fontFamily="ui-monospace, Consolas, monospace"
            fill="currentColor"
          >
            C#
          </text>
        </svg>
      </span>
    );
  }

  const l = line[alias[key]];
  if (l) {
    return (
      <span className="tech line" title={name} aria-label={name}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          {l}
        </svg>
      </span>
    );
  }

  // Unknown technology: a neutral dot, so the row never shows raw letters.
  return (
    <span className="tech line" title={name} aria-label={name}>
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
      </svg>
    </span>
  );
}

