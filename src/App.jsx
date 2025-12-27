import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";


import { v4 as uuidv4 } from 'uuid';
import Footer from './components/Footer';


// uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
function App() {
  const [Todo, setTodo] = useState("")
  const [Todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(false)
const [date, setDate] = useState("")


  useEffect(() => {
    let TodoString = localStorage.getItem("Todos")
    if (TodoString) {
      let Todos = JSON.parse(localStorage.getItem("Todos"))
      setTodos(Todos)

    }
  }, [])







  // local storage function 

  const saveTols = () => {
    localStorage.setItem("Todos", JSON.stringify(Todos))

  }


  const handleCheckbox = (e) => {

    console.log(e, e.target)

    let id = e.target.name;
    let index = Todos.findIndex(item => {
      return item.id === id;
    })

    let newTodos = [...Todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)


    saveTols();

  }




  const handleAdd = () => {
    setTodos([...Todos, { id: uuidv4(), Todo,date, isCompleted: false }])             /*...Todos is tha way of adding previous todos in array using the spread operator */
    setTodo("")


    // store in local storage 
    saveTols();

  }

  const handleEdit = (e, id) => {
    let T = Todos.filter(i => i.id === id)
    setTodo(T[0].Todo)


    let newTodos = Todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)


  }

  const handleDelete = (e, id) => {


    let newTodos = Todos.filter(item => {
      return item.id !== id

    });


    setTodos(newTodos)
    saveTols()



  }
  const handleChange = (e) => {
    setTodo(e.target.value)

  }

  const toggleFinished = () => {
    setshowFinished(!showFinished)

  }



  return (
    <>
      <Navbar />


      <div className="container  mx-auto p-6">

        <p className="text-center mt-4 text-lg">Manage your tasks efficiently and stay organized!</p>


      </div>

      <div className="container mx-auto p-5 my-5 rounded-xl bg-violet-100 min-h-[80vh]">
        <div className='addtodo flex flex-col gap-3 md:flex-row'>
          <h2 className='text-lg font-bold text-center md:text-start'>Add Task </h2>
          <input onChange={handleChange} value={Todo} type="text " placeholder='Enter your task here ' className='md:w-4xl  bg-amber-50' />
           
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mx-2 bg-amber-50 "
          />
          <button onClick={handleAdd} disabled={Todo.length <= 3} className='bg-red-500 disabled:bg-violet-800  hover:bg-red-800  text-sm p-2 py-1 text-white font-bold rounded-md mx-6'> save  </button>

        </div>

        <h2 className='text-lg font-bold m-3'>Your Tasks</h2>

        <div className='flex gap-2'>
          <input onChange={toggleFinished} type="checkbox" name="" id="" />  <span>Show Finished    </span>
        </div>

        <div className="todos">
          {/* default empty div  */}
          {Todos.length === 0 && <div>No Tasks to Display </div>}


          {/* Todos with tasks  */}
          {Todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo bg-white p-4 my-4 rounded-lg flex justify-between items-center ">
              <div className="todo flex gap-3">
                <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />

                <div className={item.isCompleted ? "line-through" : ""}>{item.Todo}</div>
                <div className="text-sm text-gray-500">📅 {item.date || "No date"}</div>


              </div>
              <div className="buttons flex gap-4">
                <button onClick={(e) => handleEdit(e, item.id)} className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-md'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }}
                  className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-md'><MdDeleteSweep /></button>


              </div>
            </div>
          })}



        </div>


      </div>
      <Footer />
























    </>
  )
}

export default App



