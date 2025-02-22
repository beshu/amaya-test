export default defineNuxtConfig({
  typescript: {
    typeCheck: true,
    strict: false,
  },
  nitro: {
    experimental: {
      websocket: true,
    },
  },
  css: ["~/assets/stylesheet/reset.scss", "~/assets/stylesheet/vars.scss"],
  modules: [
    "@nuxt/image",
    "@pinia/nuxt",
    [
      "nuxt-viewport",
      {
        breakpoints: {
          xs: 375,
          sm: 640,
          md: 768,
          lg: 1280,
          xl: 1920,
          "2xl": 2152,
        },
        defaultBreakpoints: {
          desktop: "lg",
          mobile: "xs",
          tablet: "md",
        },
        fallbackBreakpoint: "lg",
      },
    ],
  ],
  app: {
    head: {
      title: "Отзывы",
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
