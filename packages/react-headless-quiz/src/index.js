export { Quiz } from './components/Quiz.jsx';
export { Question } from './components/Question.jsx';
export { AnswerInput } from './components/AnswerInput.jsx';
export { SubmitButton } from './components/SubmitButton.jsx';
export { Feedback } from './components/Feedback.jsx';
export { Hint } from './components/Hint.jsx';
export { Solution } from './components/Solution.jsx';
export { Footer } from './components/Footer.jsx';

export { QuizProvider, useQuizContext } from './context/QuizContext.jsx';
export { useQuiz } from './hooks/useQuiz.js';

export {
  DefaultContainer,
  DefaultFeedback,
  DefaultFooter,
  DefaultHeader,
  DefaultHint,
  DefaultInput,
  DefaultQuestion,
  DefaultSolution,
  DefaultSubmitButton,
} from './slots/defaults.jsx';

export { isAnswerCorrect, normalizeAnswer } from './utils/normalizeAnswer.js';
