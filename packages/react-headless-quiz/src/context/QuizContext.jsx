import { createContext, useContext } from 'react';
import { useQuiz } from '../hooks/useQuiz.js';

const QuizContext = createContext(null);

/** Provides quiz state and slot configuration to compound components. */
export function QuizProvider({ question, slots = {}, children }) {
  const quiz = useQuiz(question);

  const value = {
    question,
    slots,
    ...quiz,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

/** Access quiz state from compound components or custom UI. */
export function useQuizContext() {
  const context = useContext(QuizContext);

  if (!context) {
    throw new Error('useQuizContext must be used within a Quiz provider.');
  }

  return context;
}

export { QuizContext };
