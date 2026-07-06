import { Quiz } from 'react-headless-quiz';
import { sampleQuestion } from './question.js';
import {
  BootstrapContainer,
  BootstrapFeedback,
  BootstrapFooter,
  BootstrapHeader,
  BootstrapHint,
  BootstrapInput,
  BootstrapQuestion,
  BootstrapSolution,
  BootstrapSubmitButton,
} from './slots.jsx';

export default function App() {
  return (
    <main className="container py-5">
      <div className="text-center mb-4">
        <h1 className="display-6 fw-bold">Bootstrap Demo</h1>
        <p className="text-muted">Cùng logic quiz, giao diện tuỳ biến bằng Bootstrap 5.</p>
      </div>

      <Quiz
        question={sampleQuestion}
        slots={{
          Container: BootstrapContainer,
          Header: BootstrapHeader,
          Question: BootstrapQuestion,
          Input: BootstrapInput,
          SubmitButton: BootstrapSubmitButton,
          Feedback: BootstrapFeedback,
          Hint: BootstrapHint,
          Solution: BootstrapSolution,
          Footer: BootstrapFooter,
        }}
      />
    </main>
  );
}
