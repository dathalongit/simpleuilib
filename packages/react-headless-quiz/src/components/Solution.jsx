import { useQuizContext } from '../context/QuizContext.jsx';
import { DefaultSolution } from '../slots/defaults.jsx';

export function Solution({ as }) {
  const { question, slots, showSolution } = useQuizContext();
  const Component = as ?? slots.Solution ?? DefaultSolution;

  if (!question.solution) {
    return null;
  }

  return <Component solution={question.solution} visible={showSolution} />;
}
