### Alhazen — the optics pipeline
*pkg `alhazen` · `scores-patch-points/Alhazen`*

- **Does:** the reading pipeline for document *images* — binarize a page (grayscale
  + Otsu), read its keys and **value formats** (the value's shape; content is
  discarded), read grid structure, propose rules; pure and dependency-free
  (ESM / CommonJS / `window.Alhazen`). Named for Ibn al-Haytham: vision is
  measured, not willed.
- **Doesn't include:** a vision model or the network (none); retained value
  content (format only); OCR-as-flat-text (the unit is the nested grounded
  record); the reading of text itself (khora).
- **Finds at:** `README.md`; `alhazen.js`. Vendored into `holodeck/alhazen.js`
  and `ab/vendor/`.
