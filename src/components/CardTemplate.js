import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
} from "@mui/material";

export default function CardTemplate() {
  return (
    <Card>
      <CardHeader title="Card Header" />
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="body1">Card Content</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
