'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';

import styles from '../index.module.scss';

import { ArrowRight, Home2, Map } from '@/shared/icons';
import { useCities } from '@/features/city';
import { useUserInfo } from '@/features/user';
import { useAppSelector } from '@/shared/hooks/useRedux';

import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Select } from '@/shared/ui/Select';
import { NotContent } from '@/shared/ui/NotContent';
import { Preloader } from '@/shared/ui/Preloader';
import { UserAddressDTO } from '@/entities/user/info';

const CreateAddressForm = ({ successCallback = () => {} }: { successCallback?: () => void }) => {
    const [city, setCity] = React.useState('');

    const t = useTranslations('Profile');
    const language = useAppSelector((state) => state.app.language);
    const queryClient = useQueryClient();

    const revalidateRequest = () => {
        queryClient.invalidateQueries({ queryKey: ['user_addresses'] });
    };

    const { getCities } = useCities();
    const { createUserAddress } = useUserInfo();

    const { data, isPending, isError } = useQuery({
        queryKey: ['cities'],
        queryFn: getCities,
    });

    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
    } = useForm<UserAddressDTO>();

    const onSubmit: SubmitHandler<UserAddressDTO> = (data) => {
        const addressData = { ...data, cityId: city };

        createUserAddress(addressData, () => {
            revalidateRequest();
            reset();
            successCallback();
        });
    };

    React.useEffect(() => {
        if (data && !!data.length) {
            setCity(`${data[0].id}`);
        }
    }, [data]);

    return (
        <form className={styles.createAddressForm} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.addAddressForm}>
                {isPending ? (
                    <Preloader page small offIndent />
                ) : isError ? (
                    <NotContent />
                ) : (
                    <Select
                        title={t('city')}
                        icon={<Map />}
                        value={city}
                        setValue={setCity}
                        options={
                            !!data
                                ? data?.map((city) => ({
                                      id: city.id,
                                      name: city.name[language],
                                  }))
                                : []
                        }
                    />
                )}

                <Input
                    {...register('street')}
                    error={!!errors.street}
                    errorMessage={errors.street?.message}
                    title={t('street')}
                    icon={<Map />}
                    placeholder="Выберите или начните вводить"
                    value={watch('street', '')}
                />

                <Input
                    {...register('house')}
                    error={!!errors.house}
                    errorMessage={errors.house?.message}
                    title={t('home')}
                    icon={<Home2 />}
                    placeholder={t('home')}
                    value={watch('house', '')}
                />

                <Input
                    {...register('floor')}
                    error={!!errors.floor}
                    errorMessage={errors.floor?.message}
                    title={t('floor')}
                    icon={<Map />}
                    placeholder={t('floor')}
                    value={watch('floor', '')}
                />

                <Input
                    {...register('apartment')}
                    error={!!errors.apartment}
                    errorMessage={errors.apartment?.message}
                    title={t('apartment')}
                    icon={<Map />}
                    placeholder={t('apartment')}
                    value={watch('apartment', '')}
                />
            </div>

            <Button full>
                {t('save_address')}
                <ArrowRight />
            </Button>
        </form>
    );
};

export default CreateAddressForm;
