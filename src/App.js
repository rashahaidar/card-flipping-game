//import logo from './logo.svg';
import React, { useEffect, useState } from 'react';

import Card from './Components/Card'
import './App.css';



const cardsList=[
  { 

    src:'/images/Lion.png',
    flipped:false
  
  },
  {
    src:'/images/MickeyMouse.png',
    flipped:false
   
  },
  {

    src:'/images/Pikachu.png',
    flipped:false
   
  }
]


const App=()=> {
  const[cards,setCards]=useState([])
  const[choice1,setChoice1]=useState('')
  const[choice2,setChoice2]=useState('')
  const[choice3,setChoice3]=useState('')
  const[canClick,setcanClick]=useState(true)
  const[timer,setTimer]=useState()
  const[found,setFound]=useState(0)
  const[status,setStatus]=useState({game:false,condition:"Start"})
 
  //On Timer change
  useEffect(()=>{
    
    let timeOut=setTimeout(() => {
      if(timer>0 && found!==3){
       
        setTimer(timer=>timer-1)
      }
      else{
        if(timer>=0 && found===3){
          //clearTimeout(setCounter(0))
          console.log("You won")
          setStatus({game:false,condition:"Success"})
        }
        else{
          if(timer===0 && found!==3){
            clearTimeout(setTimer(0))
            setcanClick(false)
            console.log("You lost")
            setStatus({game:false,condition:"Fail"})
           
          }
        }
      }
    }, 1000);
    return ()=>clearTimeout(timeOut)
    
     
  },[timer,found])


  useEffect(()=>{
    //Triplicate Array of Cards
    let triplicatedCards=[...cardsList,...cardsList,...cardsList]

    //Add id to each card object
    let updatedCards=triplicatedCards.reduce((acc,currentValue,currentIndex)=>{
      return [...acc,{...currentValue,i:currentIndex+1}]
    },[])
    
    //Shuffle cards and set state
     setCards(shuffle(updatedCards))
     },[])

  //Shuffle Cards
  const shuffle=(cards)=>cards.sort(()=>Math.random()-0.5)
  
  //Start Game button click
  const handleStart=()=>{
    resetChoices()
    setFound(0)
    setcanClick(true)
    //Start the timer
    setTimer(30)
  
    //Unflip any flipped card then shuffle cards then set state
    setCards(shuffle(cards.map(card=>card.flipped?{...card,flipped:false}:card)))

    setStatus({game:true,condition:"game"})
    
 }

 //Reset Choices
 const resetChoices=()=>{
   setChoice1('')
   setChoice2('')
   setChoice3('')
  }

  
  const storeChoice=(card)=>{
   
     //If Choice1 empty store in Choice1 else if Choice2 empty store in Choice2 else store in Choice3
     !choice1 ? setChoice1(card) : !choice2 ? setChoice2(card) : setChoice3(card)
     //Find the chosen card and update flipped to True
     const findCard=cards.find(c=>c===card)
     const updatedCard={...findCard,flipped:true}
     //Set state with the updated Cards
     setCards(cards.map(c=>c===card ? updatedCard : c))
 }
 

  useEffect(()=>{
    //If 3 choices are selected
    if(choice1 && choice2 && choice3){
      //Disable all the other unflipped cards
      setcanClick(false)
      //If all selected choices are same
      if(choice1.src===choice2.src && choice2.src===choice3.src){
        resetChoices()
        setcanClick(true)
        setFound(found+1)
      }
      else{
        //Flip the cards back after 1 sec
         setTimeout(() => {
         setCards(cards.map(c=>c.i===choice1.i || c.i===choice2.i || c.i===choice3.i ? {...c,flipped:false}:c))
         resetChoices()
         setcanClick(true)
        }, 1000);
      }
    }
  },[choice1,choice2,choice3,cards,found])


  return (
   
     <div className='App'>
     <div className='center'>
     <h1>Memory Game</h1>
     <h2>{status.condition==="Start" ? "Press Start to start game": status.condition==="Success" ? "You Won !" : status.condition==="Fail" ? "You Lost !" : ""}</h2>
     <h3>{status.game && `Timer: ${timer}`}</h3>
     <button onClick={handleStart}>{status.condition==="Start" ? "Start Game" : "Replay"}</button>
     </div>
     {
          status.game && <div className='grid-container'>
          {cards.map((card,key)=>(
              <Card key={key} card={card} flipped={card.flipped} storeChoice={storeChoice} canClick={canClick}></Card>
            ))
          }
        </div> 
     }
     </div>
 
  );
}

export default App;
