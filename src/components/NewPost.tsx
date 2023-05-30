'use client';

import { AuthUser } from '@/model/user';
import { ChangeEvent, DragEvent, useState } from 'react';
import PostUserAvatar from './PostUserAvatar';
import Button from './ui/Button';
import { FileIcon } from './ui/icons';

type Props = {
  user: AuthUser;
};
export default function NewPost({ user: { username, image } }: Props) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File>();
  function handleChnage(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
      console.log(files[0]);
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
      console.log(files[0]);
    }
  }

  return (
    <section>
      <PostUserAvatar username={username} image={image!} />
      <form>
        <input
          className='hidden'
          type='file'
          name='input'
          id='input-upload'
          accept='image/*'
          onChange={handleChnage}
        />
        <label
          htmlFor='input-upload'
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <FileIcon />
          <p>Drag and Dop your image here or click</p>
          <textarea
            name='text'
            id='input-text'
            rows={10}
            placeholder={'Write a caption...'}
          ></textarea>
        </label>
        <Button text='Publish' onClick={() => {}} />
      </form>
    </section>
  );
}
