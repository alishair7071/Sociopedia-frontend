import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state/index.js";
import PostWidget from "./PostWidget.jsx";

  const PostsWidget = ({ userId, isProfile = false }) => {

    console.log("posts widget is called")
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch("https://sociopedia-backend-six.vercel.app/posts", {
      method: "GET",
      headers: {Authorization: `Bearer ${token}`},
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };


  const getUserPosts = async () => {
    const response = await fetch(
      `https://sociopedia-backend-six.vercel.app/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    console.log(data);
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []);

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          imageUrl,
          userPicturePath,
          likes,
          comments, 
        }) => (
          <PostWidget 
          key={_id}
          postId={_id}
          postUserId={userId}
          name={`${firstName} ${lastName}`}
          description={description}
          location={location}
          imageUrl={imageUrl}
          userPicturePath={userPicturePath}
          likes={likes}
          comments={comments}
          />
        )
      )}
    </>
  );
};


export default PostsWidget;