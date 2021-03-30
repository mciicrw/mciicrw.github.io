const socialButton = document.querySelector('#social');
let s = "y";
socialButton.onclick = () => {
    
    if (s==="y") {
        document.querySelector('#socialCard').style.transform = "translateY(12vh)";
        console.log(s);
        return s = "n";
        
    }
    document.querySelector('#socialCard').style.transform = "translateY(0vh)" 
    console.log(s);
    return s = "y";
}