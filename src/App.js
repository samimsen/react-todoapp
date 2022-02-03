import './App.css';
import './index.css'
import React, { useState, useEffect} from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import TodoFilter from './components/TodoFilter';
import Footer from './components/Footer';

function App() {

  const [inputText, setInputText] = useState("")
  const [todos, setTodos] = useState([])
  const [status, setStatus] = useState("All")
  const [filteredTodos, setFilteredTodos] = useState([])

  useEffect(() => {
    getLocalTodos()
  },[])

  useEffect(() => {
    const filterHandler = () => {
      switch (status) {
        case "Completed":
          setFilteredTodos(todos.filter(todo => todo.completed === true))
          break;
        case "Active":
          setFilteredTodos(todos.filter(todo => todo.completed === false))
          break;
        default:
          setFilteredTodos(todos)
          break;
      }
    }

    const saveLocalTodos = () => {
      localStorage.setItem("todos",JSON.stringify(todos))
  }
    
    filterHandler()
    saveLocalTodos()
  },[todos, status])

  const activeTodos = todos.filter(todo => todo.completed === false)


  const getLocalTodos = () => {
    if(localStorage.getItem("todos" === null)){
      localStorage.setItem("todos",JSON.stringify([]))
    }else{
      let todoLocal = JSON.parse(localStorage.getItem("todos"))
      setTodos(todoLocal)
    }
  }

  return (
    <div>
      <div className="todoapp">
        {
          todos.length === 0 
            ? (
            <>
              <TodoForm inputText={inputText} todos={todos} setTodos={setTodos} setInputText={setInputText}/>
            </>)
            : (
            <>
              <TodoForm inputText={inputText} todos={todos} setTodos={setTodos} setInputText={setInputText}/>
              <TodoList todos={todos} setTodos={setTodos} filteredTodos={filteredTodos} status={status}/>
              <TodoFilter status={status} setStatus={setStatus} todos={todos} setTodos={setTodos} itemsLength={activeTodos.length}/>
              
            </>)
        }
      </div>
      <Footer />
    </div>
  );
}

export default App;
