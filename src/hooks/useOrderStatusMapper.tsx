import { OrderStatusEnum } from '@/graphql/types/graphql';
import {
  CheckCircle,
  CloseOutlined,
  SvgIconComponent,
} from '@mui/icons-material';
import { blue, green, grey, orange, red } from '@mui/material/colors';
import { useTranslations } from 'next-intl';

const useOrderStatusMapper = () => {
  const t = useTranslations();

  const mapper: Record<
    OrderStatusEnum,
    { icon: SvgIconComponent; bgColor: string; color: string; label: string }
  > = {
    FAILED: {
      color: red[500],
      bgColor: red[100],
      label: t('orderStatuses.FAILED'),
      icon: CloseOutlined,
    },
    CANCELLED: {
      color: red[500],
      bgColor: red[100],
      label: t('orderStatuses.CANCELLED'),
      icon: CloseOutlined,
    },
    COMPLETED: {
      color: green[500],
      bgColor: green[100],
      label: t('orderStatuses.COMPLETED'),
      icon: CheckCircle,
    },
    ON_HOLD: {
      color: orange[500],
      bgColor: orange[100],
      label: t('orderStatuses.ON_HOLD'),
      icon: CloseOutlined,
    },
    PENDING: {
      color: orange[500],
      bgColor: orange[100],
      label: t('orderStatuses.PENDING'),
      icon: CloseOutlined,
    },
    PROCESSING: {
      color: blue[500],
      bgColor: blue[100],
      label: t('orderStatuses.PROCESSING'),
      icon: CloseOutlined,
    },
    REFUNDED: {
      color: grey[500],
      bgColor: grey[100],
      label: t('orderStatuses.REFUNDED'),
      icon: CloseOutlined,
    },
    CHECKOUT_DRAFT: {
      color: grey[500],
      bgColor: grey[100],
      label: t('orderStatuses.CHECKOUT_DRAFT'),
      icon: CloseOutlined,
    },
  };

  return mapper;
};

export default useOrderStatusMapper;
