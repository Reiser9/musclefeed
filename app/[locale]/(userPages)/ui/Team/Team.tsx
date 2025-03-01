'use client';

import React from 'react';
import cn from 'classnames';
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';
import { useQuery } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';

import 'swiper/css';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { useTeam } from '@/features/team';
import { ArrowLeft, ArrowRight } from '@/shared/icons';
import { TeamItem } from '@/entities/team/ui';

import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';
import { Text } from '@/shared/ui/Text';

const Team = () => {
    const swiperIntance = React.useRef<SwiperClass | null>(null);

    const { getTeam } = useTeam();
    const t = useTranslations('Team');

    const { data, isPending, isError } = useQuery({
        queryKey: ['team'],
        queryFn: getTeam,
    });

    if (isPending) {
        return <Preloader page small />;
    }

    if (isError) {
        return <NotContent />;
    }

    return (
        <section className={styles.team}>
            <div className={base.container}>
                <div className={styles.teamInner}>
                    <div className={styles.reviewsTitleWrap}>
                        <Text variant="h1" upper className={styles.reviewsTitle}>
                            {t('team_title')}
                        </Text>

                        <p className={styles.reviewsText}>{t('team_text')}</p>
                    </div>

                    <div className={styles.teamWrap}>
                        {!!data && !!data.length && (
                            <>
                                <Swiper
                                    spaceBetween={24}
                                    slidesPerView={5}
                                    className={styles.teamContent}
                                    onSwiper={(swiper) => {
                                        swiperIntance.current = swiper;
                                    }}
                                    breakpoints={{
                                        0: {
                                            slidesPerView: 1.5,
                                            spaceBetween: 12,
                                        },
                                        768: {
                                            slidesPerView: 2,
                                            spaceBetween: 12,
                                        },
                                        1065: {
                                            slidesPerView: 3,
                                            spaceBetween: 16,
                                        },
                                        1270: {
                                            slidesPerView: 4,
                                            spaceBetween: 20,
                                        },
                                        1630: {
                                            slidesPerView: 5,
                                            spaceBetween: 24,
                                        },
                                    }}
                                >
                                    {data.map((team) => (
                                        <SwiperSlide key={team.id}>
                                            <TeamItem data={team} />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>

                                <button
                                    className={cn(styles.sliderArrow, styles.teamPrev)}
                                    onClick={() => swiperIntance.current?.slidePrev()}
                                >
                                    <ArrowLeft />
                                </button>

                                <button
                                    className={cn(styles.sliderArrow, styles.teamNext)}
                                    onClick={() => swiperIntance.current?.slideNext()}
                                >
                                    <ArrowRight />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Team;
