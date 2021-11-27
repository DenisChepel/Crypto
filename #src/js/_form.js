/*form validate*/

$(function(){
    $.validator.setDefaults({
        errorClass: 'help-msg',
        highlight: function (e){
            $(e)
             .closest('.int')
             .addClass('invalid')
             .removeClass('valid')
        },
        unhighlight: function (e){
            $(e)
            .closest('.int')
            .removeClass('invalid')
            .addClass('valid')
        }
    })

    $.validator.addMethod("email",function(value,element) {
        if(this.optional(element))
        {
          return true;
        }else if(/^[A-Za-z0-9._%+--/|{}?]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(value))
        {
          return true;
        }
        return false;
    },"Incorrect email");

    $.validator.addMethod("password",function(value,element) {
        if(this.optional(element))
        {
         return true;
        } else if(/^(?=.*\d)(?=.*[A-Z]).{6,}$/.test(value))
        {
         return true;
        }
        return false;
    },"The password must be at least 6 characters long and contain at least one number and an upper and lower case letter of the Latin alphabet");

    $(".form_main").validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            l_name: {
                required: true,
                minlength: 2

            },
            password: {
                password: true,
                required: true,
            },
            email: {
                required: true,
                email: true,
            },
            checkbox: {
                required: true
            }
        },
        messages: {
            name: {
                required: "This field is required"
            },
            l_name: {
                required: "This field is required"
            },
            password: {
                required: "This field is required"
            },
            email: {
                required: "This field is required"
            },
            checkbox: {
                required: ""
            },
        }
    });
    $.validator.setDefaults({
        errorClass: 'help-msg',
        highlight: function (e){
            $(e)
                .closest('.int_back')
                .addClass('invalid')
                .removeClass('valid')
        },
        unhighlight: function (e){
            $(e)
                .closest('.int_back')
                .removeClass('invalid')
                .addClass('valid')
        }
    })
    $(".form_back").validate({
        rules: {
            password: {
                password: true,
                required: true,
            },
            email: {
                required: true,
                email: true,
            },
        },
        messages: {
            password: {
                required: "This field is required"
            },
            email: {
                required: "This field is required"
            },
        }
    });
})


/*form validate end*/
