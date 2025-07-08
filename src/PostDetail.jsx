import { useQuery } from "@tanstack/react-query";
import { fetchComments } from "./api";
import "./PostDetail.css";

export function PostDetail({ post, deleteMutation }) {
  const postId = post.id;
  const { data, isLoading, error } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
    staleTime: 3000,
  });

  if (error) {
    return <h3>Something went wrong..</h3>;
  }

  if (isLoading) {
    return <h3>Loading..</h3>;
  }

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <div>
        <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
        {deleteMutation.isPending && (
          <p className="loading">Deleting the post</p>
        )}
        {deleteMutation.isError && (
          <p className="error">Error deleting the post</p>
        )}
        {deleteMutation.isSuccess && (
          <p className="success">Deleted the post</p>
        )}
      </div>
      <button>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
