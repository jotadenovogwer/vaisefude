"use strict";

/**
 * @param {elementHTML} input - Input element, normally sent from callback of 'change' event of field.
 */
function getBase64(input) {
    var def = $.Deferred();
    try {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                def.resolve(e.target.result);
            };
            reader.readAsDataURL(input.files[0]); // convert to base64 string
        } else {
            def.reject();
        }
    } catch (error) {
        def.reject(error);
    }
    return def;
}

/**
 * @param {string} progressHolderId - Id of the progress (horizontal bar loading) element.
 * @param {string} imgSrc - Path of the image.
 * @param {string} imgHolderId - Id of the section/element that holds the image.
 * @param {boolean} isBackground - Flag to check if change background image, or image tag src.
 */

function setTempPathImgUpload(imgHolderId, imgSrc, progressHolderId, isBackground) {
    if (!progressHolderId) {
        changeUrlImg($("#" + imgHolderId), imgSrc, isBackground);
    } else {
        $("#" + imgHolderId).fadeOut("400");
        setTimeout(function () {
            $("#" + progressHolderId).removeClass("d-none-ni");
            $("#" + progressHolderId + " .progress-bar").width("25%");
        }, 500);
        setTimeout(function () {
            $("#" + progressHolderId + " .progress-bar").width("100%");
        }, 1000);
        setTimeout(function () {
            changeUrlImg($("#" + imgHolderId), imgSrc, isBackground);
            $("#" + progressHolderId).addClass("d-none-ni");
            $("#" + progressHolderId + " .progress-bar").width("0%");
            $("#" + imgHolderId).fadeIn("500");
        }, 1500);
    }
}

/**
 * @param {elementJQuery} element - Element that needs the image to be changed url.
 * @param {string} imgSrc - Path of the image.
 * @param {boolean} isBackground - Flag to check if change background image, or image tag src.
 */

function changeUrlImg(element, imgSrc, isBackground) {
    if (isBackground) {
        $(element).css("background-image", `url('` + imgSrc + `')`);
    } else {
        $(element).attr("src", imgSrc);
    }
}

/**
 * @param {string} url - Laravel url that is being used on js for example:
 * `{{ route('products.urlcampaign.store', [':product_code']) }}`.
 * @param {Array.<{alias: String, value: any}>} params - Contains the url param name and the value that
 * needs to replace that param name.
 */
function laravelReplaceUrlAlias(url, params) {
    for (var i = 0; i < params.length; i++) {
        url = url.replace(params[i].alias, params[i].value);
    }
    return url;
}

/**
 * @param {string} url - url of the image, as an example: https://imageurl.com.br/fileName.pdf
 */
function getFileExtensionFromUrl(url) {
    const fileName = url.substring(url.lastIndexOf("/") + 1);
    return getFileExtension(fileName);
}

/**
 * @param {string} fileName - name of the image with extension, as an example: fileName.pdf
 */
function getFileExtension(fileName) {
    return fileName.split(".").pop();
}

/**
 * @param {object} errors - Erro de validação retornado do backend, normalmente
 * no seguinte formato: {"commission":["O campo commission deve conter um valor numérico."]}
 */
function mapValidationErrors(errors) {
    errors = errors || [];
    var indexes = Object.keys(errors);
    var errorMessageArray = [];

    for (var i = 0; i < indexes.length; i++) {
        errorMessageArray.push(errors[indexes[i]]);
    }

    return errorMessageArray;
}

/**
 * @param {Array} errors - Recebe array com mensagem de erro a serem exibidos no toastr
 */
function showValidationToastErrors(errors) {
    var errorMessageArray = mapValidationErrors(errors);
    errorMessageArray.forEach(function (errorMessage) {
        toastr["error"](errorMessage);
    });
}

function onlyNumbers(event) {
    var charCode = event.charCode ? event.charCode : event.keyCode;
    // charCode 8 = backspace
    // charCode 9 = tab
    if (charCode != 8 && charCode != 9) {
        // charCode 48 equivale a 0
        // charCode 57 equivale a 9
        if (charCode < 48 || charCode > 57) {
            return false;
        }
    }
}

/**
 * @param {element} element - Switch element that needs to be manipulated.
 * @param {boolean} isCheck - Flag to verify checked or not checked switch.
 */
function toggleSwitch(el, isCheck) {
    if (isCheck) {
        $(el).val(1).prop("checked", true);
    } else {
        $(el).val(0).prop("checked", false);
    }
}

/**
 * @param {string} title The title of the popup, allow HTML.
 * @param {string} html A HTML description for the popup.
 * @param {string} confirmButtonText Use this to change the text on the "Confirm"-button.
 * @param {string} cancelButtonText Use this to change the text on the "Cancel"-button.
 * @param {Array<string>}  customClass A custom CSS class for the popup.
 */
function confirmationPay({
    title,
    html,
    confirmButtonText = "Confirmar",
    cancelButtonText = "Cancelar",
    customClass,
    showCancelButton = true,
    input = null
}) {
    let classList = ["swal-perfectpay"];
    classList = customClass ? [...classList, ...customClass] : classList;
    return Swal({
        title: title,
        html: html,
        type: "",
        input,
        showCancelButton: showCancelButton,
        confirmButtonText: confirmButtonText,
        cancelButtonText: cancelButtonText,
        customClass: classList,
        width: "432px",
        showCloseButton: true,
        reverseButtons: true,
    });
}

function generateRandomCode() {
    return "_" + Math.random().toString(36).substr(2, 9);
}

/**
 * Trata uma string removendo caracteres especiais.
 * @example removeSpecial("Caiçarapoã 123") > "caicarapoa123"
 * @param str String a ser tratada.
 */
function removeSpecial(str) {
    let s = str.toLowerCase();
    s = s.replace(/\s+/gi, '');
    s = s.replace(/[àáâãäå]+/gi, 'a');
    s = s.replace(/æ+/gi, 'ae');
    s = s.replace(/ç+/gi, 'c');
    s = s.replace(/[èéêë]+/gi, 'e');
    s = s.replace(/[ìíîï]+/gi, 'i');
    s = s.replace(/ñ+/gi, 'n');
    s = s.replace(/[òóôõö]+/gi, 'o');
    s = s.replace(/œ+/gi, 'oe');
    s = s.replace(/[ùúûü]+/gi, 'u');
    s = s.replace(/[ýÿ]+/gi, 'y');
    s = s.replace(/\W+/gi, '');
    return s;
}

/**
 * @param {string} url url do youtube a ser validada.
 */
function isValidYoutubeUrl(url) {
    const expr = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    return url.match(expr);
}

/**
 * @param {elementHTML} input - campo a ser validado.
 * @param {string} maxSize - tamanho máximo do arquivo, em MB
 * @returns {boolean}
 */
function validateSize(input, maxSize) {
    if (!input || (input && !input.files.length)) { return false; }
    const fileSize = input.files[0].size / 1024 / 1024; // in MiB
    return fileSize > maxSize;
}

function isEmail(email) {
    const emailRegx = /^[a-zA-Z0-9][a-zA-Z0-9.+_-]+@([a-zA-Z0-9._-]+\.)[a-zA-Z-0-9]{2,3}$/;
    return emailRegx.test(email);
}

function formatDocument(value) {
    if (value) {
        const isCPF = value.length <= 11;

        if (isCPF) {
            value = value.padStart(11, "0"); // add zeros to the beggining of the string, if the value has less then 11 numbers
            value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"); // formats on CPF style
        } else {
            value = value.padStart(14, "0"); // add zeros to the beggining of the string, if the value has less then 14 numbers
            value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5"); // formats on CPNJ style
        }
    }

    return value;
}


function navigateToTab(tab, scrollToTop) {
    $(tab).trigger('click');
    if (scrollToTop) $("#wrapperContent").animate({ scrollTop: 0 }, 500, 'swing');
}
// Obj: $('#idElement')
function getRotationDegrees(obj) {
    let angle = 0;

    let matrix = obj.css("-webkit-transform") ||
        obj.css("-moz-transform") ||
        obj.css("-ms-transform") ||
        obj.css("-o-transform") ||
        obj.css("transform");

    if (matrix !== 'none' && matrix !== 'undefined') {
        let values = matrix.split('(')[1].split(')')[0].split(',');
        let a = values[0];
        let b = values[1];
        angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    }

    return (angle < 0) ? angle + 360 : angle;
}

function acceptJustNumbers(inputElement) {
    $(inputElement).on('keyup', function () {
        $(this).val($(this).val().replace(/[^0-9]/g, ''));
    });
}

// INPUT MASK MONEY OR PERCENT

function applyPercentMask(inputElement) {
    $(inputElement).maskMoney('destroy');
    $(inputElement).maskMoney({
        prefix: "",
        decimal: ",",
        thousands: ".",
        suffix: '%',
    });
    $(inputElement).maskMoney('mask');
}

function applyMoneyMask(inputElement) {
    $(inputElement).maskMoney('destroy');
    $(inputElement).maskMoney({
        prefix: 'R$ ',
        thousands: '.',
        decimal: ','
    });
    $(inputElement).maskMoney('mask');
}

function applyPercentOrMoneyMask(inputElement, isMoneyMask) {
    $(inputElement).maskMoney('destroy');

    if (isMoneyMask) {
        applyMoneyMask(inputElement);
    } else {
        applyPercentMask(inputElement);
    }
}

function maxPercentIfPercentMask(inputElement, commissionInputSwitch, maxValue) {
    $(inputElement).on('keyup', function () {
        if ($(`${commissionInputSwitch}:checked`).val() == 1 && $(this).maskMoney('unmasked')[0] > maxValue) {
            $(this).val(maxValue).maskMoney('mask');
        }
    });
}

function formatIdentificationNumber(inputId, inputLength) {
    $(inputId).unmask();

    if (inputLength <= 11) {
        $(inputId).mask("000.000.000-00");
    } else {
        $(inputId).mask("00.000.000/0000-00");
    }
}

// Máscara para o PIX de acordo com o tipo(key_enum)
function changeMaskPix(identificationNumberValue, phoneNumberValue, emailValue, keyEnumValue, inputPixId) {
    inputPixId.off('blur');
    inputPixId.attr('readonly', false);
    inputPixId.unmask();
    inputPixId.val('');
    switch (keyEnumValue) {
        case '1':
            inputPixId.val(identificationNumberValue);
            inputPixId.attr('readonly', false);
            formatIdentificationNumber('#pix', inputPixId.val().toString().length);
            break;
        case '2':
            inputPixId.val(phoneNumberValue);
            inputPixId.mask('(00) 0000-00000', { placeholder: '(00) 00000-0000' }, {
                onKeyPress: function (phoneNumber, e, field, options) {
                    let mask = (phoneNumber.length > 14) ? '(00) 00000-0000' : '(00) 0000-00000';
                    inputPixId.mask(mask, options);
                }
            });
            break;
        case '3':
            inputPixId.val(emailValue);
            inputPixId.on('blur', function () {
                validateEmail(inputPixId.val());
            });
            break;
        default:
            inputPixId.unmask();
    }
}

function validateEmail(pixValue) {
    if (pixValue === '') {
        toastr['error']('E-mail vazio');
    } else if (!isEmail(pixValue)) {
        toastr['error']('E-mail inválido');
    }
}


/**
 * @param {data} - Texto a ser copiado, em formmato de string
 * @param {element} - ID do elemento HTML sem '#'
 */
function copyToClipboard(data, element, message) {
    const el = document.createElement("textarea");
    el.value = data;
    document.getElementById(element).appendChild(el);
    el.select();
    document.execCommand("copy");
    document.getElementById(element).removeChild(el);

    if (message) {
        toastr['success'](message);
    }
}

/**
 * @param {videoUrl} - Url do vídeo, em formmato de string
 * @return {string} - Url do vídeo com o embed
 */
function getYoutubeEmbed(videoUrl) {
    try {
        if (!videoUrl) return;

        if (videoUrl.includes('https://youtu.be/')) {
            const videoId = videoUrl.split('https://youtu.be/')[1];
            return `https://www.youtube.com/embed/${videoId}`;
        }

        let video_id = videoUrl.split('v=')[1];
        const ampersandPosition = video_id.indexOf('&');
        if (ampersandPosition != -1) {
            video_id = video_id.substring(0, ampersandPosition);
        }

        return `https://www.youtube.com/embed/${video_id}`;
    } catch (e) {
        return videoUrl;
    }
}

function validateProductPlanName(inputSelector) {
    let input = $(inputSelector);
    let value = input.val().trim();

    input.removeClass('is-valid is-invalid');

    // Primeira verificação: caracteres de controle e espaços invisíveis
    let invalidCharacters = /[\x00-\x1F\x7F\xA0\u3164\u2800]/u;
    if (invalidCharacters.test(value)) {
        input.addClass('is-invalid');
        input.siblings('.invalid-feedback').text('O nome do Plano não pode conter caracteres invisíveis.');
        return;
    }

    // Segunda verificação: permite apenas os caracteres específicos
    let validSpecificCharacters = /^[\p{L}\p{N}\p{M}\p{Zs}\p{P}\p{So}\p{Sk}\p{Sm}\u200d\uFE0F+\-=\|$´]+$/u;
    if (!validSpecificCharacters.test(value)) {
        input.addClass('is-invalid');
        input.siblings('.invalid-feedback').text('O nome do Plano contém caracteres inválidos.');
        return;
    }

    // Terceira verificação: exige pelo menos 3 caracteres e ao menos um deles deve ser letra ou número
    let alphanumericPattern = /[A-Za-z0-9]/; // Verifica se há ao menos um alfanumérico
    let lengthPattern = /^.{3,}$/; // Verifica se tem pelo menos 3 caracteres

    // Se não tiver ao menos um caractere alfanumérico ou tiver menos de 3 caracteres, falha
    if (!alphanumericPattern.test(value)) {
        input.addClass('is-invalid');
        input.siblings('.invalid-feedback').text('O nome do Plano deve conter ao menos um caractere alfanumérico.');
        return;
    }
    if (!lengthPattern.test(value)) {
        input.addClass('is-invalid');
        input.siblings('.invalid-feedback').text('O nome do Plano deve conter pelo menos 3 caracteres.');
        return;
    }

    // Se passou em todas as validações
    input.addClass('is-valid');
}

function validateFormProductPlanName(value) {
    value = value.trim();
    // Primeira verificação: caracteres de controle e espaços invisíveis
    let invalidCharacters = /[\x00-\x1F\x7F\xA0\u3164\u2800]/u;
    if (invalidCharacters.test(value)) return false;

    // Segunda verificação: permite apenas caracteres válidos (letras, números, emojis e alguns símbolos)
    let validSpecificCharacters = /^[\p{L}\p{N}\p{M}\p{Zs}\p{P}\p{So}\p{Sk}\p{Sm}\u200d\uFE0F+\-=\|$´]+$/u;
    if (!validSpecificCharacters.test(value)) return false;

    // Terceira verificação: exige pelo menos 3 caracteres e ao menos um deles deve ser letra ou número
    let hasAlphanumeric = /[A-Za-z0-9]/.test(value); // Pelo menos um caractere alfanumérico
    let hasMinLength = value.length >= 3; // No mínimo 3 caracteres

    return hasAlphanumeric && hasMinLength;
}

/**
 * @param {Function} func
 * @param {number} wait
 * @returns {Function}
 */
function perfectDebounce(func, wait = 300) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

function setupPhoneInput({ inputSelector, hiddenSelector }) {
    const MAX_RETRIES = 3;
    let retryCount = 0;

    if (!window.intlTelInput) {
        if (retryCount >= MAX_RETRIES) {
            console.error("Failed to load intlTelInput plugin after maximum retries.");
            return;
        }
        // Se o plugin ainda não carregou, aguarda e tenta novamente
        setTimeout(() => setupPhoneInput({ inputSelector, hiddenSelector, retryCount: retryCount + 1 }), 100);
        return;
    }

    if (!window.intlTelInput) {
        // Se o plugin ainda não carregou, aguarda e tenta novamente
        setTimeout(() => setupPhoneInput({ inputSelector, hiddenSelector }), 100);
        return;
    }


    const inputEl = document.querySelector(inputSelector);
    const hiddenEl = document.querySelector(hiddenSelector);

    if (inputEl && inputEl.hasAttribute('data-phone-initialized')) {
        return;
    }

    // instancia o plugin
    const iti = window.intlTelInput(inputEl, {
        geoIpLookup: cb => {
            fetch('https://ipapi.co/json')
                .then(r => r.json())
                .then(d => cb(d.country_code))
                .catch(() => cb('br'));
        },
        initialCountry: 'auto',
        strictMode: true,
        separateDialCode: false,
        nationalMode: false,
        loadUtils: () =>
            import('https://cdn.jsdelivr.net/npm/intl-tel-input@25.3.1/build/js/utils.js')
    });

    // Tudo que depende de utils fica dentro do promess do plugin
    iti.promise.then(() => {

        // preenche +55 se o campo estiver vazio
        if (!inputEl.value.trim()) {
            inputEl.value = '+55 ';
        }


        if (inputEl.value.trim()) {
            let phone = inputEl.value.trim().replace(/\s+/g, '')
                .replace(/^\+55\+55/, '+55'); // evita +55+55
            iti.setNumber(phone);
            setPhone();
            if (iti.isValidNumber()) formatVisualPhone();
        }

        const debouncedFormatVisualPhone = perfectDebounce(formatVisualPhone, 300);

        inputEl.addEventListener('change', () => {
            setPhone();
            debouncedFormatVisualPhone();
        });

        inputEl.addEventListener('input', setPhone);

        inputEl.addEventListener('blur', () => {
            validate();
            debouncedFormatVisualPhone();
        });

        inputEl.addEventListener('countrychange', () => {
            const dialCode = iti.getSelectedCountryData()?.dialCode;
            if (!dialCode) return;
            const dial = '+' +  dialCode;
            const current = inputEl.value.trim();
            //se já existe um número, troca só o velho DDI pelo novo
            // se o campo estiver vazio, preenche só com o DDI
            inputEl.value = current ? current.replace(/^\+\d+/, dial) : dial + ' ';

            setPhone();
            validate();
        });
    });

    function setPhone() {
        if (!window.intlTelInput?.utils) return;
        const fullNumber = iti.getNumber(window.intlTelInput.utils.numberFormat.INTERNATIONAL);
        if (fullNumber) {
            hiddenEl.value = fullNumber;
        }
    }

    function formatVisualPhone() {
        if (!window.intlTelInput?.utils) return;
        if (iti.isValidNumber()) {
            try {
                // Sempre exibe o número no formato internacional
                const internationalNumber = iti.getNumber(window.intlTelInput.utils.numberFormat.INTERNATIONAL);
                if (internationalNumber && inputEl.value !== internationalNumber) {
                    inputEl.value = internationalNumber;
                }
            } catch (e) { }
        }
    }

    function validate() {
        const group = inputEl.closest('.form-group');
        const invalidFeedback = group?.querySelector('.invalid-feedback');

        if (!iti.isValidNumber()) {
            inputEl.classList.add('is-invalid');
            if (invalidFeedback) {
                invalidFeedback.textContent = 'Número de telefone inválido. Por favor, verifique o número digitado.';
                invalidFeedback.style.display = 'block';
            }
        } else {
            inputEl.classList.remove('is-invalid');
            inputEl.classList.add('is-valid');
            setPhone();
            if (invalidFeedback) invalidFeedback.style.display = 'none';
        }
    }

    return iti;
}

/**
 * Recupera o valor de um parâmetro de uma URL.
 *
 * @param {string} name - Nome do parâmetro a ser recuperado.
 * @param {string} url - URL da qual o parâmetro será extraído.
 * @return {string|null} Valor do parâmetro ou null se não encontrado.
 */
function getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

/**
 * Verifica se um valor é vazio.
 * Considera vazio: null, undefined, '', ou strings contendo apenas espaços.
 *
 * @param {any} value
 * @returns {boolean}
 */
function isEmpty(value) {
    return value === null
        || value === undefined
        || (typeof value === 'string' && value.trim() === '');
}

class InputNumberHandler {
    constructor(selector) {
        this.fields = document.querySelectorAll(selector);
        this.init();
    }
    init() {
        this.fields.forEach(field => {
            field.addEventListener('input', this.handleInput);
        });
    }

    handleInput(event) {
        const value = event.target.value;
        event.target.value = value.replace(/\D/g, ''); // Remove caracteres não numéricos
    }
}

// Inicializa a classe para os campos com o ID ou classe desejada
new InputNumberHandler('input[type="number"]');
