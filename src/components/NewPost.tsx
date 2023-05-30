'use client';

import { cls } from '@/libs/client/util';
import { AuthUser } from '@/model/user';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, DragEvent, FormEvent, useRef, useState } from 'react';
import PostUserAvatar from './PostUserAvatar';
import Button from './ui/Button';
import GridSpinner from './ui/GridSpinner';
import { CloseIcon, FileIcon } from './ui/icons';

type Props = {
  user: AuthUser;
};
export default function NewPost({ user: { username, image } }: Props) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const textRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  function handleChnage(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  }
  function handleDrag(e: DragEvent<HTMLLabelElement>) {
    if (e.type === 'dragenter') {
      setDragging(true);
    } else if (e.type === 'dragleave') {
      setDragging(false);
    }
  }
  function handleDragOver(e: DragEvent) {
    // 브라우져에서 해당 파일을 open하는것을 방지
    e.preventDefault();
  }
  function handleDrop(e: DragEvent) {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData();
    formData.append('file', file!);
    formData.append('text', textRef.current?.value!);

    fetch('/api/posts/', {
      method: 'POST',
      body: formData,
    }) //
      .then((res) => {
        if (!res.ok) {
          setError(`${res.status} ${res.statusText}`);
          return;
        }
        router.push('/');
      })
      .catch((err) => setError(err.toString()))
      .finally(() => setLoading(false));
  }

  return (
    <section className='w-full max-w-xl flex flex-col items-center mt-6'>
      {loading && (
        <div className='absolute inset-0 z-30 text-center pt-[30%] bg-sky-500/20'>
          <GridSpinner />
        </div>
      )}
      {error && (
        <p className='w-full bg-red-100 text-red-600 text-center p-4 mb-4 font-semibold'>
          {error}
        </p>
      )}
      <PostUserAvatar username={username} image={image!} />
      <form
        onSubmit={handleSubmit}
        className='w-full flex flex-col mt-2 gap-y-2'
      >
        <input
          className='hidden'
          type='file'
          name='input'
          id='input-upload'
          accept='image/*'
          onChange={handleChnage}
        />
        <label
          className={cls(
            'w-full aspect-video flex flex-col justify-center items-center cursor-pointer',
            file ? '' : 'border-2 border-sky-500 border-dashed'
          )}
          htmlFor='input-upload'
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={(e) => {
            if (e.target !== e.currentTarget) e.preventDefault();
          }}
        >
          {dragging && (
            <div className='absolute inset-0 z-10 bg-sky-500/20 pointer-events-none' />
          )}
          {!file && (
            <div className='flex flex-col items-center pointer-events-none'>
              <FileIcon />
              <p>Drag and Dop your image here or click</p>
            </div>
          )}
          {file && (
            <div className='relative w-full aspect-video'>
              <Image
                className='object-cover'
                src={URL.createObjectURL(file)}
                alt='preview'
                fill
                sizes='650px'
              />
              <div
                onClick={() => setFile(undefined)}
                className='absolute p-2 w-8 h-8 bg-white rounded-full z-20 top-2 right-2 cursor-pointer flex justify-center items-center'
              >
                <CloseIcon />
              </div>
            </div>
          )}
        </label>
        <textarea
          ref={textRef}
          className='outline-none text-lg border border-neutral-300 p-2'
          name='text'
          id='input-text'
          rows={6}
          placeholder={'Write a caption...'}
          required
        />

        <Button
          text='Publish'
          accentColor='royalblue'
          onClick={() => {}}
          disabled={!file || !textRef.current?.value}
        />
      </form>
    </section>
  );
}
