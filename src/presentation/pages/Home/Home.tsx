import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  selectCounter,
} from "~/application/features/counter/counter";
import { useGetPostsQuery } from "~/application/managers/api/apiPosts";

export function Home() {
  const dispatch = useDispatch();
  const counter = useSelector(selectCounter);

  const { data, isLoading } = useGetPostsQuery();

  return (
    <>
      <h1>Counter: {counter}</h1>
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
      <div>
        {isLoading ? (
          <i>loading...</i>
        ) : (
          <pre>{JSON.stringify(data, null, 2)}</pre>
        )}
      </div>
    </>
  );
}
