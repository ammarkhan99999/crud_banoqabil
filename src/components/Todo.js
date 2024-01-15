import React, { useEffect, useState } from "react";
import todo from "../images/todo.svg";

const Todo = () => {
  const getLocalItems = () => {
    let list = localStorage.getItem("list");
    if (list) {
      return (
        JSON.parse(localStorage.getItem("list"))
        );
    } else {
      return [];
    }
  };

  const [inputDAta, setInputData] = useState("");
  const [items, setItems] = useState(getLocalItems());
  const [toggleSubmit, setToggleSubmit] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);
  const [visible, setVisible] = useState(false);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addItem();
    }
  };

  const addItem = () => {
    if (!inputDAta) {
      alert("Please Fill Data");
    } else if (inputDAta && !toggleSubmit) {
      setItems(
        items.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: inputDAta };
          }
          return elem;
        })
      );
      setToggleSubmit(true);
      setInputData("");
      setIsEditItem(null);
    } else {
      const allInputData = {
        id: new Date().getTime().toString(),
        name: inputDAta,
      };
      setItems([...items, allInputData]);
      setInputData("");
      setVisible(true);
    }
  };

  const deleteItem = (index) => {
    const updateItem = items.filter((elem) => {
      return index !== elem.id;
    });
    setItems(updateItem);
    if (updateItem.length === 0) {
      setVisible(false);
    }
  };

  const editItem = (id) => {
    const newEditItem = items.find((elem) => {
      return elem.id === id;
    });
    setToggleSubmit(false);
    setInputData(newEditItem.name);
    setIsEditItem(id);
  };

  const removeAll = () => {
    setItems([]);
    setVisible(false);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(items));
  }
  , [items]);

  useEffect(()=>{
    let list = localStorage.getItem("list")
    if (list.length > 2) {
      setVisible(true)
    }
  }, [])

  return (
    <div className="main-div">
      <div className="child-div">
        <figure>
          <img src={todo} alt="todologo" />
          <figcaption>Add Your List Here</figcaption>
        </figure>
        <div className="addItems">
          <input type="text" placeholder="Add Items" value={inputDAta} onChange={(e) => {
            setInputData(e.target.value)
            }} onKeyDown={handleKeyDown}/>
          {toggleSubmit ? (
            <i
              className="fa fa-plus add-btn"
              title="Add Item"
              onClick={addItem}
            ></i>
          ) : (
            <i
              className="fa fa-edit add-btn"
              title="Update Item"
              onClick={addItem}
            ></i>
          )}
        </div>
        <div className="showItems">
          {items.map((elem) => {
            return (
              <div className="eachItem" key={elem.id}>
                <h3>{elem.name}</h3>
                <div className="todo-btn">
                  <i
                    className="far fa-edit add-btn"
                    title="Edit Item"
                    onClick={() => editItem(elem.id)}
                  ></i>
                  <i
                    className="far fa-trash-alt add-btn"
                    title="Delete Item"
                    onClick={() => deleteItem(elem.id)}
                  ></i>
                </div>
              </div>
            );
          })}
          
        </div>
        {visible && (<div className="showItems">
                <button className="btn effect04" data-sm-link-text="Remove All" onClick={removeAll}><span>RemoveAll</span></button>
                    </div>
        )}
      </div>
    </div>
  );
};

export default Todo;
