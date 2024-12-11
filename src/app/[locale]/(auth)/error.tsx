'use client';

import Error, { ErrorProps } from '@/components/Error/Error';
import { FC } from 'react';

const ErrorPage: FC<ErrorProps> = (props) => <Error {...props} />;
export default ErrorPage;
