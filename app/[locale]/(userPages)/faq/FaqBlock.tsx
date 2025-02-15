'use client';

import React from 'react';
import cn from 'classnames';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { useFaq } from '@/features/faq';
import { FaqItem } from '@/entities/faq/ui';
import { useAppSelector } from '@/shared/hooks/useRedux';

import { Text } from '@/shared/ui/Text';
import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';

const FaqBlock = () => {
    const [activeCategory, setActiveCategory] = React.useState(0);

    const { getFaqCategories, getFaq } = useFaq();
    const language = useAppSelector((state) => state.app.language);
    const t = useTranslations('Faq');

    const { data, isPending, isError } = useQuery({
        queryKey: ['faq_categories'],
        queryFn: getFaqCategories,
    });

    const {
        data: faqs,
        isPending: faqsIsPending,
        isError: faqsIsError,
    } = useQuery({
        queryKey: ['faq'],
        queryFn: getFaq,
        enabled: !!activeCategory,
    });

    React.useEffect(() => {
        if (data && !!data.length) {
            setActiveCategory(data[0].id);
        }
    }, [data]);

    if (isPending) {
        return <Preloader small page />;
    }

    if (isError) {
        return <NotContent />;
    }

    return (
        <div className={styles.faq}>
            <div className={base.container}>
                <div className={styles.reviewpageInner}>
                    <Text variant="h2" upper>
                        {t('title')}
                    </Text>

                    <div className={styles.faqTitleInner}>
                        <div className={styles.faqTitleWrap}>
                            <Text variant="h2" upper>
                                {t('title2')}
                            </Text>

                            <p className={styles.faqText}>{t('text')}</p>
                        </div>

                        {/* <Button>
                            Задать вопрос
                            <ArrowRight />
                        </Button> */}
                    </div>

                    <div className={styles.faqCats}>
                        {data &&
                            !!data.length &&
                            data.map((cat) => (
                                <button
                                    key={cat.id}
                                    className={cn(styles.faqCat, {
                                        [styles.active]: activeCategory === cat.id,
                                    })}
                                    onClick={() => setActiveCategory(cat.id)}
                                >
                                    <div
                                        dangerouslySetInnerHTML={{ __html: cat.picture }}
                                        className={styles.faqCatIcon}
                                    ></div>
                                    {cat.name[language]}
                                </button>
                            ))}
                    </div>

                    {faqsIsPending ? (
                        <Preloader small page />
                    ) : faqsIsError ? (
                        <NotContent />
                    ) : !!faqs && !!faqs.length ? (
                        <div className={styles.faqContent}>
                            {faqs
                                .filter((elem) => elem.faqCategory.id === activeCategory)
                                .map((faq) => (
                                    <FaqItem key={faq.id} data={faq} />
                                ))}
                        </div>
                    ) : (
                        <NotContent text="В данной категории вопросов еще нет" />
                    )}
                </div>
            </div>
        </div>
    );
};

export default FaqBlock;
