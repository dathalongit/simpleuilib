import { CustomQuiz } from '../slots/headless.jsx';

export function HeadlessSection({ question }) {
  return (
    <div className="showcase-isolate showcase-demo-root demo-headless">
      <CustomQuiz question={question} />
    </div>
  );
}
