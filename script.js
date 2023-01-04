const buttons = document.querySelectorAll('input')
const display = document.querySelector('.display')

let tabValueEntry= []
let tabTypeEntry=[]
let number=""
let displayString=''


function getValue(e)
{
  
   
    if(display.innerText == '0' && tabTypeEntry.includes('number'))
        display.innerHTML=''

        if(tabTypeEntry.length == 0 && this.dataset.type !== 'operator'||'number'=== this.dataset.type|| number =='' && this.dataset.type !== 'operator')
            { 
               
                number = number.concat('',this.value)
                
                displayString = displayString.concat('',this.value)
                
            }
        else
        {
            if(!tabTypeEntry.length == 0 && tabTypeEntry.includes('number'))
            {
                tabValueEntry.push(number)
                tabValueEntry.push(this.value)
                
                displayString = displayString.concat('',this.value)
                display.innerHTML = displayString
                number= ""
            }
        }

        display.innerHTML = displayString

        
        

   
    if(tabTypeEntry.length == 0 || tabTypeEntry[tabTypeEntry.length-1] !== this.dataset.type)
            tabTypeEntry.push(this.dataset.type)

        
            
    
 
  
    
   // console.log(tabValueEntry)
            


 
        
    

    if(this.value == '=')
    {
        let valeurs = []
        let operator= []
        let summstotal=0

        for(i=0;i<tabValueEntry.length-1;i++)
        {
            if(i%2 === 0)
            { 
                valeurs[i]=tabValueEntry[i]
                valeurs = valeurs.filter(t => t)

            }
             else
             {
                operator[i] = tabValueEntry[i]
                operator = operator.filter(o=> o)
                //console.log(operator)
               
             }  
 
        }
        if(operator.indexOf('x') == -1 && operator.indexOf('÷') == -1)
        {
            total=valeurs[0]*1
            valeurs.splice(0,1)
        }
        else
        
            if(operator.indexOf('x') !== -1)
            {
                total= valeurs[operator.indexOf('x')]
                valeurs.splice(operator.indexOf('x'),1)
            }
            
            if(operator.indexOf('÷') !== -1)
            {
                valeurs[operator.indexOf('÷')]
                valeurs.splice(operator.indexOf('÷'),1)
            }
            
        z=0

        while(valeurs.length)
        {
           if(operator.indexOf('x') !== -1)
           {
            if(operator.length>1 && !operator.some((value,index)=> operator.indexOf(value)===index))
            {
                total = total* valeurs[operator.indexOf('x')]*valeurs[operator.indexOf('x')+1]
                valeurs.splice(operator.indexOf('x'),2)
                operator.splice(operator.indexOf('x'),2)
            }
            else
            {
                total = total * valeurs[operator.indexOf('x')]
                valeurs.splice(operator.indexOf('x'),1)
                operator.splice(operator.indexOf('x'),1)
            }
                  
           }
           if(operator.indexOf('÷') !== -1)
           {
                
                if(operator.length>1 && !operator.some((value,index)=> operator.indexOf(value)===index))
                {
                    total = total/valeurs[operator.indexOf('÷')]/ valeurs[operator.indexOf('÷')+1]
                    valeurs.splice(operator.indexOf('÷'),2)
                    operator.splice(operator.indexOf('÷'),2)
                    
                }
                else
                {
                    total = total / valeurs[operator.indexOf('÷')]
                    valeurs.splice(operator.indexOf('÷'),2)
                    operator.splice(operator.indexOf('÷'),1)
                }

           }
           
            if(operator[0] ==='+' && operator.indexOf('x') == -1 && operator.indexOf('÷') == -1)
            {
                if(valeurs.length ==1)
                {    
                total = valeurs[0]*1 +total *1
                valeurs.splice(0,1)
                operator.splice(0,1)
                }
                else{
                    let summs=0
                    summs = valeurs[0]*1+ valeurs[1]*1 
                    valeurs.splice(0,2)
                    operator.splice(0,1)
                    valeurs[0] = summs;
                }
                 
            }
            if(operator[0]==='-' && operator.indexOf('x') == -1 && operator.indexOf('÷') == -1)
            {
                if(valeurs.length ==1)
                {   
                total = valeurs[0]*1 - total *1
                valeurs.splice(0,1)
                operator.splice(0,1)
                }
                else{
                    let summs=0
                    summs= valeurs[0]*1 - valeurs[1]*1 
                    valeurs.splice(0,2)
                    operator.splice(0,1)
                    valeurs[0] = summs;

                }

               
            }
           
            
        }
        
        
        if(isNaN(total))
        display.innerHTML= displayString+' Result is not a number'
        else
        display.innerHTML = displayString + total
        total=0




        // if(tabValueEntry[1]==='+')
        //     display.innerHTML=`${tabValueEntry[0]} ${tabValueEntry[1]} ${tabValueEntry[2]} = ${tabValueEntry[0]*1 + tabValueEntry[2]*1}`
        // if(tabValueEntry[1] === '-')
        //     display.innerHTML=` ${tabValueEntry[0]} ${tabValueEntry[1]} ${tabValueEntry[2]} = ${tabValueEntry[0]*1 - tabValueEntry[2]*1}`
        // if(tabValueEntry[1] === 'x')
        //     display.innerHTML=`${tabValueEntry[0]} ${tabValueEntry[1]} ${tabValueEntry[2]} = ${tabValueEntry[0]*1 * tabValueEntry[2]*1}`
        //     if(tabValueEntry[1] === '÷')
        //     display.innerHTML=`${tabValueEntry[0]} ${tabValueEntry[1]} ${tabValueEntry[2]} = ${tabValueEntry[0]*1 / tabValueEntry[2]*1}`
        //     reset()
    }
   

    if(this.dataset.type==='delete')
    {
        reset()
        clearDisplay()
        number=''
    }
     
     

}

function reset()
{
    tabTypeEntry=[]
    tabValueEntry=[]
    displayString=''
}
function clearDisplay()
{
    display.innerHTML='0'
}

buttons.forEach(button => { 
    if(!button.classList.contains('red'))
        button.addEventListener('click',getValue)

})