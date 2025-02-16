import { AdminSidebar } from '@/widgets/AdminSidebar';

import styles from './index.module.scss';

import { PrivateWrapper } from '@/shared/wrappers/PrivateWrapper';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <PrivateWrapper haveRole="MODERATOR">
            <div className={styles.adminWrapper}>
                <AdminSidebar />

                {children}
            </div>
        </PrivateWrapper>
    );
}
