import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export function MuiContainer({ children }) {
  return (
    <Paper elevation={3} sx={{ maxWidth: 520, mx: 'auto', p: 4, borderRadius: 3 }}>
      {children}
    </Paper>
  );
}

export function MuiHeader({ question }) {
  return (
    <Box mb={2}>
      <Chip label={`Câu hỏi #${question.id}`} color="primary" size="small" />
    </Box>
  );
}

export function MuiQuestion({ question }) {
  return (
    <Typography variant="h5" fontWeight={700} gutterBottom>
      {question}
    </Typography>
  );
}

export function MuiInput({ value, onChange, disabled, loading }) {
  return (
    <TextField
      fullWidth
      value={value}
      disabled={disabled || loading}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Nhập câu trả lời..."
      margin="normal"
    />
  );
}

export function MuiSubmitButton({ onSubmit, disabled, loading }) {
  return (
    <Button
      variant="contained"
      size="large"
      disabled={disabled || loading}
      onClick={onSubmit}
      sx={{ mt: 1 }}
    >
      {loading ? 'Đang kiểm tra...' : 'Kiểm tra'}
    </Button>
  );
}

export function MuiFeedback({ correct, wrong, submitted }) {
  if (!submitted) return null;

  if (correct) {
    return (
      <Alert severity="success" sx={{ mt: 2 }}>
        Chính xác!
      </Alert>
    );
  }

  if (wrong) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Chưa đúng!
      </Alert>
    );
  }

  return null;
}

export function MuiHint({ hint, visible }) {
  if (!visible) return null;

  return (
    <Alert severity="warning" sx={{ mt: 2 }}>
      <strong>Gợi ý:</strong> {hint}
    </Alert>
  );
}

export function MuiSolution({ solution, visible }) {
  if (!visible) return null;

  return (
    <Alert severity="info" sx={{ mt: 2 }}>
      <strong>Lời giải:</strong> {solution}
    </Alert>
  );
}

export function MuiFooter({ onRetry, visible }) {
  if (!visible) return null;

  return (
    <Box mt={3}>
      <Button variant="outlined" onClick={onRetry}>
        Làm lại
      </Button>
    </Box>
  );
}
