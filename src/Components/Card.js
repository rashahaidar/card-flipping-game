
import '../App.css'



const Card=({card,flipped,storeChoice,canClick})=>{
    const handleClick=()=>{
      
        storeChoice(card)

    }
  

return(
   
    <div className='grid-item'>
        <div className='animation'>
         { 
       flipped ? <img src={card.src} alt=''></img> : canClick ? <img src='images/FrontImage.png' alt='' onClick= {handleClick} ></img> : <img src='images/FrontImage.png' alt='' ></img>
        } 
        </div>
    </div>
    // <div className='card'>
    // <div className='back'>
    // <img src={card.src} alt='BackImage'></img>
    // </div>
    // <div className='front'>
    // <img src='images/FrontImage.png' alt='FrontImage'></img>
    // </div>
    // </div>
    
) 

}

export default Card