import { useQuizContext } from '../context/QuizContext.jsx';
import { DefaultFooter } from '../slots/defaults.jsx';

export function Footer({ as }) {
  const { slots, retry, wrong } = useQuizContext();
  const Component = as ?? slots.Footer ?? DefaultFooter;

  return <Component onRetry={retry} visible={wrong} />;
}
