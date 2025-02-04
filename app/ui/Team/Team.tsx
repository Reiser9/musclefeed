'use client';

import React from 'react';
import cn from 'classnames';
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';

import 'swiper/css';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { ArrowLeft, ArrowRight } from '@/shared/icons';

import { TeamItem } from '@/entities/team/ui';

const Team = () => {
    const swiperIntance = React.useRef<SwiperClass | null>(null);

    return (
        <section className={styles.team}>
            <div className={base.container}>
                <div className={styles.teamInner}>
                    <div className={styles.reviewsTitleWrap}>
                        <h2 className={styles.reviewsTitle}>наша команда</h2>

                        <p className={styles.reviewsText}>
                            Наше меню разработано профессиональными диетологами, приготовлено только из натуральных
                            продуктов и рассчитано на каждого человека под его цели.
                        </p>
                    </div>

                    <div className={styles.teamWrap}>
                        <Swiper
                            spaceBetween={24}
                            slidesPerView={5}
                            className={styles.teamContent}
                            onSwiper={(swiper) => {
                                swiperIntance.current = swiper;
                            }}
                        >
                            <SwiperSlide>
                                <TeamItem />
                            </SwiperSlide>

                            <SwiperSlide>
                                <TeamItem />
                            </SwiperSlide>

                            <SwiperSlide>
                                <TeamItem />
                            </SwiperSlide>

                            <SwiperSlide>
                                <TeamItem />
                            </SwiperSlide>

                            <SwiperSlide>
                                <TeamItem />
                            </SwiperSlide>

                            <SwiperSlide>
                                <TeamItem />
                            </SwiperSlide>

                            <SwiperSlide>
                                <TeamItem />
                            </SwiperSlide>
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
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Team;
