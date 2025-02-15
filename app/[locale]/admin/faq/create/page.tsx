'use client';

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Editor, EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

import styles from '../index.module.scss';

import type { FaqDTO } from '@/entities/faq';
import { useFaq } from '@/features/faq';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { Foods } from '@/shared/icons';

import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Text } from '@/shared/ui/Text';
import { Preloader } from '@/shared/ui/Preloader';
import { NotContent } from '@/shared/ui/NotContent';
import { Select } from '@/shared/ui/Select';

const AdminFaqCreate = () => {
    const [answerRuState, setAnswerRuState] = React.useState(EditorState.createEmpty());
    const [answerHeState, setAnswerHeState] = React.useState(EditorState.createEmpty());

    const editorRu = React.useRef<Editor | null>(null);
    const editorHe = React.useRef<Editor | null>(null);

    const getHtmlRu = () => {
        const contentState = answerRuState.getCurrentContent();
        const html = stateToHTML(contentState);

        return html;
    };

    const getHtmlHe = () => {
        const contentState = answerHeState.getCurrentContent();
        const html = stateToHTML(contentState);

        return html;
    };

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FaqDTO>();

    const { createFaq, getFaqCategories } = useFaq();
    const language = useAppSelector((state) => state.app.language);
    const router = useRouter();

    const { data, isPending, isError } = useQuery({
        queryKey: ['faq_categories'],
        queryFn: getFaqCategories,
    });

    const onSubmit: SubmitHandler<FaqDTO> = (data) => {
        const answerRu = getHtmlRu();
        const answerHe = getHtmlHe();

        const faqData = { ...data, answerRu, answerHe };

        createFaq(faqData, () => router.replace(`/${language}/admin/faq`));
    };

    return (
        <div className={styles.adminTeam}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.createForm}>
                <Text>Создание частого вопроса</Text>

                {isPending ? (
                    <Preloader small page />
                ) : isError ? (
                    <NotContent text="Произошла ошибка при загрузке категорий вопросов" />
                ) : !!data && !!data.length ? (
                    <Select
                        {...register('faqCategoryId')}
                        options={data?.map((elem) => ({
                            id: elem.id,
                            name: elem.name[language],
                        }))}
                        title="Категория вопроса"
                        icon={<Foods />}
                        full
                    ></Select>
                ) : (
                    <NotContent text="Для начала создайте категории вопросов" />
                )}

                <Input
                    {...register('questionRu')}
                    error={!!errors.questionRu}
                    errorMessage={errors.questionRu?.message}
                    full
                    title={'Вопрос ru'}
                    value={watch('questionRu', '')}
                />

                <Input
                    {...register('questionHe')}
                    error={!!errors.questionHe}
                    errorMessage={errors.questionHe?.message}
                    full
                    title={'Вопрос he'}
                    value={watch('questionHe', '')}
                />

                <div className={styles.editorWrapper}>
                    <Text variant="text3">Ответ ru</Text>

                    <div className={styles.editor} onClick={() => editorRu.current?.focus()}>
                        <Editor
                            ref={editorRu}
                            editorState={answerRuState}
                            onChange={(editorState) => setAnswerRuState(editorState)}
                        />
                    </div>
                </div>

                <div className={styles.editorWrapper}>
                    <Text variant="text3">Ответ he</Text>

                    <div className={styles.editor} onClick={() => editorHe.current?.focus()}>
                        <Editor
                            ref={editorHe}
                            editorState={answerHeState}
                            onChange={(editorState) => setAnswerHeState(editorState)}
                        />
                    </div>
                </div>

                <Button full>Создать</Button>
            </form>
        </div>
    );
};

export default AdminFaqCreate;
