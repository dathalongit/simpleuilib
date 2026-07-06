import { useQuizContext } from '../context/QuizContext.jsx';
import { DefaultSubmitButton } from '../slots/defaults.jsx';

export function SubmitButton({ label, as }) {
  const { submit, slots, disabled, loading, answer, submitted, correct } =
    useQuizContext();

  const Component = as ?? slots.SubmitButton ?? DefaultSubmitButton;
  const isLocked = disabled || !answer.trim() || (submitted && correct);

  return (
    <Component
      onSubmit={() => {
        void submit();
      }}
      disabled={isLocked}
      loading={loading}
      label={label}
    />
  );
}
