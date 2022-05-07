// src/middleware/auth.js
export default function auth({ next, router }) {
  if (sessionStorage.getItem("jwt")) {
    return router.push({ name: "dashboard" });
  }

  next();
}
