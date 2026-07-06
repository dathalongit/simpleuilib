import { useQuizContext } from '../context/QuizContext.jsx';
import { DefaultFeedback } from '../slots/defaults.jsx';

export function Feedback({ as }) {
  const { slots, correct, wrong, submitted } = useQuizContext();
  const Component = as ?? slots.Feedback ?? DefaultFeedback;

  return <Component correct={correct} wrong={wrong} submitted={submitted} />;
}
