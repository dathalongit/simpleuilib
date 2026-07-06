import { Quiz } from 'react-headless-quiz';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  MuiContainer,
  MuiFeedback,
  MuiFooter,
  MuiHeader,
  MuiHint,
  MuiInput,
  MuiQuestion,
  MuiSolution,
  MuiSubmitButton,
} from '../slots/mui.jsx';

const muiTheme = createTheme({
  palette: { primary: { main: '#7c3aed' } },
  shape: { borderRadius: 10 },
});

export function MuiSlotSection({ question }) {
  return (
    <ThemeProvider theme={muiTheme}>
      <div className="showcase-isolate showcase-demo-root demo-mui">
        <Quiz
          question={question}
          slots={{
            Container: MuiContainer,
            Header: MuiHeader,
            Question: MuiQuestion,
            Input: MuiInput,
            SubmitButton: MuiSubmitButton,
            Feedback: MuiFeedback,
            Hint: MuiHint,
            Solution: MuiSolution,
            Footer: MuiFooter,
          }}
        />
      </div>
    </ThemeProvider>
  );
}
