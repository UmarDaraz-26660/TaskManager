// import { useState, useEffect } from 'react'
// import Navbar from './components/Navbar'
// import { FaEdit } from "react-icons/fa";
// import { MdDeleteSweep } from "react-icons/md";


// import { v4 as uuidv4 } from 'uuid';
// import Footer from './components/Footer';


// // uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
// function App() {
//   const [Todo, setTodo] = useState("")
//   const [Todos, setTodos] = useState([])
//   const [showFinished, setshowFinished] = useState(false)
// const [date, setDate] = useState("")


//   useEffect(() => {
//     let TodoString = localStorage.getItem("Todos")
//     if (TodoString) {
//       let Todos = JSON.parse(localStorage.getItem("Todos"))
//       setTodos(Todos)

//     }
//   }, [])







//   // local storage function 

//   const saveTols = () => {
//     localStorage.setItem("Todos", JSON.stringify(Todos))

//   }


//   const handleCheckbox = (e) => {

//     console.log(e, e.target)

//     let id = e.target.name;
//     let index = Todos.findIndex(item => {
//       return item.id === id;
//     })

//     let newTodos = [...Todos];
//     newTodos[index].isCompleted = !newTodos[index].isCompleted;
//     setTodos(newTodos)


//     saveTols();

//   }




//   const handleAdd = () => {
//     setTodos([...Todos, { id: uuidv4(), Todo,date, isCompleted: false }])             /*...Todos is tha way of adding previous todos in array using the spread operator */
//     setTodo("")


//     // store in local storage 
//     saveTols();

//   }

//   const handleEdit = (e, id) => {
//     let T = Todos.filter(i => i.id === id)
//     setTodo(T[0].Todo)


//     let newTodos = Todos.filter(item => {
//       return item.id !== id
//     });
//     setTodos(newTodos)


//   }

//   const handleDelete = (e, id) => {


//     let newTodos = Todos.filter(item => {
//       return item.id !== id

//     });


//     setTodos(newTodos)
//     saveTols()



//   }
//   const handleChange = (e) => {
//     setTodo(e.target.value)

//   }

//   const toggleFinished = () => {
//     setshowFinished(!showFinished)

//   }



//   return (
//     <>
//       <Navbar />


//       <div className="container  mx-auto p-6">

//         <p className="text-center mt-4 text-lg">Manage your tasks efficiently and stay organized!</p>


//       </div>

//       <div className="container mx-auto p-5 my-5 rounded-xl bg-violet-100 min-h-[80vh]">
//         <div className='addtodo'>
//           <h2 className='text-lg font-bold'>Add Task </h2>
//           <input onChange={handleChange} value={Todo} type="text " placeholder='Enter your task here ' className='md:w-4xl w-1/2 bg-amber-50' />
//           <input
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             className="mx-2 bg-amber-50"
//           />
//           <button onClick={handleAdd} disabled={Todo.length <= 3} className='bg-red-500 disabled:bg-violet-800  hover:bg-red-800  text-sm p-2 py-1 text-white font-bold rounded-md mx-6'> save  </button>

//         </div>

//         <h2 className='text-lg font-bold'>Your Tasks</h2>

//         <div className='flex gap-2'>
//           <input onChange={toggleFinished} type="checkbox" name="" id="" />  <span>Show Finished    </span>
//         </div>

//         <div className="todos">
//           {/* default empty div  */}
//           {Todos.length === 0 && <div>No Tasks to Display </div>}


//           {/* Todos with tasks  */}
//           {Todos.map(item => {
//             return (showFinished || !item.isCompleted) && <div key={item.id} className="todo bg-white p-4 my-4 rounded-lg flex justify-between items-center ">
//               <div className="todo flex gap-3">
//                 <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />

//                 <div className={item.isCompleted ? "line-through" : ""}>{item.Todo}</div>
//                 <div className="text-sm text-gray-500">📅 {item.date || "No date"}</div>


//               </div>
//               <div className="buttons flex gap-4">
//                 <button onClick={(e) => handleEdit(e, item.id)} className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-md'><FaEdit /></button>
//                 <button onClick={(e) => { handleDelete(e, item.id) }}
//                   className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-md'><MdDeleteSweep /></button>


//               </div>
//             </div>
//           })}



//         </div>


//       </div>
//       <Footer />
























//     </>
//   )
// }

// export default App



import { useEffect, useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);
  const [editId, setEditId] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("items"));
    if (storedItems) {
      setItems(storedItems);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  // Add or Update
  const handleSubmit = () => {
    if (!input.trim()) return;

    if (editId) {
      setItems(
        items.map(item =>
          item.id === editId ? { ...item, text: input } : item
        )
      );
      setEditId(null);
    } else {
      setItems([...items, { id: Date.now(), text: input }]);
    }

    setInput("");
  };

  // Edit
  const handleEdit = (id) => {
    const item = items.find(item => item.id === id);
    setInput(item.text);
    setEditId(id);
  };

  // Delete
  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div style={{ maxWidth: "400px", margin: "40px auto", textAlign: "center" }}>
      <h2>React CRUD with LocalStorage</h2>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter item"
        style={{ padding: "8px", width: "70%" }}
      />

      <button
        onClick={handleSubmit}
        style={{ padding: "8px", marginLeft: "10px" }}
      >
        {editId ? "Update" : "Add"}
      </button>

      <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
        {items.map(item => (
          <li
            key={item.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px"
            }}
          >
            <span>{item.text}</span>
            <div>
              <button onClick={() => handleEdit(item.id)}>Edit</button>
              <button
                onClick={() => handleDelete(item.id)}
                style={{ marginLeft: "5px" }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

