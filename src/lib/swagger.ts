export const customCss = `
:root {
  --font: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
}

body,
.title {
  font-family: var(--font) !important;
}

.topbar {
  display: none;
}

.swagger-ui .info .title {
  font-weight: normal;
}

`;
