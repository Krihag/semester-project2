import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        profile: resolve(__dirname, "profile/index.html"),
        listing: resolve(__dirname, "listing/index.html"),
      },
    },
  },
});

// export default {
//   root: "./",
//   base: "./public/",
//   build: {
//     rollupOptions: {
//       input: {
//         main: "./index.html",
//         profile: "./public/profile/index.html",
//         listing: "./public/listing/index.html",
//       },
//     },
//   },
// };
