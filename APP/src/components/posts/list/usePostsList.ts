import { useParams } from "react-router-dom";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

import api from "../../../utils/api";
import { Post } from "../../../utils/types";

const usePostsList = () => {
  let { userId } = useParams();
  const [userPosts, setUserPosts] = useState<Post[]>([]);

  const [searchText, setSearchText] = useState<string>("");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(userPosts);

  const handleSearchPosts = (event: ChangeEvent<HTMLInputElement>) => {
    const text = event.target.value;
    setSearchText(text);

    const filtered = userPosts.filter((post) =>
      post.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredPosts(filtered);
  };

  const handleDeletePost = useCallback((postId: number) => {
    api.delete(`posts/${postId}`).then((posts) => {
      setUserPosts(posts?.data?.data);
      setFilteredPosts(posts?.data?.data);
    });
  }, []);

  useEffect(() => {
    api.get(`posts/${userId}`).then((posts) => {
      setUserPosts(posts?.data?.data);
      setFilteredPosts(posts?.data?.data);
    });
  }, []);

  return {
    searchText,
    filteredPosts,
    handleDeletePost,
    handleSearchPosts,
    hasPosts: !!userPosts.length,
  };
};

export default usePostsList;
