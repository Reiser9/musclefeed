'use client';

import React from 'react';
import cn from 'classnames';

import styles from '../index.module.scss';

import { Check, Delete } from '@/shared/icons';
import type { UserAddress } from '@/entities/user/info';
import { ConfirmModal } from '@/shared/ui/Modal';
import { useAppSelector } from '@/shared/hooks/useRedux';

type Props = {
    data: UserAddress;
    deleteCallback: () => void;
    primaryCallback: () => void;
};

const AddressItem: React.FC<Props> = ({ data, deleteCallback = () => {}, primaryCallback = () => {} }) => {
    const [deleteModal, setDeleteModal] = React.useState(false);
    const language = useAppSelector((state) => state.app.language);
    const { city, house, apartment, floor, street, isPrimary } = data || {};

    return (
        <>
            <div className={styles.profileAddressItem}>
                <p
                    className={styles.profileAddressName}
                >{`${city.name[language]}, ${street}, ${house}, ${apartment}, ${floor}`}</p>

                <div className={styles.profileAddressButtons}>
                    <button
                        className={cn(styles.profileAddressButton, {
                            [styles.disabled]: isPrimary,
                        })}
                        onClick={primaryCallback}
                    >
                        <Check />
                    </button>

                    {/* <button className={styles.profileAddressButton}>
                        <Pen />
                    </button> */}

                    <button
                        className={cn(styles.profileAddressButton, styles.danger)}
                        onClick={() => setDeleteModal(true)}
                    >
                        <Delete />
                    </button>
                </div>
            </div>

            <ConfirmModal
                value={deleteModal}
                setValue={setDeleteModal}
                callback={deleteCallback}
                title="Вы действительно хотите удалить адрес?"
            />
        </>
    );
};

export default AddressItem;
