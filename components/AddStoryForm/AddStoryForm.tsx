'use client';

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useEffect, useId, useState } from 'react';
import Button from '@/components/Button/Button';
import { useRouter } from 'next/navigation';
import css from './AddStoryForm.module.css';
import Modal from '@/components/Modal/Modal';


export interface AddStoryFormProps {
  initialValues: AddStoryFormValues;
  onSubmit: (
    values: AddStoryFormValues,
    actions: FormikHelpers<AddStoryFormValues>
  ) => void | Promise<void>;
  buttonText: string;
  currentImage?: string;
}


export interface AddStoryFormValues {
  img: File | null;
  title: string;
  category: string;
  article: string;
  date?: string;
}

export default function AddStoryForm({
  initialValues,
  onSubmit,
  buttonText,
  currentImage,
}: AddStoryFormProps) {
  const fieldId = useId();
  const router = useRouter();

  const [preview, setPreview] = useState<string>(currentImage || '');
  const [isErrorOpen, setIsErrorOpen] = useState(false);

  useEffect(() => {
    setPreview(currentImage || '');
  }, [currentImage]);

  const validationSchema = Yup.object({
    img: currentImage
      ? Yup.mixed<File>().nullable()
      : Yup.mixed<File>().required('Поле обовʼязкове'),
    title: Yup.string().required('Поле обовʼязкове'),
    category: Yup.string().required('Поле обовʼязкове'),
    article: Yup.string().required('Поле обовʼязкове'),
  });

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}

        onSubmit={async (values, actions) => {
          try {
            await onSubmit(values, actions);
            setPreview(currentImage || '');
          } catch {
            setIsErrorOpen(true);
          } finally {
            actions.setSubmitting(false);
          }
        }}
        enableReinitialize
        validateOnBlur
        validateOnChange
      >
        {({ isSubmitting, isValid, dirty, setFieldValue, values }) => {
          const isSaveDisabled =
            isSubmitting ||
            !isValid ||
            (!dirty && !values.img);

          return (
            <Form className={css.form} noValidate>
              <div className={css.left}>

                {/* ОБКЛАДИНКА */}
                <div className={css.field}>
                  <label htmlFor={`${fieldId}-img`} className={css.label}>
                    Обкладинка статті
                  </label>

                  <div className={css.preview}>
                    {preview ? (
                      <img
                        src={preview}
                        alt="preview"
                        className={css.previewImage}
                      />
                    ) : (
                      <div className={css.placeholder}>Обкладинка</div>
                    )}
                  </div>

                  <input
                    id={`${fieldId}-img`}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className={css.fileInput}
                    disabled={isSubmitting}
                    onChange={(e) => {
                      const file = e.currentTarget.files?.[0] ?? null;
                      setFieldValue('img', file);

                      if (file) {
                        const objectUrl = URL.createObjectURL(file);
                        setPreview(objectUrl);
                      }
                    }}
                  />

                  <label
                    htmlFor={`${fieldId}-img`}
                    className={css.uploadButton}
                  >
                    Завантажити фото
                  </label>

                  {values.img && (
                    <span className={css.fileName}>
                      {values.img.name}
                    </span>
                  )}

                  <ErrorMessage
                    name="img"
                    component="span"
                    className={css.error}
                  />
                </div>

                {/* ЗАГОЛОВОК */}
                <div className={css.field}>
                  <label htmlFor={`${fieldId}-title`} className={css.label}>
                    Заголовок
                  </label>

                  <Field
                    id={`${fieldId}-title`}
                    name="title"
                    className={css.input}
                    placeholder="Введіть заголовок історії"
                    disabled={isSubmitting}
                  />

                  <ErrorMessage
                    name="title"
                    component="span"
                    className={css.error}
                  />
                </div>

                {/* КАТЕГОРІЯ */}
                <div className={css.field}>
                  <label htmlFor={`${fieldId}-category`} className={css.label}>
                    Категорія
                  </label>

                  <Field
                    as="select"
                    id={`${fieldId}-category`}
                    name="category"
                    className={css.select}
                    disabled={isSubmitting}
                  >
                    <option value="" disabled>
                      Категорія
                    </option>
                    <option value="travel">Travel</option>
                    <option value="city">City</option>
                    <option value="nature">Nature</option>
                    <option value="food">Food</option>
                    <option value="other">Other</option>
                  </Field>

                  <ErrorMessage
                    name="category"
                    component="span"
                    className={css.error}
                  />
                </div>

                {/* ТЕКСТ */}
                <div className={css.field}>
                  <label htmlFor={`${fieldId}-article`} className={css.label}>
                    Текст історії
                  </label>

                  <Field
                    as="textarea"
                    id={`${fieldId}-article`}
                    name="article"
                    rows={8}
                    className={css.textarea}
                    placeholder="Ваша історія тут"
                    disabled={isSubmitting}
                  />

                  <ErrorMessage
                    name="article"
                    component="span"
                    className={css.error}
                  />
                </div>
              </div>

              {/* КНОПКИ */}
              <div className={css.right}>
                <div className={css.actions}>
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSaveDisabled}
                  >
                    {isSubmitting ? 'Збереження...' : buttonText}
                  </Button>

                  <Button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => router.back()}
                  >
                    Відмінити
                  </Button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>

       {/* ГЛОБАЛЬНА МОДАЛКА */}
      {isErrorOpen && (
        <Modal onClose={() => setIsErrorOpen(false)}>
  <div className={css.errorModalWrapper}>
    <div className={css.errorModalContent}>
      <h2 className={css.errorModalTitle}>Помилка збереження</h2>
      <p className={css.errorModalText}>Не вдалося зберегти історію. Спробуй ще раз.</p>
      <Button type="button" variant="primary" onClick={() => setIsErrorOpen(false)}>
        Закрити
      </Button>
    </div>
  </div>
</Modal>
      )}
    </>
  );
}
