'use client';

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { Editor, EditorState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';

import styles from '../../index.module.scss';

import type { FaqDTO } from '@/entities/faq';
import { useFaq } from '@/features/faq';
import { useAppSelector } from '@/shared/hooks/useRedux';
import { Foods } from '@/shared/icons';

import { Input } from '@/shared/ui/Input';
import { NotContent } from '@/shared/ui/NotContent';
import { Preloader } from '@/shared/ui/Preloader';
import { Text } from '@/shared/ui/Text';
import { Button } from '@/shared/ui/Button';
import { Select } from '@/shared/ui/Select';

const AdminFaqEdit = () => {
    const [faqCategoryId, setFaqCategoryId] = React.useState('');
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

    const { id } = useParams();

    const { getFaqById, updateFaq, getFaqCategories } = useFaq();
    const router = useRouter();
    const language = useAppSelector((state) => state.app.language);

    const { data, isPending, isError } = useQuery({
        queryKey: ['faq_by_id', id],
        queryFn: () => getFaqById(String(id)),
        enabled: !!id,
        gcTime: 0,
        refetchOnMount: true
    });

    const {
        data: faqCategories,
        isPending: isPendingFaqCategories,
        isError: isErrorFaqCategories,
    } = useQuery({
        queryKey: ['faq_categories'],
        queryFn: getFaqCategories,
    });

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<FaqDTO>();

    const onSubmit: SubmitHandler<FaqDTO> = (data) => {
        const answerRu = getHtmlRu();
        const answerHe = getHtmlHe();

        const faqData = { ...data, faqCategoryId, answerRu, answerHe };

        updateFaq(String(id), faqData, () => router.replace(`/${language}/admin/faq`));
    };

    const { question, answer, faqCategory } = data || {};

    React.useEffect(() => {
        if (faqCategory) {
            setFaqCategoryId(String(faqCategory.id));
        }
    }, [faqCategory]);

    React.useEffect(() => {
        if (answer) {
            setAnswerRuState(EditorState.createWithContent(stateFromHTML(answer.ru)));
            setAnswerHeState(EditorState.createWithContent(stateFromHTML(answer.he)));
        }
    }, [answer]);

    if (isPending) {
        return <Preloader page />;
    }

    if (!id || isError) {
        return <NotContent />;
    }

    return (
        <div className={styles.adminTeam}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.createForm}>
                <Text>Редактирование категории вопросов</Text>

                {isPendingFaqCategories ? (
                    <Preloader small page />
                ) : isErrorFaqCategories ? (
                    <NotContent text="Произошла ошибка при загрузке категорий вопросов" />
                ) : !!faqCategories && !!faqCategories.length ? (
                    <Select
                        value={faqCategoryId}
                        setValue={setFaqCategoryId}
                        options={faqCategories?.map((elem) => ({
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
                    value={watch('questionRu', question?.ru)}
                />

                <Input
                    {...register('questionHe')}
                    error={!!errors.questionHe}
                    errorMessage={errors.questionHe?.message}
                    full
                    title={'Вопрос he'}
                    value={watch('questionHe', question?.he)}
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

                <Button full>Сохранить</Button>
            </form>
        </div>
    );
};

export default AdminFaqEdit;
