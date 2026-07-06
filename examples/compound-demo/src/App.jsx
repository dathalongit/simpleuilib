import { Quiz } from 'react-headless-quiz';
import { sampleQuestion } from './question.js';

export default function App() {
  return (
    <div className="page">
      <header className="page-header">
        <h1>Compound Components Demo</h1>
        <p>
          Tuỳ chỉnh <strong>layout</strong> bằng <code>Quiz.Question</code>,{' '}
          <code>Quiz.AnswerInput</code>… — UI mặc định của thư viện, không truyền{' '}
          <code>slots</code>.
        </p>
        <span className="badge">Chỉ Compound Components · UI default</span>
      </header>

      <Quiz question={sampleQuestion}>
        <div className="compound-layout">
          <section className="compound-block">
            <p className="block-label">1 · Câu hỏi</p>
            <Quiz.Question />
          </section>

          <section className="compound-block">
            <p className="block-label">2 · Trả lời</p>
            <div className="compound-row">
              <Quiz.AnswerInput placeholder="Nhập tên hành tinh..." />
              <Quiz.SubmitButton label="Kiểm tra" />
            </div>
          </section>

          <section className="compound-block">
            <p className="block-label">3 · Kết quả</p>
            <div className="compound-results">
              <Quiz.Feedback />
              <Quiz.Hint />
              <Quiz.Solution />
              <hr />
              <Quiz.Footer />
            </div>
          </section>
        </div>
      </Quiz>
    </div>
  );
}
