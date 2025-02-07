'use client';

import React from 'react';
import cn from 'classnames';

import styles from './index.module.scss';

import { Minus, Plus } from '@/shared/icons';

const FaqItem = () => {
    const [open, setOpen] = React.useState(false);

    return (
        <div
            className={cn(styles.faqItem, {
                [styles.active]: open,
            })}
            onClick={() => setOpen((prev) => !prev)}
        >
            <div className={styles.faqItemTitleInner}>
                <p className={styles.faqItemTitle}>Как осуществляется доставка?</p>

                <span className={styles.faqItemIcon}>{open ? <Minus /> : <Plus />}</span>
            </div>

            {open && (
                <div className={styles.faqItemText}>
                    <p>
                        Доставка осуществляется каждый день, в любые 3-х часовые интервалы вечернего времени: с
                        19:00-22:00. Выбирайте удобное для вас время!
                    </p>

                    <p>при непредвиденных обстоятельствах (форс-мажоре):</p>

                    <p>
                        При возникновении таких ситуаций (вы не успели вернуться домой к назначенному времени доставки,
                        вы недоступны или не берете трубку) курьер может находиться по адресу доставки не более 15
                        минут, после чего будет вынужден уехать на следующий заказ
                    </p>

                    <p>
                        Так же вы можете воспользоваться дополнительными услугами доставки для того, чтобы избежать
                        непредвиденные обстоятельства:
                    </p>

                    <p>
                        При оформлении заказа на доставку, вы можете сообщить нам по телефону или what&rsquo;s app о
                        выборе одной из следующих опций:
                    </p>

                    <ul>
                        <li>
                            Оставить заказ у дверей (курьей сфотографирует доставку около вашей двери, для подтверждения
                            выполненной доставки в случае необходимости)
                        </li>
                        <li>Оставить заказ у консьержа</li>
                        <li>Оставить заказ у соседей</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FaqItem;
