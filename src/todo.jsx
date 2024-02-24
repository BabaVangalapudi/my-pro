import React, { useState } from 'react'
import './todo.css'

const TodolistApp = () => {
    const[message, setMessage] = useState({
        text:"",
        id:""
    })
    const[list, setList] = useState([])
    const[editingitem,setEditingitem] = useState({
        id:"",
        isediting:false
    })
    const [searchText, setSearchText] = useState('');
    const changeHandle =(e)=>{
        setMessage({
            ...message,
            text: e.target.value
        })
    }
    const handleAdd = (e)=>{
        e.preventDefault();
        let newTodo ={
            text:message.text,
            id: new Date().getTime().toString()
        };
        setList([...list,newTodo]);
        setMessage({
            text:"",
            id:""
        });
    }
    const onHandleDelete=(id)=>{
       const newtodoList = list.filter((each)=>{
            return each.id !== id
       })
       setList(newtodoList)
   }
   const changeEditingState=(id)=>{
    const editItem = list.find((each)=>{
        return each.id === id
    })
    setMessage({
        ...message,
        text:editItem.text,
        id: editItem.id
    })
    setEditingitem({
        ...editingitem,
        id:id,
        isediting:true
    })
   }
   const handleUpdate =(e)=>{
    e.preventDefault()
        const finalTodos = list.map((each)=>{
            if (each.id===editingitem.id){
                return{
                    text: message.text,
                    id: editingitem.id
                }
            }else{
                return each
            }
        })
    setList(finalTodos)
    setMessage({
        text:"",
        id:""
    })
    setEditingitem({
        id:'',
        isediting:false
    })
   }
   const handleSearch = (e) => {
    setSearchText(e.target.value);
};

  return (
    <div className='container'>
        <div className='todo-container'>
        <form>
        <h1>TODO LIST APP</h1>
        <div className='addtodo'>
        <input type="text" name='todos' placeholder='add todos' value={message.text} onChange={changeHandle}/>
        {
            editingitem.isediting ? (<button type='submit' onClick={handleUpdate}>Update</button>) :
           (<button type='submit' onClick={handleAdd}>Add</button>)
        }
        <input type="search" name='search' placeholder='Search Todos' value={searchText} onChange={handleSearch} />
        </div>
        </form>
        <hr style={{textAlign:"center"}}/>
        {
            list.length === 0 && <h2 className='notodos'>there is no todos</h2>
        }
        <ul>{
            list
            .filter(todo => todo.text.toLowerCase().includes(searchText.toLowerCase()))
            .map((each) =>{
             const {id, text}= each
              return(  
              <li key={id}>
                <div style={{display:"flex",gap:"1rem",alignItems:"center"}}>
                <input type="checkbox" style={{width:"15px",height:"15px"}}/>
                <p>{text}</p>
                </div>
                <div>
                <button onClick={()=>changeEditingState(id)}>edit</button>
                <button onClick={()=>onHandleDelete(id)} style={{backgroundColor:"red",color:"white"}}>delete</button>
                </div> 
                </li>
              )
            })
        }
        </ul>
        </div>
    </div>
  )
}

export default TodolistApp;
