import { useCallback, useState } from 'react';

export function CodeSample({ code, title = 'Mã nguồn minh hoạ' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [code]);

  return (
    <div className="code-sample">
      <div className="code-sample-head">
        <h3>{title}</h3>
        <button type="button" className="code-copy-btn" onClick={handleCopy}>
          {copied ? 'Đã copy!' : 'Copy code'}
        </button>
      </div>
      <pre className="code-sample-pre">
        <code>{code}</code>
      </pre>
    </div>
  );
}
