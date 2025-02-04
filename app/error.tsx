'use client';

import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Muscle Feed - Ошибка',
};

type Props = {
    error: Error;
};

const ErrorPage: React.FC<Props> = ({ error }) => {
    return <div>К сожалению, произошла ошибка: {error.message}</div>;
};

export default ErrorPage;
