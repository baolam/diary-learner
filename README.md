# Nhật Ký Học Tập — Nguyễn Đức Bảo Lâm

Trang cá nhân ghi lại các dự án, giải thưởng, chứng chỉ và quá trình học ngành Trí tuệ nhân tạo tại Đại học FPT TP.HCM.

Xem bản đang chạy: https://baolam.github.io/diary-learner/

## Công nghệ

- [Next.js](https://nextjs.org/) (App Router, static export) + TypeScript
- Tailwind CSS
- Web Audio API cho hiệu ứng âm thanh nhỏ trên trang

## Chạy local

```bash
npm install
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000).

## Cấu trúc nội dung

Nội dung chính (dự án, giải thưởng, chứng chỉ, timeline, kỹ năng) nằm trong `src/data/profile.json`. Bản dịch tiếng Anh nằm trong `src/lib/translations.ts`. Sửa trực tiếp hai file này rồi chạy `npm run dev` để xem thay đổi.

## Build & Deploy

```bash
npm run build
```

Lệnh trên xuất site tĩnh ra thư mục `out/`. Mỗi lần push lên nhánh `main`, GitHub Actions (`.github/workflows/deploy.yml`) sẽ tự build và publish lên GitHub Pages.
