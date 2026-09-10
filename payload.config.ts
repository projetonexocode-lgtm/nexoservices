import path from "path";
import { fileURLToPath } from "url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Media } from "./collections/Media";
import { Users } from "./collections/Users";
import { AboutPage } from "./globals/AboutPage";
import { Homepage } from "./globals/Homepage";
import { SiteSettings } from "./globals/SiteSettings";
import {
  defaultAboutPage,
  defaultHomepageSections,
  defaultSiteSettings,
} from "./lib/cms/defaults";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// Prefer Neon direct (unpooled) URL so Drizzle schema push/DDL works.
// Pooled PgBouncer endpoints often block or silently fail migrations.
const databaseUrl =
  process.env.DATABASE_URL_UNPOOLED ||
  process.env.DATABASE_URL ||
  "file:./payload.db";

const db = databaseUrl.startsWith("postgres")
  ? postgresAdapter({
      // Keep schema push on until Neon matches the Payload schema.
      // Set PAYLOAD_DB_PUSH=false after first successful production sync.
      push: process.env.PAYLOAD_DB_PUSH !== "false",
      pool: {
        connectionString: databaseUrl,
        max: 5,
      },
    })
  : sqliteAdapter({
      client: {
        url: databaseUrl,
      },
    });

const serverURL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

export default buildConfig({
  serverURL,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: " · Nexo Services CMS",
    },
  },
  collections: [Users, Media],
  globals: [SiteSettings, Homepage, AboutPage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "dev-only-change-me",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db,
  sharp,
  plugins: [],
  async onInit(payload) {
    try {
      const users = await payload.find({
        collection: "users",
        limit: 1,
      });

      if (users.totalDocs === 0 && process.env.PAYLOAD_ADMIN_EMAIL) {
        await payload.create({
          collection: "users",
          data: {
            email: process.env.PAYLOAD_ADMIN_EMAIL,
            password: process.env.PAYLOAD_ADMIN_PASSWORD || "ChangeMe123!",
            name: "Admin",
          },
        });
      }

      // Heavy media/content seeding stays local/dev only — production Vercel
      // cold starts must not block Payload init on filesystem uploads.
      if (process.env.VERCEL) return;

      const settings = await payload.findGlobal({
        slug: "site-settings",
        depth: 0,
      });

      const {
        logoLightUrl: _logoLightUrl,
        logoDarkUrl: _logoDarkUrl,
        projetoNexoLogoUrl: _projetoNexoLogoUrl,
        uiCopy: _uiCopy,
        ...cmsSiteDefaults
      } = defaultSiteSettings as typeof defaultSiteSettings & {
        uiCopy?: unknown;
      };

      if (!settings?.name) {
        await payload.updateGlobal({
          slug: "site-settings",
          data: cmsSiteDefaults,
        });
      }

      const logoUpdates: {
        logoLight?: number | string;
        logoDark?: number | string;
        projetoNexoLogo?: number | string;
      } = {};

      if (!settings?.logoLight) {
        try {
          const lightLogo = await payload.create({
            collection: "media",
            data: { alt: "Nexo Services — logo fundo claro" },
            filePath: path.resolve(
              dirname,
              "public/assets/nexo-services-fundo-claro.svg",
            ),
          });
          logoUpdates.logoLight = lightLogo.id;
        } catch (error) {
          console.error("Failed to seed light logo into Media", error);
        }
      }

      if (!settings?.logoDark) {
        try {
          const darkLogo = await payload.create({
            collection: "media",
            data: { alt: "Nexo Services — logo fundo escuro" },
            filePath: path.resolve(dirname, "public/assets/nexo-services.svg"),
          });
          logoUpdates.logoDark = darkLogo.id;
        } catch (error) {
          console.error("Failed to seed dark logo into Media", error);
        }
      }

      const settingsRecord = settings as {
        projetoNexoLogo?: number | string | null;
      } | null;

      if (!settingsRecord?.projetoNexoLogo) {
        try {
          const projetoLogo = await payload.create({
            collection: "media",
            data: { alt: "Projeto Nexo" },
            filePath: path.resolve(
              dirname,
              "public/assets/projeto-nexo-logo.svg",
            ),
          });
          logoUpdates.projetoNexoLogo = projetoLogo.id;
        } catch (error) {
          console.error("Failed to seed Projeto Nexo logo into Media", error);
        }
      }

      if (Object.keys(logoUpdates).length > 0) {
        await payload.updateGlobal({
          slug: "site-settings",
          data: logoUpdates,
        });
      }

      const homepage = await payload.findGlobal({
        slug: "homepage",
      });

      if (!homepage?.sections?.length) {
        await payload.updateGlobal({
          slug: "homepage",
          data: {
            sections: defaultHomepageSections,
          },
        });
      }

      const aboutPage = await payload.findGlobal({
        slug: "about-page",
        depth: 0,
      });

      if (!aboutPage?.heroTitle) {
        await payload.updateGlobal({
          slug: "about-page",
          data: defaultAboutPage,
        });
      }
    } catch (error) {
      console.error("Payload onInit failed", error);
    }
  },
});
