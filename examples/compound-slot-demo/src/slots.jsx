/** Slot components — custom UI, nhận props từ thư viện */

export function SlotContainer({ children }) {
  return <div className="quiz-shell">{children}</div>;
}

export function SlotHeader({ question }) {
  return (
    <div className="quiz-top">
      <p className="badge-id">
        Compound + Slot Demo · Câu <strong>#{question.id}</strong>
      </p>
    </div>
  );
}

export function SlotQuestion({ question }) {
  return <p className="question-text">{question}</p>;
}

export function SlotInput({ value, onChange, disabled, loading, placeholder }) {
  return (
    <input
      type="text"
      className="quiz-input"
      value={value}
      disabled={disabled || loading}
      placeholder={placeholder ?? 'Nhập đáp án...'}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}

export function SlotSubmitButton({ onSubmit, disabled, loading, label }) {
  return (
    <button
      type="button"
      className="quiz-btn"
      disabled={disabled || loading}
      onClick={onSubmit}
    >
      {loading ? 'Đang kiểm tra...' : (label ?? 'Kiểm tra')}
    </button>
  );
}

export function SlotFeedback({ correct, wrong, submitted }) {
  if (!submitted) {
    return <p className="feedback-msg" style={{ color: 'var(--muted)' }}>Chưa gửi đáp án</p>;
  }

  if (correct) {
    return <p className="feedback-msg feedback-msg--ok">Chính xác!</p>;
  }

  if (wrong) {
    return <p className="feedback-msg feedback-msg--err">Chưa đúng — xem gợi ý bên dưới</p>;
  }

  return null;
}

export function SlotHint({ hint, visible }) {
  if (!visible) return null;

  return (
    <aside className="hint-box">
      <strong>Gợi ý:</strong> {hint}
    </aside>
  );
}

export function SlotSolution({ solution, visible }) {
  if (!visible) return null;

  return (
    <aside className="solution-box">
      <strong>Lời giải:</strong> {solution}
    </aside>
  );
}

export function SlotFooter({ onRetry, visible }) {
  if (!visible) return null;

  return (
    <div className="footer-row">
      <button type="button" className="quiz-btn quiz-btn--ghost" onClick={onRetry}>
        Làm lại
      </button>
    </div>
  );
}

/** Input đặc biệt — demo prop `as` trên compound component */
export function HighlightInput(props) {
  return (
    <div>
      <p className="section-label" style={{ color: 'var(--accent)' }}>
        Ô nhập tuỳ biến (prop as)
      </p>
      <SlotInput {...props} placeholder="Ví dụ: 4" />
    </div>
  );
}
