export function DemoIntro({ meta, total }) {
  return (
    <div className="demo-intro">
      {meta.order != null && total != null && (
        <p className="demo-intro-step">
          Demo {meta.order}/{total}
        </p>
      )}
      <p className="demo-intro-summary">{meta.summary}</p>
      <p className="demo-intro-text">{meta.intro}</p>

      <div className="demo-intro-grid">
        <div className="demo-intro-block">
          <h3>Khi nào dùng</h3>
          <ul>
            {meta.whenToUse.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="demo-intro-block">
          <h3>Điểm chính</h3>
          <ul>
            {meta.features.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {meta.runCommand && (
        <p className="demo-run-hint">
          Chạy demo riêng:{' '}
          <code>{meta.runCommand}</code>
          {meta.runUrl && (
            <>
              {' '}
              → <a href={meta.runUrl} target="_blank" rel="noreferrer">{meta.runUrl}</a>
            </>
          )}
        </p>
      )}
    </div>
  );
}
