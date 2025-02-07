'use client';

import React from 'react';
import cn from 'classnames';

import styles from './index.module.scss';
import base from '@/shared/styles/base.module.scss';

import { ArrowRight, ArrowRightShort, Box, Chat, Home, PhotoAdd, User } from '@/shared/icons';
import { BreadcrumbLink, Breadcrumbs, BreadcrumbText } from '@/shared/ui/Breadcrumbs';
import { Text } from '@/shared/ui/Text';
import { ReviewItem } from '@/entities/review/ui';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Select } from '@/shared/ui/Select';
import { BannerSmall } from '@/widgets/Banner';
import Image from 'next/image';
import { Checkbox } from '@/shared/ui/Checkbox';

const ReviewsPage = () => {
    const [reviewAgree, setReviewAgree] = React.useState(true);

    return (
        <>
            <Breadcrumbs>
                <BreadcrumbLink href="/">
                    <Home />
                </BreadcrumbLink>

                <ArrowRightShort />

                <BreadcrumbText>Отзывы</BreadcrumbText>
            </Breadcrumbs>

            <div className={styles.reviewpage}>
                <div className={base.container}>
                    <div className={styles.reviewpageInner}>
                        <Text variant="h2" upper>
                            Отзывы наших покупателей
                        </Text>

                        <div className={styles.reviewpageTitleInner}>
                            <div className={styles.reviewsTitleWrap}>
                                <Text variant="h1" upper>
                                    реальные отзывы наших клиентов
                                </Text>

                                <p className={styles.reviewsText}>
                                    Наше меню разработано профессиональными диетологами, приготовлено только из
                                    натуральных продуктов и рассчитано на каждого человека под его цели.
                                </p>
                            </div>

                            <Button>
                                Оставить отзыв
                                <ArrowRight />
                            </Button>
                        </div>

                        <div className={styles.reviewsContent}>
                            <ReviewItem />
                        </div>
                    </div>
                </div>
            </div>

            <section className={styles.reviewform}>
                <div className={base.container}>
                    <div className={styles.reviewformInner}>
                        <div className={styles.reviewformForm}>
                            <div className={styles.reviewformFormWrapper}>
                                <p className={styles.reviewformFormText}>Нам важно ваше мнение</p>

                                <Text variant="h1" upper>
                                    Хотите оставить отзыв?
                                </Text>
                            </div>

                            <div className={styles.reviewformFormContent}>
                                <Input title="Как вас зовут" placeholder="Михаил Кузякин" icon={<User />} full />
                                <Select
                                    icon={<Box />}
                                    full
                                    title="Какой рацион вы пробовали"
                                    options={[
                                        'Рацион сбалансированный',
                                        'Рацион детокс',
                                        'Рацион для похудения',
                                        'Рацион для набора массы',
                                    ]}
                                />

                                <div className={cn(styles.reviewformFormInputInner, styles.full)}>
                                    <p className={styles.reviewformFormInputText}>Что вы можете рассказать о нас</p>

                                    <div className={styles.reviewformFormInputWrap}>
                                        <Chat />

                                        <textarea
                                            className={styles.reviewformFormTextarea}
                                            placeholder="Поделитесь своими впечатлениями"
                                        ></textarea>
                                    </div>
                                </div>

                                <Checkbox
                                    value={reviewAgree}
                                    setValue={setReviewAgree}
                                    id="reviewform__agree"
                                    label="Я согласен на обработку Персональных данных"
                                />

                                <div className={styles.reviewformButtons}>
                                    <Button color="grey">
                                        Добавить к отзыву фото
                                        <PhotoAdd />
                                    </Button>

                                    <Button>
                                        Оставить отзыв
                                        <ArrowRight />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        <div className={styles.reviewformImg}>
                            <Image src="/img/reviewform-img.png" alt="img" fill />
                        </div>
                    </div>
                </div>
            </section>

            <BannerSmall />
        </>
    );
};

export default ReviewsPage;
