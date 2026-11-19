### holodeck-samples — sample source sets
*`scores-patch-points/holodeck-samples`*

- **Does:** carries the **readings** for the fold demo (e.g.
  `titanic-1912/readings.json` — each source already read down to its passages,
  installed as the app installs them); the app carries only a pointer.
- **Doesn't include:** any content — recordings and scans are served from the VM,
  book texts live where they live; nothing is parsed or OCR'd in a visitor's
  browser.
- **Finds at:** `README.md`; `titanic-1912/`.
