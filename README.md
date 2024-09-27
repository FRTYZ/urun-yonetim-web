# MUHİKU - Ürün Yönetim Sistemi Case Study | Fırat Yıldız

Merhaba, Projenin frontend tarafı tamamlandım, proje tailwind css ile sade tasarımla ve kullanıcı dostu bir arayüz oluşturdum. projenin backend ile birlikte çalışmaktadır. [Ürün Yönetim Backend Github](https://github.com/FRTYZ/urun-yonetim-backend) ile kurulum işlemlerinizi tamamlayabilirsiniz.

![alt text](https://raw.githubusercontent.com/FRTYZ/urun-yonetim-web/main/public/home.png)

## Teknolojiler 🛠
- Typescript
- React.js
- Tailwind CSS

## Development 💻

Projeyi localinizde çalıştırmak için gerekli adımlar aşağıda verilmiştir.

1. Projeyi git ile clone ediniz.

    ```
    https://github.com/FRTYZ/urun-yonetim-web.git
    ```

2. Aşağıdaki komutları kullanarak npm paketlerinin kurulmasını sağlıyabilirsiniz.

    ```
    npm install
    npm run dev
    ```

3. Projenin ana dizininde `.env` dosyasını oluşturup, backend'de bağlıyabilirsiniz. backend `8080` portunda çalışcaktır. 

    ```
    VITE_ENDPOINT = http://localhost:8080
    ```


## package.json

```
{
  "name": "urun-yonetim-web",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@tanstack/match-sorter-utils": "^8.19.4",
    "@tanstack/react-table": "^8.20.5",
    "clsx": "^2.1.1",
    "formik": "^2.4.6",
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-query": "^3.39.3",
    "react-router-dom": "^6.26.2",
    "react-table": "^7.8.0",
    "sweetalert2": "^11.14.1"
  },
  "devDependencies": {
    "@eslint/js": "^9.9.0",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@types/react-table": "^7.7.20",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.9.0",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.9",
    "globals": "^15.9.0",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.13",
    "typescript": "^5.5.3",
    "typescript-eslint": "^8.0.1",
    "vite": "^5.4.1"
  }
}
```

İyi çalışmalar dilerim. Saygılarımla.