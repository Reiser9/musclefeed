import styles from './index.module.scss';

import FaqTabs from './FaqTabs';
import { PrivateWrapper } from '@/shared/wrappers/PrivateWrapper';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <PrivateWrapper haveRole="ADMIN">
            <div className={styles.adminWrapper}>
                <FaqTabs />

                {children}
            </div>
        </PrivateWrapper>
    );
}
