import { app, BrowserWindow } from "electron";
import { fileURLToPath } from "url";
import path from "path";
import isDev from "electron-is-dev";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("Electron starting..."); // Bu log, Electron'un başladığını doğrulamak için

function createWindow() {
  console.log("Creating window..."); // Pencere oluşturma işlemi başladığında görünecek log
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const startUrl = isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../client/out/index.html")}`;
  console.log(`Loading URL: ${startUrl}`); // Yüklenen URL'yi göster
  win.loadURL(startUrl);
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  console.log("All windows closed."); // Tüm pencereler kapandığında görünecek log
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
