# react-headless-quiz Monorepo

Monorepo demo kiến trúc **Headless UI + Slot Pattern** cho React.

Toàn bộ mã nguồn (thư viện + demo) viết bằng **JavaScript thuần (React + JSX)**, không dùng TypeScript

## Packages

| Package | Mô tả |
|---|---|
| [`react-headless-quiz`](./packages/react-headless-quiz) | Thư viện headless quiz |

## Examples

| Demo | Cách dùng | Port |
|---|---|---|
| **[`showcase-demo`](./examples/showcase-demo)** | **Selectbox chọn demo** (1 màn hình) | **5170** |
| [`default-demo`](./examples/default-demo) | `<Quiz question={...} />` — UI mặc định | 5172 |
| [`tailwind-demo`](./examples/tailwind-demo) | Slot Pattern · Tailwind | 5173 |
| [`bootstrap-demo`](./examples/bootstrap-demo) | Slot Pattern · Bootstrap 5 | 5174 |
| [`mui-demo`](./examples/mui-demo) | Slot Pattern · Material UI | 5175 |
| [`compound-demo`](./examples/compound-demo) | Compound Components · UI default | 5178 |
| [`compound-slot-demo`](./examples/compound-slot-demo) | Slot + Compound Components | 5176 |
| [`tailwind-headless-demo`](./examples/tailwind-headless-demo) | `useQuiz()` · UI custom | 5177 |

- **default** — zero config, giao diện sẵn có của thư viện
- **compound** — chỉ Compound Components, layout tuỳ chỉnh, UI default
- **tailwind / bootstrap / mui** — Slot Pattern
- **compound-slot** — Slot + Compound
- **tailwind-headless** — Headless hook, UI viết tay

## Công nghệ

- React 19
- JavaScript + JSX (không TypeScript)
- Vite (demo apps)
- tsup (build thư viện)
- pnpm (monorepo)
- ESLint + Prettier

## Quick start

Các lệnh dưới dùng `npx pnpm@9` — **không cần cài pnpm global**, chỉ cần Node.js >= 18.

```bash
npx pnpm@9 install
npx pnpm@9 build     # bắt buộc — build thư viện trước khi chạy demo
npx pnpm@9 dev       # showcase — selectbox chọn demo (port 5170)
```

Mở http://localhost:5170, chọn kiểu demo trong dropdown — chỉ demo đó được hiển thị.

Xem [packages/react-headless-quiz/README.md](./packages/react-headless-quiz/README.md) để biết API đầy đủ.

Xem [guide.md](./guide.md) để hiểu các kỹ thuật kiến trúc (Headless UI, Slot Pattern, Compound Components…).

## Yêu cầu

- Node.js >= 18

Nếu đã cài pnpm global, có thể rút gọn `npx pnpm@9` thành `pnpm`.

## Scripts

```bash
npx pnpm@9 build              # Build thư viện react-headless-quiz
npx pnpm@9 dev                # Showcase — tất cả demo (showcase-demo)
npx pnpm@9 dev:showcase       # Showcase — tất cả demo
npx pnpm@9 dev:default        # Demo mặc định
npx pnpm@9 dev:tailwind       # Demo Tailwind (slot)
npx pnpm@9 dev:bootstrap      # Demo Bootstrap (slot)
npx pnpm@9 dev:mui            # Demo MUI (slot)
npx pnpm@9 dev:compound       # Demo Slot + Compound (compound-slot-demo)
npx pnpm@9 dev:compound-only  # Demo chỉ Compound Components
npx pnpm@9 dev:headless       # Demo useQuiz headless
npx pnpm@9 lint               # ESLint toàn repo
npx pnpm@9 format             # Prettier
```

## Xử lý sự cố

**Trang trắng khi mở demo**

1. Chạy `npx pnpm@9 build` để tạo `packages/react-headless-quiz/dist/`
2. Restart server dev (Ctrl+C rồi chạy lại)
3. Hard refresh trình duyệt (Ctrl+Shift+R)
4. Kiểm tra Console (F12) nếu vẫn lỗi

## License

MIT
