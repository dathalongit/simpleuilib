import { useQuizContext } from '../context/QuizContext.jsx';
import { DefaultQuestion } from '../slots/defaults.jsx';

export function Question({ as }) {
  const { question, slots, disabled, correct, wrong } = useQuizContext();
  const Component = as ?? slots.Question ?? DefaultQuestion;

  return (
    <Component
      question={question.question}
      disabled={disabled}
      correct={correct}
      wrong={wrong}
    />
  );
}
