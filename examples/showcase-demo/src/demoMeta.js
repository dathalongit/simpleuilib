/** Giới thiệu + mã minh hoạ cho từng kiểu demo — cập nhật khi selectbox đổi */

export const DEMO_META = {
  default: {
    title: 'Default — UI mặc định',
    tag: 'Zero config',
    summary: 'Dùng ngay giao diện có sẵn của thư viện, không cần tuỳ biến.',
    intro:
      'Cách đơn giản nhất để tích hợp quiz. Thư viện render toàn bộ UI (câu hỏi, ô nhập, nút gửi, feedback, gợi ý, lời giải) — bạn chỉ truyền prop question.',
    whenToUse: [
      'Prototype nhanh hoặc MVP',
      'Không cần brand/design system riêng',
      'Muốn ít code nhất có thể',
    ],
    features: [
      'Không cần slots, compound hay custom CSS',
      'Logic quiz (submit, hint, retry) xử lý sẵn bên trong',
    ],
    runCommand: 'npx pnpm@9 dev:default',
    runUrl: 'http://localhost:5172',
    code: `import { Quiz } from 'react-headless-quiz';

const question = {
  id: '1',
  question: 'Thủ đô của Việt Nam là gì?',
  answer: 'Hà Nội',
  hint: 'Thành phố này nằm ở miền Bắc.',
  solution: 'Thủ đô của Việt Nam là Hà Nội.',
};

export default function App() {
  return <Quiz question={question} />;
}`,
  },

  compound: {
    title: 'Compound Components',
    tag: 'Layout tuỳ chỉnh',
    summary: 'Tuỳ bố cục bằng Quiz.Question, Quiz.AnswerInput… — giữ UI mặc định.',
    intro:
      'Compound Components cho phép bạn sắp xếp lại các phần của quiz (câu hỏi, input, feedback…) theo layout riêng, trong khi vẫn dùng giao diện mặc định của thư viện. Không cần truyền prop slots.',
    whenToUse: [
      'Cần chia quiz thành nhiều section/block',
      'Muốn đặt input và nút submit trên cùng một hàng',
      'Chưa cần thay design system — chỉ thay layout',
    ],
    features: [
      'Quiz.Question, Quiz.AnswerInput, Quiz.SubmitButton, Quiz.Feedback…',
      'Props như placeholder, label truyền trực tiếp lên compound child',
    ],
    compoundBg: true,
    runCommand: 'npx pnpm@9 dev:compound-only',
    runUrl: 'http://localhost:5178',
    code: `import { Quiz } from 'react-headless-quiz';

export default function App() {
  return (
    <Quiz question={question}>
      <section>
        <p>Câu hỏi</p>
        <Quiz.Question />
      </section>

      <section>
        <p>Trả lời</p>
        <Quiz.AnswerInput placeholder="Nhập đáp án..." />
        <Quiz.SubmitButton label="Kiểm tra" />
      </section>

      <section>
        <Quiz.Feedback />
        <Quiz.Hint />
        <Quiz.Solution />
        <Quiz.Footer />
      </section>
    </Quiz>
  );
}`,
  },

  tailwind: {
    title: 'Slot · Tailwind CSS',
    tag: 'Slot Pattern',
    summary: 'Thay toàn bộ UI bằng component Tailwind qua prop slots.',
    intro:
      'Slot Pattern tách logic quiz khỏi presentation. Bạn viết các component React (Container, Input, Button…) với class Tailwind, rồi truyền vào prop slots. Logic submit/feedback vẫn do thư viện quản lý.',
    whenToUse: [
      'Dự án dùng Tailwind CSS',
      'Cần giao diện brand riêng nhưng không viết lại logic quiz',
      'Muốn tái sử dụng cùng logic với nhiều theme',
    ],
    features: [
      'Slot: Container, Header, Question, Input, SubmitButton, Feedback, Hint, Solution, Footer',
      'Mỗi slot nhận props từ thư viện (value, onChange, loading, visible…)',
    ],
    runCommand: 'npx pnpm@9 dev:tailwind',
    runUrl: 'http://localhost:5173',
    code: `import { Quiz } from 'react-headless-quiz';
import {
  TailwindContainer,
  TailwindInput,
  TailwindSubmitButton,
  // ... các slot khác
} from './slots.jsx';

export default function App() {
  return (
    <Quiz
      question={question}
      slots={{
        Container: TailwindContainer,
        Input: TailwindInput,
        SubmitButton: TailwindSubmitButton,
        // Feedback, Hint, Solution, Footer...
      }}
    />
  );
}

// Ví dụ slot Input — nhận props từ thư viện
export function TailwindInput({ value, onChange, disabled, loading }) {
  return (
    <input
      value={value}
      disabled={disabled || loading}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border px-4 py-3"
    />
  );
}`,
  },

  bootstrap: {
    title: 'Slot · Bootstrap 5',
    tag: 'Slot Pattern',
    summary: 'Cùng Slot Pattern — giao diện dùng class Bootstrap 5.',
    intro:
      'Giống demo Tailwind nhưng slot component dùng class Bootstrap (form-control, btn, alert…). Chứng minh thư viện headless không phụ thuộc CSS framework — chỉ cần map slot sang component của bạn.',
    whenToUse: [
      'Dự án đã có Bootstrap 5',
      'Team quen form-control, btn-primary, alert',
      'Muốn đồng bộ quiz với UI Bootstrap hiện có',
    ],
    features: [
      'Cùng API slots như Tailwind/MUI demo',
      'Bootstrap CSS chỉ load khi demo này active (tránh conflict global)',
    ],
    runCommand: 'npx pnpm@9 dev:bootstrap',
    runUrl: 'http://localhost:5174',
    code: `import { Quiz } from 'react-headless-quiz';
import {
  BootstrapContainer,
  BootstrapInput,
  BootstrapSubmitButton,
  // ...
} from './slots.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <Quiz
      question={question}
      slots={{
        Container: BootstrapContainer,
        Input: BootstrapInput,
        SubmitButton: BootstrapSubmitButton,
        // ...
      }}
    />
  );
}

export function BootstrapInput({ value, onChange, disabled, loading }) {
  return (
    <input
      type="text"
      value={value}
      disabled={disabled || loading}
      onChange={(e) => onChange(e.target.value)}
      className="form-control form-control-lg mb-3"
    />
  );
}`,
  },

  mui: {
    title: 'Slot · Material UI',
    tag: 'Slot Pattern',
    summary: 'Slot Pattern với component MUI (TextField, Button, Alert…).',
    intro:
      'Map từng slot sang component Material UI. Bọc ThemeProvider quanh vùng quiz để theme MUI không ảnh hưởng toàn app. Phù hợp dự án React đã dùng @mui/material.',
    whenToUse: [
      'Design system chính là Material UI',
      'Cần TextField, Button, Alert, Paper… có sẵn accessibility',
      'Muốn đồng bộ palette/theme MUI',
    ],
    features: [
      'Slot dùng TextField, Button, Alert, Paper, Chip…',
      'ThemeProvider scope riêng — không CssBaseline global',
    ],
    runCommand: 'npx pnpm@9 dev:mui',
    runUrl: 'http://localhost:5175',
    code: `import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Quiz } from 'react-headless-quiz';
import { MuiContainer, MuiInput, MuiSubmitButton } from './slots.jsx';

const theme = createTheme({ palette: { primary: { main: '#7c3aed' } } });

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Quiz
        question={question}
        slots={{
          Container: MuiContainer,
          Input: MuiInput,
          SubmitButton: MuiSubmitButton,
          // ...
        }}
      />
    </ThemeProvider>
  );
}`,
  },

  'compound-slot': {
    title: 'Slot + Compound',
    tag: 'Kết hợp',
    summary: 'slots tuỳ UI + Quiz.* tuỳ layout — linh hoạt nhất.',
    intro:
      'Kết hợp hai pattern: slots định nghĩa giao diện từng phần (Input, Button…), Compound Components (Quiz.Question, Quiz.AnswerInput…) quyết định bố cục. Prop as trên compound cho phép override một slot cụ thể (ví dụ HighlightInput).',
    whenToUse: [
      'Cần layout phức tạp (grid, nhiều section)',
      'Muốn custom UI + custom cấu trúc DOM',
      'Demo prop as — thay component cho một compound child',
    ],
    features: [
      'useQuizContext() để lấy question và slots trong layout custom',
      'Quiz.AnswerInput as={HighlightInput} — override input riêng',
    ],
    runCommand: 'npx pnpm@9 dev:compound',
    runUrl: 'http://localhost:5176',
    code: `import { Quiz, useQuizContext } from 'react-headless-quiz';
import { SlotContainer, SlotInput, HighlightInput } from './slots.jsx';

const slots = { Container: SlotContainer, Input: SlotInput /* ... */ };

function CustomLayout() {
  const { question, slots: ctxSlots } = useQuizContext();
  const Container = ctxSlots.Container;

  return (
    <Container>
      <section>
        <Quiz.Question />
      </section>
      <section>
        <Quiz.AnswerInput as={HighlightInput} />
        <Quiz.SubmitButton label="Gửi" />
      </section>
      <section>
        <Quiz.Feedback />
        <Quiz.Hint />
        <Quiz.Footer />
      </section>
    </Container>
  );
}

export default function App() {
  return (
    <Quiz question={question} slots={slots}>
      <CustomLayout />
    </Quiz>
  );
}`,
  },

  headless: {
    title: 'Headless Hook · useQuiz()',
    tag: 'UI 100% custom',
    summary: 'Chỉ dùng hook useQuiz() — tự viết toàn bộ JSX/CSS.',
    intro:
      'Mức headless cao nhất: không dùng component Quiz, không slots, không compound. Hook useQuiz(question) trả về state (answer, submit, correct, loading…) và bạn tự render UI hoàn toàn. Phù hợp khi design không khớp cấu trúc slot mặc định.',
    whenToUse: [
      'UI đặc biệt — không map được vào slot',
      'Cần kiểm soát 100% DOM và animation',
      'Tích hợp vào component/form phức tạp có sẵn',
    ],
    features: [
      'useQuiz trả về: answer, setAnswer, submit, retry, correct, wrong, loading, showHint, showSolution…',
      'Không phụ thuộc cấu trúc Quiz component',
    ],
    dark: true,
    runCommand: 'npx pnpm@9 dev:headless',
    runUrl: 'http://localhost:5177',
    code: `import { useQuiz } from 'react-headless-quiz';

export function CustomQuiz({ question }) {
  const {
    answer,
    setAnswer,
    submit,
    retry,
    correct,
    wrong,
    loading,
    disabled,
    showHint,
    showSolution,
    submitted,
  } = useQuiz(question);

  return (
    <article>
      <h2>{question.question}</h2>

      <input
        value={answer}
        disabled={disabled || loading}
        onChange={(e) => setAnswer(e.target.value)}
      />

      <button onClick={() => void submit()} disabled={loading}>
        {loading ? 'Đang kiểm tra...' : 'Kiểm tra'}
      </button>

      {submitted && <p>{correct ? 'Đúng!' : 'Sai!'}</p>}
      {showHint && <p>Gợi ý: {question.hint}</p>}
      {wrong && <button onClick={retry}>Làm lại</button>}
    </article>
  );
}`,
  },
};

/** Thứ tự học từ dễ → khó — đồng bộ với số thứ tự trên showcase */
export const DEMO_ORDER = [
  'default',        // 1 — zero config
  'compound',       // 2 — tuỳ layout
  'tailwind',       // 3 — slot pattern
  'bootstrap',      // 4 — slot + Bootstrap
  'mui',            // 5 — slot + MUI
  'compound-slot',  // 6 — slot + compound
  'headless',       // 7 — useQuiz() full custom
];
