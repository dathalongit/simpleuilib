import { useQuizContext } from '../context/QuizContext.jsx';
import { DefaultHint } from '../slots/defaults.jsx';

export function Hint({ as }) {
  const { question, slots, showHint } = useQuizContext();
  const Component = as ?? slots.Hint ?? DefaultHint;

  if (!question.hint) {
    return null;
  }

  return <Component hint={question.hint} visible={showHint} />;
}
