export default defineNuxtConfig({
  // Disable strict
  typescript: {
    typeCheck: true,
    strict: false,
  },

  app: {
    head: {
      title: "Nuxt-Prisma Example (TypeScript)",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { hid: "description", name: "description", content: "" },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },

  compatibilityDate: "2025-02-15",
});

