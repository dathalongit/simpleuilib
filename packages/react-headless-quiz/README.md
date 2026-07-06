# react-headless-quiz

Thư viện React **headless** minh hoạ kiến trúc **Slot Pattern + Compound Components**. Toàn bộ logic quiz nằm trong thư viện; giao diện do project sử dụng quyết định (Tailwind, Bootstrap, MUI, Ant Design, v.v.).

## Giới thiệu

`react-headless-quiz` là thư viện demo kiến trúc, không phải hệ thống quiz hoàn chỉnh. Nó hỗ trợ **một câu hỏi đơn giản** với:

- Ô nhập đáp án
- Nút kiểm tra
- Phản hồi đúng / sai
- Gợi ý và lời giải (tuỳ chọn)
- Nút làm lại

Mục tiêu: chứng minh cách tách **Business Logic** và **Presentation (UI)**.

## Kiến trúc

| Nguyên tắc | Mô tả |
|---|---|
| Headless UI | Logic không phụ thuộc CSS framework |
| Slot Pattern | Thay thế từng phần giao diện qua `slots` prop |
| Compound Components | `<Quiz.Question />`, `<Quiz.AnswerInput />`, ... |
| Context API | Tránh truyền props nhiều tầng |
| Custom Hooks | `useQuiz()` chỉ chứa logic, không render UI |
| Separation of Concerns | Mỗi file một trách nhiệm rõ ràng |

```
┌─────────────────────────────────────────┐
│              Quiz (Root)                │
│  ┌───────────────────────────────────┐  │
│  │         QuizProvider              │  │
│  │  useQuiz(question) → state        │  │
│  │  QuizContext                      │  │
│  └───────────────────────────────────┘  │
│         │                    │          │
│   Slot Pattern          Compound Comps   │
│   slots={{ Input }}     <Quiz.Input />   │
└─────────────────────────────────────────┘
```

## Cấu trúc thư mục

```text
packages/react-headless-quiz/
  src/
    components/     # Quiz.jsx, Question.jsx, AnswerInput.jsx, ...
    context/        # QuizContext.jsx
    hooks/          # useQuiz.js
    slots/          # defaults.jsx + default UI
    utils/          # normalizeAnswer.js
    index.js
```

Viết bằng **JavaScript thuần (React + JSX)**, không dùng TypeScript. Không cung cấp file `.d.ts`.

## Công nghệ

| Công cụ | Vai trò |
|---|---|
| React 19 | UI runtime |
| JavaScript + JSX | Ngôn ngữ (không TypeScript) |
| tsup | Build thư viện → ESM + CJS |
| pnpm | Quản lý monorepo |
| Vite | Chạy các demo app |
| ESLint + Prettier | Lint & format |

Build dùng JSX automatic runtime (`react/jsx-runtime`), không phụ thuộc biến global `React`.

## Cài đặt

```bash
pnpm add react-headless-quiz
```

Peer dependencies: `react` và `react-dom` ^19.

## Sử dụng cơ bản

### Giao diện mặc định

```jsx
import { Quiz } from 'react-headless-quiz';

const question = {
  id: '1',
  question: 'Thủ đô của Việt Nam là gì?',
  answer: 'Hà Nội',
  hint: 'Thành phố này nằm ở miền Bắc.',
  solution: 'Thủ đô của Việt Nam là Hà Nội.',
};

export function App() {
  return <Quiz question={question} />;
}
```

### Slot Pattern — tuỳ biến toàn bộ UI

```jsx
<Quiz
  question={question}
  slots={{
    Container: MyContainer,
    Header: MyHeader,
    Question: MyQuestion,
    Input: MyInput,
    SubmitButton: MySubmitButton,
    Feedback: MyFeedback,
    Hint: MyHint,
    Solution: MySolution,
    Footer: MyFooter,
  }}
/>
```

Mỗi slot nhận props cần thiết từ thư viện. Nếu không truyền slot, component mặc định được dùng:

```jsx
const InputComponent = slots.Input ?? DefaultInput;
```

### Compound Components

```jsx
<Quiz question={question}>
  <Quiz.Question />
  <Quiz.AnswerInput />
  <Quiz.SubmitButton />
  <Quiz.Feedback />
  <Quiz.Hint />
  <Quiz.Solution />
  <Quiz.Footer />
</Quiz>
```

Kết hợp với slot toàn cục hoặc prop `as` trên từng compound component.

## Hook `useQuiz`

Hook headless — dùng khi bạn tự render UI hoàn toàn:

```jsx
import { useQuiz } from 'react-headless-quiz';

function CustomQuiz({ question }) {
  const {
    answer,
    setAnswer,
    submit,
    retry,
    correct,
    wrong,
    disabled,
    loading,
    showHint,
    showSolution,
  } = useQuiz(question);

  // submitted — true sau khi người dùng đã bấm kiểm tra

  // Render UI của bạn...
}
```

## API

### `question` object

```js
{
  id: string,
  question: string,
  answer: string,
  hint?: string,      // tuỳ chọn
  solution?: string,  // tuỳ chọn
}
```

### `Quiz` props

| Prop | Mô tả |
|---|---|
| `question` | Dữ liệu câu hỏi |
| `slots` | Custom slot components |
| `children` | Compound components |

### Slots

| Slot | Props chính |
|---|---|
| `Container` | `children` |
| `Header` | `question` |
| `Question` | `question`, `disabled`, `correct`, `wrong` |
| `Input` | `value`, `onChange`, `disabled`, `loading` |
| `SubmitButton` | `onSubmit`, `disabled`, `loading` |
| `Feedback` | `correct`, `wrong`, `submitted` |
| `Hint` | `hint`, `visible` |
| `Solution` | `solution`, `visible` |
| `Footer` | `onRetry`, `visible` |

### Compound components

- `Quiz.Question`
- `Quiz.AnswerInput`
- `Quiz.SubmitButton`
- `Quiz.Feedback`
- `Quiz.Hint`
- `Quiz.Solution`
- `Quiz.Footer`

### Context

```jsx
import { useQuizContext } from 'react-headless-quiz';
```

### Export chính

```js
// Components
Quiz, Question, AnswerInput, SubmitButton, Feedback, Hint, Solution, Footer

// Context & hooks
QuizProvider, useQuizContext, useQuiz

// Default slots (tuỳ biến hoặc tham khảo)
DefaultContainer, DefaultHeader, DefaultQuestion, DefaultInput,
DefaultSubmitButton, DefaultFeedback, DefaultHint, DefaultSolution, DefaultFooter

// Utils
normalizeAnswer, isAnswerCorrect
```

## Demo

Monorepo có 7 ví dụ (+ **showcase** gom tất cả). Trong repo, dùng `npx pnpm@9` (không cần cài pnpm global).

```bash
npx pnpm@9 install
npx pnpm@9 build          # bắt buộc trước khi chạy demo

npx pnpm@9 dev            # showcase — selectbox chọn demo (port 5170)
npx pnpm@9 dev:default    # http://localhost:5172
npx pnpm@9 dev:tailwind   # http://localhost:5173
npx pnpm@9 dev:bootstrap  # http://localhost:5174
npx pnpm@9 dev:mui        # http://localhost:5175
npx pnpm@9 dev:compound      # http://localhost:5176 (slot + compound)
npx pnpm@9 dev:compound-only # http://localhost:5178 (chỉ compound)
npx pnpm@9 dev:headless      # http://localhost:5177
```

> **Lưu ý:** Phải `npx pnpm@9 build` thư viện trước. Nếu port bị chiếm, Vite chọn port khác — xem URL trong terminal.

## Phát triển

```bash
npx pnpm@9 install
npx pnpm@9 --filter react-headless-quiz build
npx pnpm@9 --filter react-headless-quiz dev   # watch mode — tự build lại khi sửa src/
```

Sau khi sửa mã thư viện, chạy lại `build` (hoặc dùng `dev` watch) rồi refresh demo.

Build bằng [tsup](https://tsup.egoist.dev/) (ESM + CJS, JSX automatic runtime, không sinh `.d.ts`).

## Publish npm

1. Cập nhật `version` trong `packages/react-headless-quiz/package.json`
2. Build: `npx pnpm@9 --filter react-headless-quiz build`
3. Đăng nhập npm: `npm login`
4. Publish từ thư mục package:

```bash
cd packages/react-headless-quiz
npm publish --access public
```

Đảm bảo trường `files` chỉ gồm `dist/`. Kiểm tra trước khi publish:

```bash
npm pack --dry-run
```

## License

MIT
