const buttons = document.querySelectorAll('input')
const display = document.querySelector('.display')
const lastResult = document.querySelector('.lastResult')
const clickMe = document.querySelector('.clickme')

let tabValueEntry= []
let tabTypeEntry=[]
let number=""
let valeurs = []
let operator= []
let displayString=''
display.innerText='0'


function getValue(e)
{
    if(this.value ==='<=')
       {
         displayString =displayString.substring(0,displayString.length-1)
         number=number.substring(0,number.length-1)
         
       }
    if(display.innerText == '0' && tabTypeEntry.includes('number'))
        display.innerText=''

        if((tabTypeEntry.length == 0 && this.dataset.type !== 'operator'||'number'=== this.dataset.type|| number =='' && this.dataset.type !== 'operator')&&this.dataset.type !=="delete")
            { 
               
                number = number.concat('',this.value)
                
                displayString = displayString.concat('',this.value)
                
            }
        else
        {
            if(!tabTypeEntry.length == 0 && tabTypeEntry.includes('number')&& this.dataset.type !=="delete")
            {
                tabValueEntry.push(number)
                tabValueEntry.push(this.value)
                
                displayString = displayString.concat('',this.value)
                display.innerText = displayString
                number= ""
            }
        }

        display.innerText = displayString

    if((tabTypeEntry.length == 0 || tabTypeEntry[tabTypeEntry.length-1] !== this.dataset.type ) && this.dataset.type !=="delete")
            tabTypeEntry.push(this.dataset.type)


    if(this.value == '=')
    {
       
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
                
               
             }  
 
        }
      
        while(valeurs.length && operator.length)
        {

        if(operator.indexOf('x')!== -1 && operator.indexOf('÷') !== -1)
        {
            ChoosePrio()
        }
        if(operator.indexOf('x') !== -1)
            multiply()
        
           
        if(operator.indexOf('÷') !== -1)
            divide()
        
           
        if(operator[0] ==='+')
            summs()
                 
            
        if(operator[0]==='-')
            soustract()
 
        }
        
        
        if(isNaN(total))
        display.innerText= displayString+' Result is not a number'
        else
        display.innerText = displayString + total
        lastResult.innerText = "="+total
        total=0
        reset()

    }
   

    if(this.value==='Del')
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
function multiply()
{
            total = valeurs[operator.indexOf('x')+1] * valeurs[operator.indexOf('x')]
            valeurs.splice(operator.indexOf('x'),2)
            valeurs.splice(operator.indexOf('x'),0,total)
            operator.splice(operator.indexOf('x'),1)
            if(valeurs.length == 1)
            {
                total= valeurs[0]
                valeurs.splice(0,1)
            }

}

function divide()
{
    total = valeurs[operator.indexOf('÷')] / valeurs[operator.indexOf('÷')+1]
                valeurs.splice(operator.indexOf('÷'),2)
                
                valeurs.splice(operator.indexOf('÷'),0,total)
                operator.splice(operator.indexOf('÷'),1)
                if(valeurs.length == 1)
                {
                    total= valeurs[0]
                    valeurs.splice(0,1)
                }

}
function summs()
{
    total = valeurs[operator.indexOf('+')]*1+valeurs[operator.indexOf('+')+1]*1
    valeurs.splice(operator.indexOf('+'),2)
    valeurs.splice(operator.indexOf('+'),0,total)
    operator.splice(operator.indexOf('+'),1)
    if(valeurs.length == 1)
    {
        total= valeurs[0]
        valeurs.splice(0,1)
    }
}
function soustract()
{
    total = valeurs[operator.indexOf('-')]-valeurs[operator.indexOf('-')+1]
                valeurs.splice(operator.indexOf('-'),2)
                valeurs.splice(operator.indexOf('-'),0,total)
                operator.splice(operator.indexOf('-'),1)
                if(valeurs.length == 1)
                {
                    total= valeurs[0]
                    valeurs.splice(0,1)
                }

}

function clearDisplay()
{
    display.innerText='0'
}

function ChoosePrio()
{
    if(operator.indexOf('x')< operator.indexOf('÷'))
        multiply()
    else
        divide()
    
}

buttons.forEach(button => { 
    if(!button.classList.contains('clickme'))
        button.addEventListener('click',getValue)

})

document.addEventListener('keydown',(e)=>{
    buttons.forEach(button => {
            let valeur = parseInt(button.dataset.key)

            if(valeur === e.keyCode)
            {
                button.click()
            }
            console.log(e)
 
            
    })
    
})

clickMe.addEventListener('click',(e)=>{
    e.preventDefault()
    if(document.querySelector('.container').style.display==="none")
    {
        document.querySelector('.container').style.display='flex'
        document.body.style.backgroundImage ='none'
        clickMe.value = "You should listen, now you are stuck with me !"
        clickMe.style.backgroundColor ="red"
        clickMe.classList.remove('clickme')
        clickMe.classList.add('clicked')
       
        clickMe.disabled=true
    }
    else
    {
    document.querySelector('.container').style.display='none'
    document.body.style.backgroundImage ='url(./img/that-was-boring.jpg)'
    clickMe.value = 'Why?'
    clickMe.style.backgroundColor = 'white'
    clickMe.style.color = "black"
    }

})