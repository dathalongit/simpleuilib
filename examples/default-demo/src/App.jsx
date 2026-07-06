import { Quiz } from 'react-headless-quiz';
import { sampleQuestion } from './question.js';

export default function App() {
  return (
    <div className="page">
      <header className="page-header">
        <h1>Default Demo</h1>
        <p>
          Giao diện mặc định của thư viện — chỉ một dòng:{' '}
          <code>&lt;Quiz question=&#123;...&#125; /&gt;</code>
        </p>
        <span className="badge">Không slot · Không compound · Không custom UI</span>
      </header>

      <Quiz question={sampleQuestion} />
    </div>
  );
}
