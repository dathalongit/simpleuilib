import { Children, isValidElement } from 'react';
import { QuizProvider, useQuizContext } from '../context/QuizContext.jsx';
import {
  DefaultContainer,
  DefaultFooter,
  DefaultHeader,
} from '../slots/defaults.jsx';
import { Question } from './Question.jsx';
import { AnswerInput } from './AnswerInput.jsx';
import { SubmitButton } from './SubmitButton.jsx';
import { Feedback } from './Feedback.jsx';
import { Hint } from './Hint.jsx';
import { Solution } from './Solution.jsx';
import { Footer } from './Footer.jsx';

function QuizDefaultLayout() {
  const { slots, question, retry, wrong } = useQuizContext();

  const Container = slots.Container ?? DefaultContainer;
  const Header = slots.Header ?? DefaultHeader;
  const FooterSlot = slots.Footer ?? DefaultFooter;

  return (
    <Container>
      <Header question={question} />
      <Question />
      <AnswerInput />
      <SubmitButton />
      <Feedback />
      <Hint />
      <Solution />
      <FooterSlot onRetry={retry} visible={wrong} />
    </Container>
  );
}

function QuizContent({ children }) {
  const hasCompoundChildren =
    Children.count(children) > 0 &&
    Children.toArray(children).some((child) => isValidElement(child));

  if (hasCompoundChildren) {
    return children;
  }

  return <QuizDefaultLayout />;
}

function QuizRoot({ question, slots, children }) {
  return (
    <QuizProvider question={question} slots={slots}>
      <QuizContent>{children}</QuizContent>
    </QuizProvider>
  );
}

export const Quiz = Object.assign(QuizRoot, {
  Question,
  AnswerInput,
  SubmitButton,
  Feedback,
  Hint,
  Solution,
  Footer,
});
