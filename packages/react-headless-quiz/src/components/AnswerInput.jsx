import { useQuizContext } from '../context/QuizContext.jsx';
import { DefaultInput } from '../slots/defaults.jsx';

export function AnswerInput({ placeholder, as }) {
  const { answer, setAnswer, slots, disabled, loading } = useQuizContext();
  const Component = as ?? slots.Input ?? DefaultInput;

  return (
    <Component
      value={answer}
      onChange={setAnswer}
      disabled={disabled}
      loading={loading}
      placeholder={placeholder}
    />
  );
}
