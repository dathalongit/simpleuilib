import { Quiz } from 'react-headless-quiz';

export function DefaultSection({ question }) {
  return (
    <div className="showcase-isolate showcase-demo-root">
      <Quiz question={question} />
    </div>
  );
}
