import { CustomQuiz } from './CustomQuiz.jsx';
import { sampleQuestion } from './question.js';

export default function App() {
  return (
    <main className="min-h-screen px-4 py-12">
      <div className="mx-auto mb-10 max-w-lg text-center">
        <span className="mb-3 inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-xs font-semibold text-orange-400">
          Headless Hook · UI 100% custom
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-stone-100">
          Tailwind Headless Demo
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-stone-400">
          Chỉ import <code className="text-orange-400">useQuiz</code> — không dùng{' '}
          <code className="text-stone-500">&lt;Quiz&gt;</code>, slots hay compound
          components. Toàn bộ JSX + Tailwind viết tay trong demo.
        </p>
      </div>

      <div className="mx-auto max-w-lg">
        <CustomQuiz question={sampleQuestion} />
      </div>
    </main>
  );
}
