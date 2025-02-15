'use client';

import React from 'react';
import Image from 'next/image';
import cn from 'classnames';

import styles from './index.module.scss';

import { useFiles } from '@/features/files';

import { Preloader } from '../Preloader';
import { Plus } from '@/shared/icons';
import { Text } from '../Text';

type Props = {
    id: string;
    filePath: string;
    setFilePath: React.Dispatch<React.SetStateAction<string>>;
    title?: string;
    accept?: string;
    isAdmin?: boolean;
    labelClassName?: string;
    children?: React.ReactNode;
};

const FileUpload: React.FC<Props> = ({
    id,
    accept = 'image/png,image/jpeg',
    filePath,
    setFilePath,
    title,
    isAdmin = false,
    labelClassName,
    children,
}) => {
    const [loading, setLoading] = React.useState(false);

    const { uploadFile } = useFiles();

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];

        if (!selectedFile) return;

        if (!accept.split(',').includes(selectedFile.type)) {
            alert('Недопустимый тип файла!');
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            const files = await uploadFile(formData, isAdmin);
            if (files && files[0]?.url) {
                setFilePath(files[0].url);
            }
        } catch (error) {
            console.error('Ошибка загрузки:', error);
            alert('Ошибка при загрузке файла');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cn(styles.fileupload, labelClassName)}>
            {title && <Text variant="text3">{title}</Text>}

            <input type="file" id={id} className={styles.fileuploadInput} accept={accept} onChange={handleFileChange} />

            {children ? (
                <label htmlFor={id}>{children}</label>
            ) : (
                <label htmlFor={id} className={styles.fileuploadLabel}>
                    {loading ? (
                        <Preloader small page fill />
                    ) : filePath ? (
                        <div className={styles.fileuploadPreview}>
                            <Image src={filePath} alt="uploaded-image" fill />
                        </div>
                    ) : (
                        <Plus />
                    )}
                </label>
            )}
        </div>
    );
};

export default FileUpload;
