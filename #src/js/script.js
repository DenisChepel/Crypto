window.addEventListener('load', function (){
@@include('_burger.js')

@@include('_crypto_rate.js')

/*draggable false*/
const imgs = document.getElementsByTagName('img');
    for(let i = 0; i < imgs.length; i++ ) {
        imgs[i].setAttribute("ondragstart", "return false")
    }
/*draggable false*/
})

