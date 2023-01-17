// Variavbles que si pueden cambiar
let word = 'word';
let wordSecret = word.split('');
let id = 0;
let caracter = [];
let fallos = 0;
let letter = '';

// Variables que no van a cambiar
let idLits = ["uno", "dos", "tres", "cuatro", "cinco", "seis"];
const formSubmit = document.querySelector('.inputs');
const intento = document.querySelector('.intento');
const btnIntento = document.querySelector('.btn-intento');
const palabraOculta = document.getElementById('palabra-oculta');

// Poner los _ en la palabra, y mostrarlo en el html
for (i in wordSecret) {
    caracter.push('_');
};
palabraOculta.innerHTML = `<span>${caracter.join('')}</span>`;

// Funciones
const añadirFragmento = ( titulo, textBtn, texto, input = false ) => {
    const fragment = document.createDocumentFragment();
    let element = crearNuevaPalabra(titulo, textBtn, texto, input);
    fragment.appendChild(element);
    document.querySelector('.modal').appendChild(fragment);
};

const ponerPalabra = letter => {
    let indexLetter = wordSecret.indexOf(letter);
    caracter.splice(indexLetter, 1, letter);
    wordSecret.splice(indexLetter, 1, '_');
};

const crearNuevaPalabra = ( titulo, textBtn, texto, input ) => {
    return crearModal( titulo, textBtn, texto, input );
};

const crearModal = ( titulo, textBtn, texto, input = false ) => {
    const container = document.createElement('DIV');
    const title = document.createElement('H1');
    const text = document.createElement('P');
    const options = document.createElement('DIV');
    const btnOK = document.createElement('BUTTON');
    
    container.classList.add('container-modal');
    title.classList.add('title-modal');
    text.classList.add('text-modal');
    options.classList.add('options-modal')
    btnOK.classList.add('btn-options-ok');

    title.textContent = titulo;
    text.textContent = texto;
    btnOK.textContent = textBtn;
    
    options.appendChild(btnOK);
    
    container.appendChild(title);
    container.appendChild(text);
    container.appendChild(options);
    
    if (input) {
        const new_Word = document.createElement('INPUT');
        new_Word.classList.add('input-modal');
        new_Word.setAttribute('type', 'text');
        new_Word.setAttribute('maxlength', '12');
        options.appendChild(new_Word);
        new_Word.required = 'true';

        new_Word.addEventListener('change', e => {
            word = e.target.value.toLowerCase();
        });
        
        btnOK.addEventListener('click', () => {
            word = word;
            word = word.toLowerCase();
            wordSecret = word.split('');
            caracter = [];
            for (i in wordSecret) {
                caracter.push('_');
            }
            id = 0;
            fallos = 0;
            letter = '';
            palabraOculta.innerHTML = `<span>${caracter.join('')}</span>`;
            intento.classList.remove('ocultar');
            intento.classList.add('intento');
            btnIntento.classList.remove('ocultar');
            btnIntento.classList.add('btn-intento');
            document.querySelector('.modal').removeChild(container);
        });

        const partesDelAhorcado = document.querySelector('.ahorcado').querySelectorAll(`.parteDelAhorcado`);
        partesDelAhorcado.forEach(element => {
            element.classList.add('ocultar')
            element.classList.remove('mostrar')
        });

        if (document.querySelector('.pista')) {
            document.querySelector('.pista').remove()
        };
    } else {
        btnOK.addEventListener('click', () => {
            document.querySelector('.modal').removeChild(container);
            añadirFragmento('Crea una nueva palabra', 'Jugar', `Escribe una plabra con un tamaño no mayor a 12:`, true);
        });
    };

    return container;
};

// Eventos
formSubmit.addEventListener('submit', e => {
    e.preventDefault();
    if (wordSecret.includes(letter)) {
        while (wordSecret.includes(letter)) {
            ponerPalabra(letter);
        };
        palabraOculta.innerHTML = `<span>${caracter.join('')}</span>`;
    } else if (caracter.includes(letter)) {
        añadirFragmento('Aviso', '', `Ya haz ingresado esa letra, intenta con otra.`);
        setTimeout(()=>{
            document.querySelector('.modal').removeChild(document.querySelector('.container-modal'));
        }, 2500);
    } else {
        const parteDelAhorcado = document.querySelector(`#${idLits[id]}`);
        parteDelAhorcado.classList.add('mostrar');
        parteDelAhorcado.classList.remove('ocultar');
        id += 1;
        fallos += 1;
    };
    
    if (fallos == 6) {
        intento.classList.remove('intento');
        intento.classList.add('ocultar');
        btnIntento.classList.remove('btn-intento');
        btnIntento.classList.add('ocultar');
        añadirFragmento('Haz perdido', 'Volver a jugar', `Da click en volver a jugar si quieres volver a jugar`);
    };
    
    if (caracter.includes('_') == false) {
        intento.classList.remove('intento');
        intento.classList.add('ocultar');
        btnIntento.classList.remove('btn-intento');
        btnIntento.classList.add('ocultar');
        añadirFragmento('Haz ganado', 'Volver a jugar', `Correto la palabra era "${word.toUpperCase()}", da click en volver a jugar si quieres volver a jugar`);
    };
});

intento.addEventListener('change', e => {
    letter = e.target.value.toLowerCase();
});