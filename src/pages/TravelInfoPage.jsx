import React, { useEffect, useState } from "react";
import axios from "axios";




function TravelInfoPage() {
  const [input, setInput] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [comments, setComments] = useState([]);

  const handleOnChange = (e) => {
    setInput(e.target.value);
    console.log(input);
  };

  const handleButtonClick = (e) => {
    e.preventDefault();
    console.log(e.target);
    setTodoList([...todoList, { todoItem: input }]);
    setInput("");
  };

  const handleDeleteItem = (index) => {
    const updatedList = todoList.filter((_, i) => i !== index);
    setTodoList(updatedList);
  };

  const getComments = async () => {
    try {
      const dataRes = await axios.get("http://localhost:3000/posts?_embed=user");
      // const dataRes = await axios.get(
      //   // "http://localhost:3000/products?_start=7&_end=9",
      // );

      console.log(dataRes.data);
      setComments(dataRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  const postComments = async () => {
    try {
      const addedComment = {
        text: "最後一筆",
        userId: "4",
      };
      const postRes = await axios.post(
        "http://localhost:3000/comments",
        addedComment,
      );
      console.log(postRes.request.statusText);
      setComments([...comments, postRes.data]);
    } catch (error) {
      console.log(error);
    }
  };

  // const updateComments = async (id) => {
  //   try {
  //     const updateRes = await axios.patch(
  //       `http://localhost:3000/comments/${id}`,
  //       {
  //         text: "我要更新",
  //       },
  //     );

  //     setComments(
  //       (prevComments) =>
  //         prevComments.map((comment) =>
  //           comment.id === id ? { ...comment, text: "我要更新" } : comment,
  //         ),
  //       console.log(updateRes.request.statusText),
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const deleteComments = async (id) => {
  //   try {
  //     const deleteRes = await axios.delete(
  //       `http://localhost:3000/comments/${id}`,
  //     );
  //     console.log(deleteRes);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <button className="border border-t-cyan-600" onClick={getComments}>
        get all comments
      </button>

      <div>
        {comments.length > 0 &&
          comments.map((comment, index) => {
            return (
              <li key={index} className="bg-gray-200 p-2 text-black">
                {comment.text}
              </li>
            );
          })}
      </div>
      <br />

      <button className="border border-t-cyan-600" onClick={postComments}>
        post comments
      </button>

      <div>
        {comments.length > 1 && (
          <p className="bg-gray-500 text-white">
            {comments[comments.length - 1].text}
          </p>
        )}
      </div>

      <br />

      <br />
      <br />
      <hr />

      <button
        className="border border-t-cyan-600"
        // onClick={() => updateComments()}
      >
        update comments
      </button>
      <br />
      <br />
      <br />
      <hr />
      <input
        type="text"
        className="border-spacing-2 border"
        value={input}
        onChange={handleOnChange}
        placeholder="請輸入代辦事項"
      />
      <button
        type="button"
        className="border-spacing-2 border text-green-600"
        onClick={handleButtonClick}
      >
        儲存待辦
      </button>

      {todoList && todoList.length > 0 ? (
        <ul>
          {todoList.map((item, index) => (
            <li key={index}>
              {item.todoItem}
              <button
                type="button"
                className="m-2 bg-primary-600 text-white"
                onClick={() => handleDeleteItem(index)}
              >
                刪除事項
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items in the list</p>
      )}
    </>
  );
}

export default TravelInfoPage;
