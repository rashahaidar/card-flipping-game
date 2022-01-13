//import logo from './logo.svg';
import React, { useEffect, useState } from 'react';

import Card from './Components/Card'
import './App.css';



let cardsList=[
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
  const[counter,setCounter]=useState()
  const[found,setFound]=useState(0)
  const[status,setStatus]=useState({game:false,condition:"Start"})
 

  useEffect(()=>{
    
    let timeOut=setTimeout(() => {
      if(counter>0 && found!==3){
       
        setCounter(counter=>counter-1)
      }
      else{
        if(counter>=0 && found===3){
          //clearTimeout(setCounter(0))
          console.log("You won")
          setStatus({game:false,condition:"Success"})
        }
        else{
          if(counter===0 && found!==3){
            clearTimeout(setCounter(0))
            setcanClick(false)
            console.log("You lost")
            setStatus({game:false,condition:"Fail"})
           
          }
        }
      }
    }, 1000);
    return ()=>clearTimeout(timeOut)
    
     
  },[counter])


  useEffect(()=>{
   // setCounter(counter=>counter-1)
   cardsList=[...cardsList,...cardsList,...cardsList]

   //Add id to each card object
   let updatedCard=cardsList.reduce((acc,currentValue,currentIndex)=>{
      return [...acc,{...currentValue,i:currentIndex+1}]
    },[])
    
    //Shuffle cards and set state
     setCards(shuffle(updatedCard))
    
  },[])

  const shuffle=(cards)=>{

    return cards.sort(()=>Math.random()-0.5)
  }

  const handleStart=()=>{
    resetChoices()
    setFound(0)
    setcanClick(true)
    setCounter(30)
  
    //Unflip any flipped card then shuffle cards then set state
    setCards(shuffle(cards.map(card=>card.flipped?{...card,flipped:false}:card)))

    setStatus({game:true,condition:"game"})
    
 }

 const resetChoices=()=>{
   setChoice1('')
   setChoice2('')
   setChoice3('')
  }

  const storeChoice=(card)=>{
   
     !choice1 ? setChoice1(card) : !choice2 ? setChoice2(card) : setChoice3(card)
     const findCard=cards.find(c=>c===card)
     const updatedCard={...findCard,flipped:true}
     setCards(cards.map(c=>c===card ? updatedCard : c))
 }
 

  useEffect(()=>{
    if(choice1 && choice2 && choice3){
      setcanClick(false)
      if(choice1.src===choice2.src && choice2.src===choice3.src){
        resetChoices()
        setcanClick(true)
        setFound(found+1)
      }
      else{
         setTimeout(() => {
         setCards(cards.map(c=>c.i===choice1.i || c.i===choice2.i || c.i===choice3.i ? {...c,flipped:false}:c))
         resetChoices()
         setcanClick(true)
        }, 1000);
      }
    }
  },[choice1,choice2,choice3,cards])


  return (
   
     <div className='App'>
       <div className='center'>
     <h1>Memory Game</h1>
     <h2>{status.condition==="Start" ? "Press Start to start game": status.condition==="Success" ? "You Won !" : status.condition==="Fail" ? "You Lost !" : ""}</h2>
      <h3>{status.game && `Timer: ${counter}`}</h3>
      <button onClick={handleStart}>{status.condition==="Start" ? "Start Game" : "Replay"}</button>
       </div>
       {
          status.game && <div className='grid-container'>
          {cards.map((card,key)=>(
              <Card key={key} card={card} flipped={card.flipped} storeChoice={storeChoice} canClick={canClick}></Card>
       
           ))}
        </div> 

       }
     
     </div>
    // <div className='App'>
    //   <div className='parent'>
    //     parent
    //     <div className='child1'>Child1</div>
    //     <div className='child2'>
    //      child2
    //     </div>
    //     <div className='child2'>
    //      child3
    //     </div>
    //   </div>


    // </div>
  );
}

export default App;
