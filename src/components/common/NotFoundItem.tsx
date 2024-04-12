import { Warning } from '@mui/icons-material';
import { Alert, AlertTitle } from '@mui/material';

const NotFoundItem = () => {
  return (
    <Alert variant="outlined" color="warning" icon={<Warning />}>
      <AlertTitle>کالایی با این مشخصات پیدا نکردیم</AlertTitle>
      پیشنهاد می‌کنیم فیلترها را تغییر دهید
    </Alert>
  );
};

export default NotFoundItem;
