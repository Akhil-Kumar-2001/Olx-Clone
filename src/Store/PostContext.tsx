import { createContext, useState, ReactNode } from 'react';


type productType = {
  title?: string;
  price?: number;
  location: string;
  category?: string;
  date?: any;
  description: string;
  id: string;
  image?: string;
};

type ProductContextType = {
  postDetails: productType | undefined;
  setPostDetails: React.Dispatch<React.SetStateAction<productType | undefined>>;
};

// Initialize the context with `undefined` as default
const PostContext = createContext<ProductContextType | undefined>(undefined);

type PostProviderProps = {
  children: ReactNode;
};

const PostProvider = ({ children }: PostProviderProps) => {
  const [postDetails, setPostDetails] = useState<productType | undefined>(undefined);

  return (
    <PostContext.Provider value={{ postDetails, setPostDetails }}>
      {children}
    </PostContext.Provider>
  );
};

export { PostContext };
export default PostProvider;

