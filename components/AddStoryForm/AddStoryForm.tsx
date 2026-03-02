'use client';

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { useId, useState } from 'react';
import { useRouter } from 'next/navigation';
import css from './AddStoryForm.module.css';
import { createStory, updateStory } from '@/app/lib/api/api';

interface AddStoryFormValues {
  img: File | null;
  title: string;
  description: string;
  category: string;
  article: string;
}

interface AddStoryFormProps {
  initialData?: any;
  isEdit?: boolean;
}

const defaultValues: AddStoryFormValues = {
  img: null,
  title: '',
  description: '',
  category: '',
  article: '',
};

const validationSchema = Yup.object({
  title: Yup.string().required('Поле обовʼязкове'),
  description: Yup.string().required('Поле обовʼязкове'),
  category: Yup.string().required('Поле обовʼязкове'),
  article: Yup.string().required('Поле обовʼязкове'),
});

export default function AddStoryForm({ initialData, isEdit }: AddStoryFormProps) {
  const router = useRouter();
  const fieldId = useId();

  const [preview, setPreview] = useState(initialData?.imgUrl || '');

  const initialValues: AddStoryFormValues = initialData
    ? {
        img: null,
        title: initialData.title,
        description: initialData.description,
        category: initialData.category,
        article: initialData.article,
      }
    : defaultValues;

  const handleSubmit = async (
    values: AddStoryFormValues,
    actions: FormikHelpers<AddStoryFormValues>
  ) => {
    try {
      const formData = new FormData();
      if (values.img) formData.append('img', values.img);
      formData.append('title', values.title);
      formData.append('description', values.description);
      formData.append('category', values.category);
      formData.append('article', values.article);

      const res = isEdit
        ? await updateStory(initialData._id, formData)
        : await createStory(formData);

      router.push(`/stories/${res._id}`);

    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ setFieldValue, isSubmitting, isValid }) => {
        const disabled = isSubmitting || !isValid;

        return (
          <Form className={css.form} noValidate>
            
            {/* IMAGE */}
            <div className={css.field}>
              <label className={css.label}>Обкладинка статті</label>

              <div className={css.preview}>
                {preview ? (
                  <img src={preview} alt="preview" className={css.previewImage} />
                ) : (
                  <div className={css.placeholder}>Обкладинка</div>
                )}
              </div>

              <input
                type="file"
                className={css.fileInput}
                id={`${fieldId}-img`}
                accept="image/png,image/jpeg,image/webp"
                onChange={(e) => {
                  const file = e.target.files?.[0] ?? null;
                  setFieldValue('img', file);
                  if (file) setPreview(URL.createObjectURL(file));
                }}
              />

              <label htmlFor={`${fieldId}-img`} className={css.uploadButton}>
                Завантажити фото
              </label>
            </div>

            {/* TITLE */}
            <div className={css.field}>
              <label htmlFor={`${fieldId}-title`} className={css.label}>Заголовок</label>
              <Field
                id={`${fieldId}-title`}
                className={css.input}
                name="title"
                placeholder="Введіть заголовок історії"
              />
              <ErrorMessage name="title" component="span" className={css.error} />
            </div>

            {/* CATEGORY */}
            <div className={css.field}>
              <label htmlFor={`${fieldId}-category`} className={css.label}>Категорія</label>
              <Field as="select" id={`${fieldId}-category`} className={css.select} name="category">
                <option value="" disabled>Категорія</option>
                <option value="travel">Travel</option>
                <option value="food">Food</option>
                <option value="city">City</option>
                <option value="nature">Nature</option>
                <option value="other">Other</option>
              </Field>
              <ErrorMessage name="category" component="span" className={css.error} />
            </div>
            {/* DESCRIPTION */}
            <div className={css.field}>
              <label htmlFor={`${fieldId}-description`} className={css.label}>Короткий опис</label>
              <Field
                id={`${fieldId}-description`}
                className={css.textareaSmall}
                as="textarea"
                name="description"
                placeholder="Введіть короткий опис історії"
              />
              <ErrorMessage name="description" component="span" className={css.error} />
            </div>

            {/* ARTICLE */}
            <div className={css.field}>
              <label htmlFor={`${fieldId}-article`} className={css.label}>Текст історії</label>
              <Field
                as="textarea"
                id={`${fieldId}-article`}
                name="article"
                className={css.textarea}
                placeholder="Ваша історія тут"
              />
              <ErrorMessage name="article" component="span" className={css.error} />
            </div>

            {/* BUTTONS */}
            <div className={css.actionsBottom}>
              <button type="submit" disabled={disabled} className={css.saveButton}>
                {isEdit ? 'Оновити' : 'Зберегти'}
              </button>

              <button type="button" className={css.cancelButton} onClick={() => router.back()}>
                Відмінити
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}