import { Quiz } from 'react-headless-quiz';

export function CompoundSection({ question }) {
  return (
    <div className="showcase-isolate showcase-demo-root compound-layout">
      <Quiz question={question}>
        <section className="compound-block">
          <p className="block-label">Câu hỏi</p>
          <Quiz.Question />
        </section>
        <section className="compound-block">
          <p className="block-label">Trả lời</p>
          <div className="compound-row">
            <Quiz.AnswerInput />
            <Quiz.SubmitButton />
          </div>
        </section>
        <section className="compound-block">
          <p className="block-label">Kết quả</p>
          <Quiz.Feedback />
          <Quiz.Hint />
          <Quiz.Solution />
          <Quiz.Footer />
        </section>
      </Quiz>
    </div>
  );
}
