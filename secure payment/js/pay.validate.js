function setDefaultsValidator() {
    jQuery.validator.setDefaults({
        focusInvalid: true,
        invalidHandler: function(form, validator) {
            if (!validator.numberOfInvalids())
                return;

            var firstInvalidElement = $(validator.errorList[0].element);

            $('html, body').animate({
                scrollTop: firstInvalidElement.offset().top - 100
            }, 500);

            firstInvalidElement.trigger("focus");
        },
        errorElement: 'span',
        errorPlacement: function (error, element) {
            error.addClass('d-none');
        },
        highlight: function (element) {
            $(element).closest(".form-control").addClass("is-invalid");
        },
        unhighlight: function (element) {
            $(element).closest(".form-control").removeClass("is-invalid");
            $(element).closest(".form-control").addClass("is-valid");
        },
        ignore: ":hidden, [contenteditable='true']:not([name])"
    });
}

function validateForm(form) {
    $(form).validate({
        success: "is-valid",
        validClass: "is-valid",
        errorClass: "is-invalid"
    });
}

function isFormValid(form) {
    return $(form).valid();
}

function select2ListenerValidate() {
    // Trigger value to jquery validate select2
    $('select.select2-hidden-accessible').on("change", function (e) {
        try {
            $(this).valid();    
        } catch (error) {}
    })
}
