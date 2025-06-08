import { useState,useEffect } from 'react'
import Navbar from './components/Navbar'
import {v4 as uuidv4} from 'uuid';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";



function App() {

  const [todo,setTodo]=useState("") //input text
  const [todos,setTodos]=useState([]) //array of all todos
  const [loaded, setLoaded] = useState(false);
  const [showfinished,setshowfinished]=useState(true)

  // Load from localStorage (once)
  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      setTodos(JSON.parse(todoString));
    }
    setLoaded(true); // Mark as loaded
  }, []);

  // Save to localStorage (only after initial load)
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos, loaded]);


  
  const toggleFinished=(e) => {

    setshowfinished(!showfinished);

  }
  


  const handleEdit= (e,id)=>{
    let t=todos.filter(i=>i.id===id)
    setTodo(t[0].todo)

    let newTodos=todos.filter(item=>{
      return item.id!==id;
    });

    setTodos(newTodos)
    // saveToLS()

  }

  const handleDelete=(e,id)=>{

    const confirmed = window.confirm("Are you sure you want to delete this todo?");
    if (!confirmed) return;

    let newTodos=todos.filter(item=>{
      return item.id!==id;
    });

    setTodos(newTodos)
    // saveToLS()
  }

  const handleAdd=()=>{
    setTodos([...todos,{id: uuidv4(), todo, isCompleted:false}])
    setTodo("")
    // saveToLS()
  }

  const handleChange=(e)=>{
    setTodo(e.target.value)
  }

  const handleCheckbox=(e) => {
    let id=e.target.name;
    let index=todos.findIndex(item=>{
      return item.id === id;
    })

    let newTodos=[...todos];
    newTodos[index].isCompleted=!newTodos[index].isCompleted;
    setTodos(newTodos)
    // saveToLS()
  }
  


  return (
    <>
    <Navbar/>
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl bg-violet-100 p-5 min-h-[80vh] md:w-1/2">
        
        <h1 className='font-bold text-center text-xl '>iTask- Manage your tasks at one place</h1>
        <div className="addTodo my-5 flex  flex-col gap-4">
          <h2 className='text-lg font-bold'>Add a Todo</h2>

          <div className="flex">
              <input onChange={handleChange}  value={todo} type="text" className='w-full bg-white rounded-md px-5 py-1 ' />
              <button onClick={handleAdd}  disabled= {todo.length<=3}className='bg-violet-800 hover:bg-violet-950 disabled:bg-violet-500 mx-2  p-2 py-1 text-sm font-bold text-white rounded-md '>Save</button>
          </div>
          
        </div>

        <input  className='my-4' onChange={toggleFinished} type="checkbox" checked={showfinished} /> Show Finished
        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>



        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className="todos">
          {todos.length===0 && <div className='m-5'>No Todos to display</div>}
          {todos.map(item=>{

         
          return (showfinished || !item.isCompleted ) && <div key={item.id} className="todo flex md:w-3/4 justify-between my-3">
            <div className="flex gap-5">
              <input onChange={handleCheckbox} name={item.id} type="checkbox" id="" checked={item.isCompleted} />
              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
            
            <div className="buttons flex h-full">
              <button onClick={(e)=>{handleEdit(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaRegEdit /></button>
              <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><MdDelete /></button>

            </div>
          </div>
           })}
        </div>
        
      </div>
    </>
  )
}

export default App
