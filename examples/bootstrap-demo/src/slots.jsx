export function BootstrapContainer({ children }) {
  return (
    <div className="card shadow-sm border-0 mx-auto mt-5" style={{ maxWidth: 520 }}>
      <div className="card-body p-4">{children}</div>
    </div>
  );
}

export function BootstrapHeader({ question }) {
  return (
    <header className="mb-3">
      <span className="badge text-bg-primary">Câu hỏi #{question.id}</span>
    </header>
  );
}

export function BootstrapQuestion({ question }) {
  return <h2 className="h4 fw-bold mb-4">{question}</h2>;
}

export function BootstrapInput({ value, onChange, disabled, loading }) {
  return (
    <input
      type="text"
      value={value}
      disabled={disabled || loading}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Nhập câu trả lời..."
      className="form-control form-control-lg mb-3"
    />
  );
}

export function BootstrapSubmitButton({ onSubmit, disabled, loading }) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      onClick={onSubmit}
      className="btn btn-primary btn-lg"
    >
      {loading ? 'Đang kiểm tra...' : 'Kiểm tra'}
    </button>
  );
}

export function BootstrapFeedback({ correct, wrong, submitted }) {
  if (!submitted) return null;

  if (correct) {
    return <div className="alert alert-success mt-3 mb-0 fw-semibold">Chính xác!</div>;
  }

  if (wrong) {
    return <div className="alert alert-danger mt-3 mb-0 fw-semibold">Chưa đúng!</div>;
  }

  return null;
}

export function BootstrapHint({ hint, visible }) {
  if (!visible) return null;

  return (
    <aside className="alert alert-warning mt-3 mb-0">
      <strong>Gợi ý:</strong> {hint}
    </aside>
  );
}

export function BootstrapSolution({ solution, visible }) {
  if (!visible) return null;

  return (
    <aside className="alert alert-info mt-3 mb-0">
      <strong>Lời giải:</strong> {solution}
    </aside>
  );
}

export function BootstrapFooter({ onRetry, visible }) {
  if (!visible) return null;

  return (
    <footer className="mt-4">
      <button type="button" onClick={onRetry} className="btn btn-outline-secondary">
        Làm lại
      </button>
    </footer>
  );
}
