import React,{useState,useEffect} from 'react';
import './App.css';
import { Button,FormControl,InputLabel,Input} from '@material-ui/core';
import Message from './Message';
import {db} from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import { IconButton } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

function App() {
  const[input,setInput] =useState('');                              //useState =variable in React
  const[messages,setMessages] =useState([]);
  const[username,setUsername] =useState('');

  //useEffect = runs a piece of code based on the condition
  useEffect(()=>{
    setUsername(prompt("Enter the username"));
  },[])

  const sendMessage= (event) =>{
    //all logic to send message
    //if [] blank inside, this code runs once when component loads
    //[variable] every time variable changes this function executes
    event.preventDefault();

    db.collection('messages').add({
      message:input,
      username:username,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    })

    //setMessages([...messages,{username:username,message:input}]);
    setInput('');
  }

  useEffect(()=>{
    //useEffect runs only when the app loads here
    //snapshot acts like a listener which runs everytime when there is a change in the db
    db.collection('messages').orderBy('timestamp',"desc").onSnapshot(snapshot=>{
      setMessages(snapshot.docs.map(doc =>({id: doc.id, message: doc.data()})))
    });
  },[])

  return (
    <div className="App">
      <h1>Messaging App</h1>
      <h2>Welcome {username}</h2>
      <form className="app__form">
      <FormControl className="app__formControl">

  <Input className="app__input" placeholder="Enter the message..." value={input} onChange={event => setInput(event.target.value)}/>

  <IconButton className="app__iconButton" disabled={!input} variant="contained" color="primary" type='submit' onClick={sendMessage}><SendIcon></SendIcon></IconButton>

      </FormControl>
      </form>
      <FlipMove>
      {
        messages.map(({id,message})=>
          <Message key={id} message={message} username={username}/>           //we are using key for having messages in the right orderqaz
        )
      }
      </FlipMove> 
      
      
    </div>
  );
}

export default App;
