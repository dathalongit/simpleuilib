import { Quiz, useQuizContext } from 'react-headless-quiz';
import { sampleQuestion } from './question.js';
import {
  HighlightInput,
  SlotContainer,
  SlotFeedback,
  SlotFooter,
  SlotHeader,
  SlotHint,
  SlotInput,
  SlotQuestion,
  SlotSolution,
  SlotSubmitButton,
} from './slots.jsx';

const slots = {
  Container: SlotContainer,
  Header: SlotHeader,
  Question: SlotQuestion,
  Input: SlotInput,
  SubmitButton: SlotSubmitButton,
  Feedback: SlotFeedback,
  Hint: SlotHint,
  Solution: SlotSolution,
  Footer: SlotFooter,
};

/**
 * Layout tuỳ biến bằng Compound Components.
 * Slot Pattern cung cấp UI — Compound quyết định bố cục từng vùng.
 */
function CompoundQuizLayout() {
  const { question, slots: ctxSlots } = useQuizContext();
  const Container = ctxSlots.Container ?? SlotContainer;
  const Header = ctxSlots.Header ?? SlotHeader;

  return (
    <Container>
      <Header question={question} />

      <div className="quiz-body">
        <section className="quiz-section">
          <p className="section-label">Câu hỏi</p>
          <Quiz.Question />
        </section>

        <section className="quiz-section">
          <p className="section-label">Trả lời</p>
          <div className="answer-row">
            <Quiz.AnswerInput as={HighlightInput} />
            <Quiz.SubmitButton label="Gửi" />
          </div>
        </section>

        <section className="quiz-section">
          <p className="section-label">Kết quả</p>
          <div className="results-panel">
            <Quiz.Feedback />
            <Quiz.Hint />
            <Quiz.Solution />
            <Quiz.Footer />
          </div>
        </section>
      </div>
    </Container>
  );
}

export default function App() {
  return (
    <div className="page">
      <header className="page-header">
        <h1>Slot + Compound Demo</h1>
        <p>
          <code>slots</code> tuỳ biến giao diện · <code>Quiz.*</code> tuỳ biến
          layout · <code>as</code> override từng phần
        </p>
        <span className="tag">Slot Pattern + Compound Components</span>
      </header>

      <Quiz question={sampleQuestion} slots={slots}>
        <CompoundQuizLayout />
      </Quiz>
    </div>
  );
}
