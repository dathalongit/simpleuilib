import { Quiz, useQuizContext } from 'react-headless-quiz';
import '../styles/compound-slot.css';
import {
  SlotContainer,
  SlotFeedback,
  SlotFooter,
  SlotHeader,
  SlotHint,
  SlotInput,
  SlotQuestion,
  SlotSolution,
  SlotSubmitButton,
  HighlightInput,
} from '../slots/compound-slot.jsx';

const compoundSlotSlots = {
  Container: SlotContainer,
  Header: SlotHeader,
  Question: SlotQuestion,
  Input: SlotInput,
  SubmitButton: SlotSubmitButton,
  Feedback: SlotFeedback,
  Hint: SlotHint,
  Solution: SlotSolution,
  Footer: SlotFooter,
};

function CompoundSlotLayout() {
  const { question, slots: ctxSlots } = useQuizContext();
  const Container = ctxSlots.Container ?? SlotContainer;
  const Header = ctxSlots.Header ?? SlotHeader;

  return (
    <Container>
      <Header question={question} />
      <div style={{ padding: '0 1rem 1rem' }}>
        <section style={{ marginBottom: '1rem' }}>
          <Quiz.Question />
        </section>
        <section
          style={{
            display: 'flex',
            gap: '0.75rem',
            flexWrap: 'wrap',
            marginBottom: '1rem',
          }}
        >
          <div style={{ flex: 1, minWidth: 180 }}>
            <Quiz.AnswerInput as={HighlightInput} />
          </div>
          <Quiz.SubmitButton label="Gửi" />
        </section>
        <section>
          <Quiz.Feedback />
          <Quiz.Hint />
          <Quiz.Solution />
          <Quiz.Footer />
        </section>
      </div>
    </Container>
  );
}

export function CompoundSlotSection({ question }) {
  return (
    <div className="showcase-isolate showcase-demo-root demo-compound-slot">
      <Quiz question={question} slots={compoundSlotSlots}>
        <CompoundSlotLayout />
      </Quiz>
    </div>
  );
}
