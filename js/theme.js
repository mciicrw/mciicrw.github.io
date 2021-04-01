// social button handler
const socialButton = document.querySelector('#social');
let s = "y";
socialButton.onclick = () => {
    
    if (s==="y") {
        document.querySelector('#socialCard').style.transform = "translateY(12vh)";
        return s = "n";
        
    }
    document.querySelector('#socialCard').style.transform = "translateY(0vh)" 
    return s = "y";
}

let themeCheckbox = document.querySelector('input[name=theme]');

themeCheckbox.addEventListener('change', function() {
    if(this.checked){
        trans();
        console.log('not-checked');
        document.documentElement.setAttribute('data-theme','dark');
    } else {
        trans();
        console.log('checked');
        document.documentElement.setAttribute('data-theme','light');
    }
});

let trans = () => {
    document.documentElement.classList.add('transition');
    setTimeout(() => {
        document.documentElement.classList.remove('transition');
    }, 1000);
}