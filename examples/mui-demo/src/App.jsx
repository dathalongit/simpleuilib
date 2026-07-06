import { Box, Typography } from '@mui/material';
import { Quiz } from 'react-headless-quiz';
import { sampleQuestion } from './question.js';
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
} from './slots.jsx';

export default function App() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50', pb: 8 }}>
      <Box textAlign="center" pt={6} px={2}>
        <Typography variant="h4" fontWeight={800}>
          Material UI Demo
        </Typography>
        <Typography color="text.secondary" mt={1}>
          Cùng logic quiz, giao diện tuỳ biến bằng MUI.
        </Typography>
      </Box>

      <Quiz
        question={sampleQuestion}
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
    </Box>
  );
}
