import { useCallback, useState } from 'react';
import { isAnswerCorrect } from '../utils/normalizeAnswer.js';

const SUBMIT_DELAY_MS = 300;

/** Headless hook — quiz logic only, no UI. */
export function useQuiz(question) {
  const [answer, setAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('idle');

  const correct = status === 'correct';
  const wrong = status === 'wrong';
  const disabled = loading || (submitted && correct);
  const showHint = wrong && Boolean(question.hint);
  const showSolution = wrong && Boolean(question.solution);

  const submit = useCallback(async () => {
    if (loading || disabled || !answer.trim()) {
      return;
    }

    setLoading(true);

    await new Promise((resolve) => {
      window.setTimeout(resolve, SUBMIT_DELAY_MS);
    });

    const isCorrect = isAnswerCorrect(answer, question.answer);
    setSubmitted(true);
    setStatus(isCorrect ? 'correct' : 'wrong');
    setLoading(false);
  }, [answer, disabled, loading, question.answer]);

  const retry = useCallback(() => {
    setAnswer('');
    setSubmitted(false);
    setStatus('idle');
    setLoading(false);
  }, []);

  return {
    answer,
    setAnswer,
    submit,
    retry,
    correct,
    wrong,
    disabled,
    loading,
    showHint,
    showSolution,
    submitted,
  };
}
