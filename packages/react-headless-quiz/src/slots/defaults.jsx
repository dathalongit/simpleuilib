const baseStyles = {
  fontFamily: 'system-ui, sans-serif',
};

export function DefaultContainer({ children }) {
  return (
    <div
      style={{
        ...baseStyles,
        maxWidth: 480,
        margin: '0 auto',
        padding: 24,
        border: '1px solid #e5e7eb',
        borderRadius: 8,
        background: '#fff',
      }}
    >
      {children}
    </div>
  );
}

export function DefaultHeader({ question }) {
  return (
    <header style={{ marginBottom: 16 }}>
      <p style={{ margin: 0, fontSize: 12, color: '#6b7280' }}>Quiz #{question.id}</p>
    </header>
  );
}

export function DefaultQuestion({ question, disabled }) {
  return (
    <p
      style={{
        margin: '0 0 16px',
        fontSize: 18,
        fontWeight: 600,
        color: disabled ? '#9ca3af' : '#111827',
      }}
    >
      {question}
    </p>
  );
}

export function DefaultInput({
  value,
  onChange,
  disabled,
  loading,
  placeholder = 'Nhập câu trả lời...',
}) {
  return (
    <input
      type="text"
      value={value}
      disabled={disabled || loading}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
      style={{
        width: '100%',
        boxSizing: 'border-box',
        padding: '10px 12px',
        marginBottom: 12,
        border: '1px solid #d1d5db',
        borderRadius: 6,
        fontSize: 14,
      }}
    />
  );
}

export function DefaultSubmitButton({
  onSubmit,
  disabled,
  loading,
  label = 'Kiểm tra',
}) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      onClick={onSubmit}
      style={{
        padding: '10px 16px',
        border: 'none',
        borderRadius: 6,
        background: disabled || loading ? '#9ca3af' : '#2563eb',
        color: '#fff',
        fontSize: 14,
        fontWeight: 600,
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
      }}
    >
      {loading ? 'Đang kiểm tra...' : label}
    </button>
  );
}

export function DefaultFeedback({ correct, wrong, submitted }) {
  if (!submitted) {
    return null;
  }

  if (correct) {
    return (
      <p style={{ margin: '16px 0 0', color: '#059669', fontWeight: 600 }}>Đúng!</p>
    );
  }

  if (wrong) {
    return (
      <p style={{ margin: '16px 0 0', color: '#dc2626', fontWeight: 600 }}>Sai!</p>
    );
  }

  return null;
}

export function DefaultHint({ hint, visible }) {
  if (!visible) {
    return null;
  }

  return (
    <aside
      style={{
        marginTop: 12,
        padding: 12,
        background: '#fef3c7',
        borderRadius: 6,
        fontSize: 14,
        color: '#92400e',
      }}
    >
      <strong>Gợi ý:</strong> {hint}
    </aside>
  );
}

export function DefaultSolution({ solution, visible }) {
  if (!visible) {
    return null;
  }

  return (
    <aside
      style={{
        marginTop: 12,
        padding: 12,
        background: '#dbeafe',
        borderRadius: 6,
        fontSize: 14,
        color: '#1e40af',
      }}
    >
      <strong>Lời giải:</strong> {solution}
    </aside>
  );
}

export function DefaultFooter({ onRetry, visible }) {
  if (!visible) {
    return null;
  }

  return (
    <footer style={{ marginTop: 16 }}>
      <button
        type="button"
        onClick={onRetry}
        style={{
          padding: '8px 14px',
          border: '1px solid #d1d5db',
          borderRadius: 6,
          background: '#fff',
          fontSize: 14,
          cursor: 'pointer',
        }}
      >
        Làm lại
      </button>
    </footer>
  );
}
