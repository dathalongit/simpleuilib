import { Quiz } from 'react-headless-quiz';
import { sampleQuestion } from './question.js';
import {
  TailwindContainer,
  TailwindFeedback,
  TailwindFooter,
  TailwindHeader,
  TailwindHint,
  TailwindInput,
  TailwindQuestion,
  TailwindSolution,
  TailwindSubmitButton,
} from './slots.jsx';

export default function App() {
  return (
    <main className="min-h-screen px-4 pb-16">
      <div className="mx-auto max-w-lg pt-10 text-center">
        <h1 className="text-3xl font-bold text-slate-900">Tailwind Demo</h1>
        <p className="mt-2 text-slate-600">
          Cùng logic quiz, giao diện tuỳ biến bằng Tailwind CSS.
        </p>
      </div>

      <Quiz
        question={sampleQuestion}
        slots={{
          Container: TailwindContainer,
          Header: TailwindHeader,
          Question: TailwindQuestion,
          Input: TailwindInput,
          SubmitButton: TailwindSubmitButton,
          Feedback: TailwindFeedback,
          Hint: TailwindHint,
          Solution: TailwindSolution,
          Footer: TailwindFooter,
        }}
      />
    </main>
  );
}
