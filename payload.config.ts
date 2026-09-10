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

const databaseUrl = process.env.DATABASE_URL || "file:./payload.db";

const db = databaseUrl.startsWith("postgres")
  ? postgresAdapter({
      pool: {
        connectionString: databaseUrl,
      },
    })
  : sqliteAdapter({
      client: {
        url: databaseUrl,
      },
    });

export default buildConfig({
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
          filePath: path.resolve(dirname, "public/assets/projeto-nexo-logo.svg"),
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
  },
});
