import { useContext } from 'react';
import './View.css';
import { PostContext } from '../../Store/PostContext';
import noimg from '../../assets/no-image.jpg' 

function View() {
  const { postDetails } = useContext(PostContext);

  // Handle cases where postDetails is undefined
  if (!postDetails) {
    return <p>Loading post details...</p>;
  }

  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={postDetails.image || {noimg}} // fallback image if none exists
          alt={postDetails.title || "Product Image"}
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {postDetails.price}</p>
          <span>{postDetails.title}</span>
          <p>{postDetails.category || "Uncategorized"}</p>
          <span>{postDetails.date ? new Date(postDetails.date.seconds * 1000).toLocaleDateString() : 'No Date Available'}</span>
        </div>
        <div className="contactDetails">
          <p>Seller details</p>
          <p>Location : {postDetails.location || "Location not provided"}</p>
          {/* Add contact info here if available in postDetails */}
        </div>
      </div>
    </div>
  );
}

export default View;
