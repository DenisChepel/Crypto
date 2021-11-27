window.addEventListener('load', function (){
@@include('_burger.js')

@@include('_crypto_rate.js')

    /*draggable false*/
const imgs = document.getElementsByTagName('img');
    for(let i = 0; i < imgs.length; i++ ) {
        imgs[i].setAttribute("ondragstart", "return false")
    }
    /*draggable false*/


    /* checked card */

    let cardBasic = document.querySelector('#p10')
    let cardPremium = document.querySelector('#p20')
    let cardUnlimited = document.querySelector('#p30')
    let checkBasic = document.querySelector('.check_circle_basic')
    let checkPremium = document.querySelectorAll('.check_circle_premium')
    let checkUnlimited = document.querySelectorAll('.check_circle_unlimited')

    cardBasic.addEventListener('mouseenter', function (){
        this.classList.add('p_card_active')
        checkBasic.style.fill = '#FFA825'
        checkPremium.forEach(premiumCircle => {
            premiumCircle.style.fill = '#ffffff'
        })
        checkUnlimited.forEach(unlimitedCircle => {
            unlimitedCircle.style.fill = '#ffffff'
        })
        cardPremium.classList.remove('p_card_active')
        cardUnlimited.classList.remove('p_card_active')
    })
    cardPremium.addEventListener('mouseenter', function (){
        this.classList.add('p_card_active')
        checkBasic.style.fill = '#ffffff'
        checkPremium.forEach(premiumCircle => {
            premiumCircle.style.fill = '#FFA825'
        })
        checkUnlimited.forEach(unlimitedCircle => {
            unlimitedCircle.style.fill = '#ffffff'
        })
        cardBasic.classList.remove('p_card_active')
        cardUnlimited.classList.remove('p_card_active')
    })
    cardUnlimited.addEventListener('mouseenter', function (){
        this.classList.add('p_card_active')
        checkBasic.style.fill = '#ffffff'
        checkPremium.forEach(premiumCircle => {
            premiumCircle.style.fill = '#ffffff'
        })
        checkUnlimited.forEach(unlimitedCircle => {
            unlimitedCircle.style.fill = '#FFA825'
        })
        cardBasic.classList.remove('p_card_active')
        cardPremium.classList.remove('p_card_active')
    })

    /* checked card end */

    /*form validate*/
    @@include('_form.js')
    /*form validate end*/

    /*form switch*/
    let formFront = document.querySelector('.form_wrap_front')
    let formBack = document.querySelector('.form_wrap_back')
    let itemSwitch = document.querySelector('#reg-log')

    itemSwitch.addEventListener('click', function (){
        if(this.checked){
            formFront.style.display = "none"
            formBack.style.display = "block"
        } else {
            formFront.style.display = "block"
            formBack.style.display = "none"
        }
    })
    /*form switch end*/

    /*scroll to form*/
    let btnToForm = document.querySelectorAll('.to_form')

    btnToForm.forEach(scrollTo => {
        scrollTo.addEventListener('click', function (){
            document.getElementById('form').scrollIntoView( {
                behavior: 'smooth',
                block: 'start'
            })
        })
    })

    /*scroll to form end*/
})

