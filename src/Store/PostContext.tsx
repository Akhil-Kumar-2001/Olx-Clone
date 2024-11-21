import { createContext, useState, ReactNode, useEffect } from 'react';

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

const PostContext = createContext<ProductContextType | undefined>(undefined);

type PostProviderProps = {
  children: ReactNode;
};

const PostProvider = ({ children }: PostProviderProps) => {
  const [postDetails, setPostDetails] = useState<productType | undefined>(() => {
    // Try to get the post details from localStorage
    const savedPostDetails = localStorage.getItem('postDetails');
    return savedPostDetails ? JSON.parse(savedPostDetails) : undefined;
  });

  // Update localStorage whenever postDetails changes
  useEffect(() => {
    if (postDetails) {
      localStorage.setItem('postDetails', JSON.stringify(postDetails));
    }
  }, [postDetails]);

  return (
    <PostContext.Provider value={{ postDetails, setPostDetails }}>
      {children}
    </PostContext.Provider>
  );
};

export { PostContext };
export default PostProvider;
