export function TailwindContainer({ children }) {
  return (
    <div className="mx-auto mt-12 max-w-lg rounded-2xl border border-indigo-100 bg-white p-8 shadow-xl shadow-indigo-100/50">
      {children}
    </div>
  );
}

export function TailwindHeader({ question }) {
  return (
    <header className="mb-4">
      <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
        Câu hỏi #{question.id}
      </span>
    </header>
  );
}

export function TailwindQuestion({ question }) {
  return <h2 className="mb-6 text-2xl font-bold text-slate-800">{question}</h2>;
}

export function TailwindInput({ value, onChange, disabled, loading }) {
  return (
    <input
      type="text"
      value={value}
      disabled={disabled || loading}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Nhập câu trả lời..."
      className="mb-4 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-800 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 disabled:bg-slate-50"
    />
  );
}

export function TailwindSubmitButton({ onSubmit, disabled, loading }) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      onClick={onSubmit}
      className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
    >
      {loading ? 'Đang kiểm tra...' : 'Kiểm tra'}
    </button>
  );
}

export function TailwindFeedback({ correct, wrong, submitted }) {
  if (!submitted) return null;

  if (correct) {
    return (
      <p className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 font-semibold text-emerald-700">
        Chính xác!
      </p>
    );
  }

  if (wrong) {
    return (
      <p className="mt-4 rounded-xl bg-rose-50 px-4 py-3 font-semibold text-rose-700">
        Chưa đúng, thử lại nhé!
      </p>
    );
  }

  return null;
}

export function TailwindHint({ hint, visible }) {
  if (!visible) return null;

  return (
    <aside className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900">
      <span className="font-semibold">Gợi ý:</span> {hint}
    </aside>
  );
}

export function TailwindSolution({ solution, visible }) {
  if (!visible) return null;

  return (
    <aside className="mt-4 rounded-xl border border-sky-200 bg-sky-50 px-4 py-3 text-sky-900">
      <span className="font-semibold">Lời giải:</span> {solution}
    </aside>
  );
}

export function TailwindFooter({ onRetry, visible }) {
  if (!visible) return null;

  return (
    <footer className="mt-6">
      <button
        type="button"
        onClick={onRetry}
        className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
      >
        Làm lại
      </button>
    </footer>
  );
}
