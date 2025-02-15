import styles from './index.module.scss';

import FaqTabs from './FaqTabs';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={styles.adminWrapper}>
            <FaqTabs />

            {children}
        </div>
    );
}
