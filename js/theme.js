// social button handler
const socialButton = document.querySelector('#social');
let s = "y";
socialButton.onclick = () => {
    
    if (s==="y") {
        document.querySelector('#socialCard').style.transform = "translateY(15vh)";
        return s = "n";
        
    }
    document.querySelector('#socialCard').style.transform = "translateY(0vh)" 
    return s = "y";
}

/** theme switch handler */
let themeCheckbox = document.querySelector('input[name=theme]');

themeCheckbox.addEventListener('change', function() {
    if(this.checked){
        //trans();
        console.log('not-checked');
        document.documentElement.setAttribute('data-theme','dark');
    } else {
       // trans();
        console.log('checked');
        document.documentElement.setAttribute('data-theme','light');
    }
});

/** adding transition to all element */
let trans = () => {
    document.documentElement.classList.add('transition');
    setTimeout(() => {
        document.documentElement.classList.remove('transition');
    }, 1000);
}

/** copy to clipboard function */
function copyStringToClipboard (str) {
    // Create new element
    var el = document.createElement('textarea');
    // Set value (string to be copied)
    el.value = str;
    // Set non-editable to avoid focus and move outside of view
    el.setAttribute('readonly', '');
    el.style = {position: 'absolute', left: '-9999px'};
    document.body.appendChild(el);
    // Select text inside element
    el.select();
    // Copy text to clipboard
    document.execCommand('copy');
    // Remove temporary element
    document.body.removeChild(el);
 }

 const discord = document.querySelector('#discord');
 discord.addEventListener('click', function(){

    copyStringToClipboard("TypicalNob-#3733"); 
    alert("Text copied to clipboard");
 })
   
 