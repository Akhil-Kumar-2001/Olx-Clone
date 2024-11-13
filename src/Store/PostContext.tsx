import { createContext,useState } from 'react'



type ProductContextType = {
    setPostDetails: React.Dispatch<React.SetStateAction<productType>>;
};

export const PostContext = createContext<ProductContextType | null>(null);

 type productType ={
    title?: string;
  price?: number;
  location: string;
  category?: string;
  date?: any;
  description: string;
  id: string;
  image?: string;
 }

 function Post({children}) {
    const [postDetails,setPostDetails] = useState()
    return (
        <postContext.Provider value={{postDetails,setPostDetails}}>
            {children}
        </postContext.Provider>
    )
 }


 export default Post

