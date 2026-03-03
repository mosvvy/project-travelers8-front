'use client';

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useId, useState } from 'react';
import Button from '@/components/Button/Button';
import { useRouter } from 'next/navigation';
import css from './AddStoryForm.module.css';

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
  date: string;
}

const validationSchema = Yup.object({
  img: Yup.mixed<File>().required('Поле обовʼязкове'),
  title: Yup.string().required('Поле обовʼязкове'),
  category: Yup.string().required('Поле обовʼязкове'),
  article: Yup.string().required('Поле обовʼязкове'),
});

export default function AddStoryForm({
  initialValues,
  onSubmit,
  buttonText,
}: AddStoryFormProps) {
  const fieldId = useId();
  const router = useRouter();

  const [preview, setPreview] = useState<string>('');
  const [isErrorOpen, setIsErrorOpen] = useState(false);

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          try {
            await onSubmit(values, actions);
            setPreview('');
          } catch {
            setIsErrorOpen(true);
          } finally {
            actions.setSubmitting(false);
          }
        }}
        validateOnBlur
        validateOnChange
        validateOnMount
      >
        {({ isSubmitting, isValid, dirty, setFieldValue, values }) => {
          const isSaveDisabled =
            isSubmitting || !isValid || !dirty || !values.img;

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
                    hidden
                    disabled={isSubmitting}
                    onChange={(e) => {
                      const file = e.currentTarget.files?.[0] ?? null;
                      setFieldValue('img', file);
                      setPreview(file ? URL.createObjectURL(file) : '');
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
                  <label
                    htmlFor={`${fieldId}-title`}
                    className={css.label}
                  >
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
                  <label
                    htmlFor={`${fieldId}-category`}
                    className={css.label}
                  >
                    Категорія
                  </label>

                  <Field
                    as="select"
                    required
                    id={`${fieldId}-category`}
                    name="category"
                    className={css.select}
                    placeholder="Категорія"
                    disabled={isSubmitting}
                  >
                    <option value="" disabled hidden>
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
                  <label
                    htmlFor={`${fieldId}-article`}
                    className={css.label}
                  >
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

      {isErrorOpen && (
        <div
          className={css.modalOverlay}
          onClick={() => setIsErrorOpen(false)}
        >
          <div
            className={css.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className={css.modalTitle}>Помилка збереження</h2>
            <p className={css.modalText}>
              Не вдалося зберегти історію. Спробуй ще раз.
            </p>
            <button
              type="button"
              className={css.modalButton}
              onClick={() => setIsErrorOpen(false)}
            >
              Закрити
            </button>
          </div>
        </div>
      )}
    </>
  );
}