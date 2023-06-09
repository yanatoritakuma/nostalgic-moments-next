import { TTagRes } from '@/types/tag';
import React, { createContext, useState } from 'react';

type TPostGlobal = {
  postGlobal: {
    id: number;
    userId: number;
    title: string;
    text: string;
    image: string;
    prefecture: string;
    address: string;
    tags: TTagRes[];
  };

  setPostGlobal: React.Dispatch<
    React.SetStateAction<{
      id: number;
      userId: number;
      title: string;
      text: string;
      image: string;
      prefecture: string;
      address: string;
      tags: TTagRes[];
    }>
  >;

  postProcess: boolean;
  setPostProcess: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PostContext = createContext<TPostGlobal>({
  postGlobal: {
    id: 0,
    userId: 0,
    title: '',
    text: '',
    image: '',
    prefecture: '',
    address: '',
    tags: [{ id: 0, name: '' }],
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setPostGlobal: () => {},

  postProcess: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setPostProcess: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const PostProvider = (props: Props) => {
  const { children } = props;
  const [postGlobal, setPostGlobal] = useState({
    id: 0,
    userId: 0,
    title: '',
    text: '',
    image: '',
    prefecture: '',
    address: '',
    tags: [{ id: 0, name: '' }],
  });

  const [postProcess, setPostProcess] = useState(false);

  return (
    <PostContext.Provider value={{ postGlobal, setPostGlobal, postProcess, setPostProcess }}>
      {children}
    </PostContext.Provider>
  );
};
