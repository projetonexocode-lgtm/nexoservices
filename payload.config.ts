import path from "path";
import { fileURLToPath } from "url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import sharp from "sharp";

import { Media } from "./collections/Media";
import { Users } from "./collections/Users";
import { Homepage } from "./globals/Homepage";
import { SiteSettings } from "./globals/SiteSettings";
import {
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
  globals: [SiteSettings, Homepage],
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
    });

    if (!settings?.name) {
      await payload.updateGlobal({
        slug: "site-settings",
        data: defaultSiteSettings,
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
  },
});
