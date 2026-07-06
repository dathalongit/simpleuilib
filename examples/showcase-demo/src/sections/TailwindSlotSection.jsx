import { Quiz } from 'react-headless-quiz';
import {
  TailwindContainer,
  TailwindFeedback,
  TailwindFooter,
  TailwindHeader,
  TailwindHint,
  TailwindInput,
  TailwindQuestion,
  TailwindSolution,
  TailwindSubmitButton,
} from '../slots/tailwind.jsx';

export function TailwindSlotSection({ question }) {
  return (
    <div className="showcase-isolate showcase-demo-root demo-tailwind">
      <Quiz
        question={question}
        slots={{
          Container: TailwindContainer,
          Header: TailwindHeader,
          Question: TailwindQuestion,
          Input: TailwindInput,
          SubmitButton: TailwindSubmitButton,
          Feedback: TailwindFeedback,
          Hint: TailwindHint,
          Solution: TailwindSolution,
          Footer: TailwindFooter,
        }}
      />
    </div>
  );
}
