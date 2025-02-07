import { AdminSidebar } from '@/widgets/AdminSidebar';

import styles from './index.module.scss';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={styles.adminWrapper}>
            <AdminSidebar />

            {children}
        </div>
    );
}
