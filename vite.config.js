import { defineConfig } from "vite";
import process from "process";
console.log(process.env.npm_package_name);

export default defineConfig({
  // Vite'nin proje kök dizinini belirtir ve GitHub Pages'te yayınlamak için gerekli olan alt dizini belirtir
  base:
    process.env.NODE_ENV === "development"
      ? "./"
      : `/${process.env.npm_package_name}/`,
  // Vite'nin proje kök dizini olarak 'src' klasörünü kullanmasını sağlar
  root: "./src/",
  // Sunucu Ayarları
  server: {
    // Tarayıcı Başlat
    open: true,
    // Port Ayarla (Varsayılan: 5173)
    port: 9000,
    // Dış Bağlantıları Kabul Et
    cors: false,
  },
  // Çıkış Ayarları
  build: {
    // Çıktıyı proje kökünde 'dist' klasörüne alır
    outDir: "../dist",
    // Çıktı klasörünü temizler
    emptyOutDir: true,
  },
});
