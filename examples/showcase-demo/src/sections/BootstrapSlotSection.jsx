import { Quiz } from 'react-headless-quiz';
import {
  BootstrapContainer,
  BootstrapFeedback,
  BootstrapFooter,
  BootstrapHeader,
  BootstrapHint,
  BootstrapInput,
  BootstrapQuestion,
  BootstrapSolution,
  BootstrapSubmitButton,
} from '../slots/bootstrap.jsx';

export function BootstrapSlotSection({ question }) {
  return (
    <div className="showcase-isolate showcase-demo-root demo-bootstrap">
      <Quiz
        question={question}
        slots={{
          Container: BootstrapContainer,
          Header: BootstrapHeader,
          Question: BootstrapQuestion,
          Input: BootstrapInput,
          SubmitButton: BootstrapSubmitButton,
          Feedback: BootstrapFeedback,
          Hint: BootstrapHint,
          Solution: BootstrapSolution,
          Footer: BootstrapFooter,
        }}
      />
    </div>
  );
}
