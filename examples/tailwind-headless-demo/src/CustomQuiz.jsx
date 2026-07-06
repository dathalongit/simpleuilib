import { useQuiz } from 'react-headless-quiz';

/**
 * UI hoàn toàn custom — chỉ dùng hook useQuiz(), không dùng <Quiz>, slots hay compound.
 */
export function CustomQuiz({ question }) {
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
    submitted,
  } = useQuiz(question);

  const canSubmit = !loading && answer.trim() && !(submitted && correct);

  return (
    <article className="relative overflow-hidden rounded-3xl border border-stone-700/80 bg-stone-900 shadow-2xl shadow-black/50">
      <div
        className={`absolute inset-x-0 top-0 h-1 transition-colors duration-500 ${
          correct
            ? 'bg-emerald-400'
            : wrong
              ? 'bg-rose-400'
              : loading
                ? 'bg-amber-400 animate-pulse-ring'
                : 'bg-orange-500'
        }`}
      />

      <div className="border-b border-stone-800 px-6 py-4">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-md bg-orange-500/15 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-orange-400">
            useQuiz()
          </span>
          <span className="text-xs text-stone-500">#{question.id}</span>
        </div>
      </div>

      <div className="space-y-6 px-6 py-6">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-stone-500">
            Câu hỏi
          </p>
          <h2 className="text-xl font-bold leading-snug text-stone-100">
            {question.question}
          </h2>
        </div>

        <div>
          <label
            htmlFor="quiz-answer"
            className="mb-2 block text-xs font-semibold uppercase tracking-widest text-stone-500"
          >
            Câu trả lời của bạn
          </label>
          <input
            id="quiz-answer"
            type="text"
            value={answer}
            disabled={disabled || loading}
            placeholder="Gõ đáp án..."
            onChange={(event) => setAnswer(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && canSubmit) {
                void submit();
              }
            }}
            className="w-full rounded-xl border border-stone-700 bg-stone-950 px-4 py-3.5 text-stone-100 placeholder:text-stone-600 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            disabled={!canSubmit}
            onClick={() => void submit()}
            className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-bold text-stone-950 transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading && (
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-stone-950/30 border-t-stone-950" />
            )}
            {loading ? 'Đang kiểm tra...' : 'Kiểm tra'}
          </button>

          {wrong && (
            <button
              type="button"
              onClick={retry}
              className="rounded-xl border border-stone-600 px-5 py-2.5 text-sm font-semibold text-stone-300 transition hover:border-stone-500 hover:bg-stone-800"
            >
              Làm lại
            </button>
          )}
        </div>

        {submitted && (
          <div
            className={`rounded-xl border px-4 py-3 ${
              correct
                ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                : 'border-rose-500/40 bg-rose-500/10 text-rose-300'
            }`}
          >
            <p className="font-bold">
              {correct ? 'Chính xác!' : 'Chưa đúng!'}
            </p>
          </div>
        )}

        {showHint && (
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-amber-200">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-400/80">
              Gợi ý
            </p>
            <p className="mt-1 text-sm">{question.hint}</p>
          </div>
        )}

        {showSolution && (
          <div className="rounded-xl border border-sky-500/30 bg-sky-500/10 px-4 py-3 text-sky-200">
            <p className="text-xs font-bold uppercase tracking-wider text-sky-400/80">
              Lời giải
            </p>
            <p className="mt-1 text-sm">{question.solution}</p>
          </div>
        )}
      </div>

      <footer className="border-t border-stone-800 bg-stone-950/50 px-6 py-3">
        <p className="font-mono text-[11px] text-stone-600">
          Hook state: submitted={String(submitted)} · correct={String(correct)}{' '}
          · wrong={String(wrong)} · loading={String(loading)}
        </p>
      </footer>
    </article>
  );
}
