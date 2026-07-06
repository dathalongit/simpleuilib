# Hướng dẫn kỹ thuật — react-headless-quiz

Tài liệu này giải thích **các kỹ thuật và pattern** được dùng trong thư viện `react-headless-quiz`, cách chúng phối hợp với nhau, và lý do thiết kế như vậy.

---

## 1. Tổng quan

Thư viện tách rõ hai lớp:

| Lớp | Trách nhiệm | Nằm ở đâu |
|---|---|---|
| **Logic (Headless)** | State, validate đáp án, submit, retry | `hooks/useQuiz.js`, `utils/` |
| **Presentation (UI)** | Render HTML, CSS, layout | Slot components, demo apps |

Project bên ngoài (Tailwind, Bootstrap, MUI…) **chỉ thay UI**, không sửa logic quiz.

```
┌──────────────────────────────────────────────────────────┐
│                     Ứng dụng (Demo)                      │
│   BootstrapInput, TailwindInput, MuiInput …              │
│   ← CSS framework, className, component library          │
└─────────────────────────┬────────────────────────────────┘
                          │ slots={{ Input: MyInput }}
┌─────────────────────────▼────────────────────────────────┐
│                  react-headless-quiz                     │
│   useQuiz() → state                                      │
│   QuizContext → chia sẻ state                            │
│   Compound Components → ghép UI                          │
└──────────────────────────────────────────────────────────┘
```

---

## 2. Headless UI

### Là gì?

**Headless UI** = component/hook **có logic, không có giao diện cố định**. Thư viện không import Tailwind, Bootstrap hay bất kỳ CSS framework nào.

### Trong project

Hook `useQuiz` là lõi headless — **không return JSX**, chỉ return data và hàm:

```js
// hooks/useQuiz.js
export function useQuiz(question) {
  const [answer, setAnswer] = useState('');
  const [status, setStatus] = useState('idle');
  // ...

  return {
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
    submitted,
  };
}
```

Bạn có thể dùng hook này **hoàn toàn tách khỏi** component `<Quiz>`:

```jsx
import { useQuiz } from 'react-headless-quiz';

function MyCustomUI({ question }) {
  const { answer, setAnswer, submit, correct } = useQuiz(question);

  return (
    <div>
      <input value={answer} onChange={(e) => setAnswer(e.target.value)} />
      <button onClick={submit}>Gửi</button>
      {correct && <span>Đúng!</span>}
    </div>
  );
}
```

### Lợi ích

- Một logic — nhiều giao diện (3 demo dùng chung `useQuiz`)
- Dễ test logic mà không cần render DOM phức tạp
- Không bị lock-in vào design system nào

---

## 3. Custom Hooks

### Là gì?

**Custom Hook** = hàm bắt đầu bằng `use`, gom logic có state/side-effect để tái sử dụng.

### Quy tắc trong thư viện

| Hook | Vai trò |
|---|---|
| `useQuiz(question)` | Toàn bộ business logic quiz |
| `useQuizContext()` | Đọc state đã được Provider cung cấp |

Logic nghiệp vụ **chỉ nằm trong `useQuiz`**, không rải rác trong component UI:

```js
// utils/normalizeAnswer.js — pure function, dễ test
export function isAnswerCorrect(userAnswer, expectedAnswer) {
  return normalizeAnswer(userAnswer) === normalizeAnswer(expectedAnswer);
}
```

State machine đơn giản trong hook:

```
idle ──submit──► correct  (disabled, không submit lại)
  │
  └──submit──► wrong      (showHint, showSolution, có retry)
                    │
                    └──retry──► idle
```

---

## 4. Context API

### Là gì?

**Context** cho phép component con đọc dữ liệu **mà không cần truyền props qua nhiều tầng** (prop drilling).

### Cách dùng trong thư viện

```jsx
// context/QuizContext.jsx
const QuizContext = createContext(null);

export function QuizProvider({ question, slots = {}, children }) {
  const quiz = useQuiz(question);

  const value = { question, slots, ...quiz };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuizContext() {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuizContext must be used within a Quiz provider.');
  }
  return context;
}
```

### Luồng dữ liệu

```
QuizProvider
  ├── question      (dữ liệu câu hỏi)
  ├── slots         (custom UI components)
  ├── answer        (từ useQuiz)
  ├── submit/retry  (từ useQuiz)
  └── correct/wrong…  (từ useQuiz)
         │
         ▼
  Question, AnswerInput, SubmitButton …
  (mỗi component gọi useQuizContext())
```

### Lợi ích

- `<Quiz.Question />` không cần nhận 10 props từ parent
- Thêm compound component mới chỉ cần gọi `useQuizContext()`
- Guard rõ ràng: dùng ngoài Provider → throw error

---

## 5. Slot Pattern

### Là gì?

**Slot Pattern** = truyền **component** vào prop `slots` để thay thế từng phần UI, giữ nguyên logic và props contract.

### Cơ chế fallback (3 tầng)

Mỗi phần UI chọn component theo thứ tự ưu tiên:

```jsx
// components/AnswerInput.jsx
const Component = as ?? slots.Input ?? DefaultInput;
```

| Ưu tiên | Nguồn | Ví dụ |
|---|---|---|
| 1 | Prop `as` trên compound component | `<Quiz.AnswerInput as={MyInput} />` |
| 2 | Slot toàn cục | `slots={{ Input: BootstrapInput }}` |
| 3 | Default của thư viện | `DefaultInput` (inline style tối giản) |

### Danh sách slot

| Slot | Props nhận từ thư viện |
|---|---|
| `Container` | `children` |
| `Header` | `question` (object đầy đủ) |
| `Question` | `question`, `disabled`, `correct`, `wrong` |
| `Input` | `value`, `onChange`, `disabled`, `loading`, `placeholder?` |
| `SubmitButton` | `onSubmit`, `disabled`, `loading`, `label?` |
| `Feedback` | `correct`, `wrong`, `submitted` |
| `Hint` | `hint`, `visible` |
| `Solution` | `solution`, `visible` |
| `Footer` | `onRetry`, `visible` |

### Ví dụ thực tế (Bootstrap demo)

Slot **chỉ render UI** — nhận props từ thư viện, tự quyết định className:

```jsx
// examples/bootstrap-demo/src/slots.jsx
export function BootstrapInput({ value, onChange, disabled, loading }) {
  return (
    <input
      type="text"
      value={value}
      disabled={disabled || loading}
      onChange={(event) => onChange(event.target.value)}
      className="form-control form-control-lg mb-3"
    />
  );
}
```

Gắn vào Quiz:

```jsx
<Quiz
  question={sampleQuestion}
  slots={{
    Input: BootstrapInput,
    SubmitButton: BootstrapSubmitButton,
    // ...
  }}
/>
```

### Lợi ích

- Thay **toàn bộ** giao diện mà không fork thư viện
- Contract props rõ ràng — slot biết cần nhận gì
- Cùng một `<Quiz>` — Tailwind demo, Bootstrap demo, MUI demo

---

## 6. Compound Components

### Là gì?

**Compound Components** = nhóm component con gắn vào component cha qua **namespace**, cho phép user tự **sắp xếp layout**.

### Cách implement

Dùng `Object.assign` gắn sub-component vào `Quiz`:

```jsx
// components/Quiz.jsx
export const Quiz = Object.assign(QuizRoot, {
  Question,
  AnswerInput,
  SubmitButton,
  Feedback,
  Hint,
  Solution,
  Footer,
});
```

### Hai chế độ render

`Quiz` tự phát hiện user truyền `children` hay không:

```jsx
function QuizContent({ children }) {
  const hasCompoundChildren =
    Children.count(children) > 0 &&
    Children.toArray(children).some((child) => isValidElement(child));

  if (hasCompoundChildren) {
    return children;           // User tự layout
  }

  return <QuizDefaultLayout />;  // Layout mặc định
}
```

**Chế độ 1 — Mặc định (zero config):**

```jsx
<Quiz question={question} />
```

**Chế độ 2 — Compound (tự sắp xếp):**

```jsx
<Quiz question={question}>
  <Quiz.Question />
  <Quiz.AnswerInput placeholder="Trả lời..." />
  <Quiz.SubmitButton label="Kiểm tra" />
  <Quiz.Feedback />
  <Quiz.Hint />
  <Quiz.Solution />
  <Quiz.Footer />
</Quiz>
```

### Kết hợp Slot + Compound

Có thể dùng **cả hai**: slot toàn cục + compound để sắp xếp:

```jsx
<Quiz question={question} slots={{ Input: TailwindInput }}>
  <div className="flex flex-col gap-4">
    <Quiz.Question />
    <Quiz.AnswerInput />
    <Quiz.SubmitButton />
  </div>
</Quiz>
```

Hoặc override từng phần bằng `as`:

```jsx
<Quiz.AnswerInput as={SpecialInput} />
```

### Lợi ích

- API linh hoạt: nhanh (`<Quiz />`) hoặc tuỳ biến sâu (compound)
- Quen thuộc với dev đã dùng Radix, Reach UI, Chakra (compound pattern)

---

## 7. Separation of Concerns (SoC)

### Nguyên tắc

Mỗi file **một trách nhiệm**:

```
src/
  hooks/useQuiz.js          ← logic state
  utils/normalizeAnswer.js  ← pure functions
  context/QuizContext.jsx   ← chia sẻ state
  components/AnswerInput.jsx ← cầu nối context → slot
  slots/defaults.jsx        ← UI mặc định tối giản
```

| File | Biết gì | Không biết gì |
|---|---|---|
| `useQuiz.js` | Câu trả lời đúng/sai | Bootstrap class, Tailwind |
| `AnswerInput.jsx` | Context + chọn slot | CSS cụ thể |
| `BootstrapInput` (demo) | className Bootstrap | Logic validate |

---

## 8. Single Responsibility Principle (SRP)

Mỗi component con làm **một việc**:

| Component | Một trách nhiệm |
|---|---|
| `Question` | Hiển thị nội dung câu hỏi |
| `AnswerInput` | Ô nhập đáp án |
| `SubmitButton` | Kích hoạt `submit()` |
| `Feedback` | Thông báo đúng/sai |
| `Hint` | Hiện gợi ý khi sai |
| `Solution` | Hiện lời giải khi sai |
| `Footer` | Nút làm lại |

`SubmitButton` thêm logic UI riêng (không thuộc hook):

```jsx
// Khóa nút khi: đang loading, chưa nhập, hoặc đã trả lời đúng
const isLocked = disabled || !answer.trim() || (submitted && correct);
```

Đây là **logic presentation** (khi nào nút bấm được), tách khỏi **logic nghiệp vụ** (submit có hợp lệ không).

---

## 9. Ba cách sử dụng — so sánh

| Cách | Code | Khi nào dùng |
|---|---|---|
| **Mặc định** | `<Quiz question={q} />` | Zero config — xem `default-demo` |
| **Slot Pattern** | `<Quiz slots={{ Input: X }} />` | Thay toàn bộ design system |
| **Headless hook** | `useQuiz(q)` + tự render | UI hoàn toàn custom — xem `tailwind-headless-demo` |
| **Compound** | `<Quiz><Quiz.Question />…</Quiz>` | Tuỳ layout, UI default — xem `compound-demo` |
| **Slot + Compound** | `slots` + `<Quiz><Layout/></Quiz>` | Xem `compound-slot-demo` |

Bắt đầu với **`showcase-demo`** (`npx pnpm@9 dev`) — **selectbox chọn demo**, mỗi lần chỉ hiển thị một pattern.

Chạy showcase: `npx pnpm@9 dev` → http://localhost:5170

#### Tránh conflict khi gộp nhiều demo vào `showcase-demo`

Khi nhiều demo dùng chung một project, các xung đột thường gặp là **CSS global** (Bootstrap reset đè Tailwind), **ThemeProvider MUI** ảnh hưởng toàn trang, và **import chéo** giữa các folder demo.

Showcase áp dụng các kỹ thuật sau:

| Kỹ thuật | Mục đích |
|---|---|
| **Selectbox + một demo tại một thời điểm** | Không mount đồng thời Bootstrap + MUI + compound dark theme |
| **`key={selectedId}`** | Reset state React (quiz, input) khi đổi demo |
| **`React.lazy` + `Suspense`** | Mỗi section là chunk riêng — MUI/Bootstrap chỉ tải khi được chọn |
| **`useDemoStyles(activeId)`** | Inject/gỡ Bootstrap CSS qua `<link>` — không import global trong `main.jsx` |
| **Copy slots vào `showcase-demo/src/slots/`** | Không import `../../tailwind-demo/src/...` — tránh phụ thuộc chéo |
| **CSS scoped** (`.demo-compound-slot { … }`) | Biến và class compound-slot không đè `:root` / `body` |
| **Wrapper `.showcase-isolate`** | Tạo stacking context, tách layer UI từng demo |
| **`ThemeProvider` bọc riêng section MUI** | Không dùng `CssBaseline` global — tránh reset body |

Cấu trúc thư mục showcase:

```
showcase-demo/src/
  App.jsx              ← selectbox + lazy + useDemoStyles
  demoLoaders.js       ← React.lazy từng section
  hooks/useDemoStyles.js
  sections/            ← một file / demo
  slots/               ← copy slot UI, độc lập với demo gốc
  styles/compound-slot.css
```

### Ví dụ: `default-demo`

```jsx
import { Quiz } from 'react-headless-quiz';

const question = {
  id: '1',
  question: 'Thủ đô của Việt Nam là gì?',
  answer: 'Hà Nội',
  hint: 'Thành phố này nằm ở miền Bắc.',
  solution: 'Thủ đô của Việt Nam là Hà Nội.',
};

export default function App() {
  return <Quiz question={question} />;
}
```

Chạy riêng: `npx pnpm@9 dev:default` → http://localhost:5172

### Ví dụ: `compound-demo` (chỉ Compound)

```jsx
<Quiz question={question}>
  <section>
    <Quiz.Question />
  </section>
  <section>
    <Quiz.AnswerInput placeholder="..." />
    <Quiz.SubmitButton label="Kiểm tra" />
  </section>
  <section>
    <Quiz.Feedback />
    <Quiz.Hint />
    <Quiz.Solution />
    <Quiz.Footer />
  </section>
</Quiz>
```

Không truyền `slots` — mỗi `Quiz.*` dùng UI mặc định. CSS bọc ngoài chỉ sắp xếp layout.

Chạy: `npx pnpm@9 dev:compound-only` → http://localhost:5178

### Ví dụ: `tailwind-headless-demo`

```jsx
import { useQuiz } from 'react-headless-quiz';

function CustomQuiz({ question }) {
  const {
    answer, setAnswer, submit, retry,
    correct, wrong, loading, showHint, showSolution, submitted,
  } = useQuiz(question);

  return (
    <article>
      <h2>{question.question}</h2>
      <input value={answer} onChange={(e) => setAnswer(e.target.value)} />
      <button onClick={() => void submit()}>Kiểm tra</button>
      {correct && <p>Đúng!</p>}
      {showHint && <p>Gợi ý: {question.hint}</p>}
      {wrong && <button onClick={retry}>Làm lại</button>}
    </article>
  );
}
```

Chạy: `npx pnpm@9 dev:headless` → http://localhost:5177

### Ví dụ: `compound-slot-demo`

```jsx
// slots — tuỳ biến UI từng phần
const slots = { Container: SlotContainer, Input: SlotInput, /* ... */ };

// layout — compound quyết định bố cục
function CompoundQuizLayout() {
  const { question, slots: ctxSlots } = useQuizContext();
  const Container = ctxSlots.Container;

  return (
    <Container>
      <section>
        <Quiz.Question />
      </section>
      <section className="answer-row">
        <Quiz.AnswerInput as={HighlightInput} />  {/* override 1 phần bằng as */}
        <Quiz.SubmitButton label="Gửi" />
      </section>
      <section>
        <Quiz.Feedback />
        <Quiz.Hint />
        <Quiz.Solution />
        <Quiz.Footer />
      </section>
    </Container>
  );
}

// gắn cả hai pattern
<Quiz question={question} slots={slots}>
  <CompoundQuizLayout />
</Quiz>
```

Chạy: `npx pnpm@9 dev:compound` → http://localhost:5176

---

## 10. Luồng tương tác người dùng

```
1. User gõ đáp án
   → setAnswer() cập nhật state trong useQuiz

2. User bấm "Kiểm tra"
   → SubmitButton gọi submit()
   → useQuiz: loading=true → delay 300ms → so sánh đáp án

3a. Đúng
   → correct=true, disabled=true
   → Feedback hiện "Đúng"
   → Input bị khóa

3b. Sai
   → wrong=true
   → Feedback hiện "Sai"
   → Hint hiện (nếu có question.hint)
   → Solution hiện (nếu có question.solution)
   → Footer hiện nút "Làm lại"

4. User bấm "Làm lại"
   → retry() reset toàn bộ state về idle
```

---

## 11. Mở rộng thư viện

Nhờ kiến trúc trên, mở rộng theo hướng:

| Muốn thêm | Chỗ sửa |
|---|---|
| Slot UI mới (ví dụ `Progress`) | Thêm compound + slot type + default |
| Logic mới (ví dụ đếm số lần thử) | Chỉ sửa `useQuiz.js`, expose qua context |
| UI framework mới | Tạo demo mới với `slots.jsx` riêng |
| Validate phức tạp hơn | Sửa `utils/normalizeAnswer.js` |

**Không cần** sửa demo cũ khi thêm framework mới — chỉ thêm project demo + slot components.

---

## 12. Tài liệu liên quan

- [README.md](./README.md) — Quick start monorepo
- [packages/react-headless-quiz/README.md](./packages/react-headless-quiz/README.md) — API reference
- [require.md](./require.md) — Spec yêu cầu ban đầu

---

## 13. Tóm tắt nhanh

| Kỹ thuật | Một câu |
|---|---|
| **Headless UI** | Logic không dính CSS |
| **Custom Hooks** | `useQuiz` gom toàn bộ state machine |
| **Context API** | Chia sẻ state, tránh prop drilling |
| **Slot Pattern** | Truyền component thay UI, giữ props contract |
| **Compound Components** | `Quiz.Question`, `Quiz.Input`… — layout linh hoạt |
| **SoC / SRP** | Mỗi file một việc, logic tách khỏi presentation |

Đây là các pattern phổ biến trong thư viện React hiện đại (Radix UI, Headless UI, React Aria…). `react-headless-quiz` minh hoạ chúng ở quy mô nhỏ, dễ đọc và dễ mở rộng.
