//VARIABLES

// posicion inicial en el css
const POSICION_INICIAL = 30;

//variable que localiza la imagen del coche
//moveremos el coche con las flechas
const cocheimagen = document.getElementById("coche-jugable");
cocheimagen.style.transform = `translate(0px, ${POSICION_INICIAL}px)`;

//variables posicion del coche
let posicion_coche_x = 0;
let posicion_coche_y = POSICION_INICIAL;

const rango_carretera = {
    izquierda: -150,
    derecha: 150
};

//control si es un ganador
let ganador = false;

//necesario para realizar cierto movimiento en diagonal
let pulsadoAcelerar = false;
let pulsadoFrenar = false;

//variables para controlar si hemos llegado a las metas
let alcanzadameta1 = false;
let alcanzadameta2 = false;
let alcanzadameta3 = false;
let alcanzadameta4 = false;

//nombre de las flechas y espacio
//para cambiar solo tendremos que cambiar desde aqui
const eventoskeys =
{
    Frenar: [ "arrowup", "w" ],
    Acelerar: ["arrowdown", "s"],
    Izquierda: ["arrowleft", "a"],
    Derecha: ["arrowright", "d"],
    Claxon: " "
}

//variables con las posiciones donde tenemos que mostrar las metas
//al alcanzar lso distintos puntos mostramos la meta
const POSICION_META_1 = 80;
const POSICION_META_2 = 1900;
const POSICION_META_3 = 3000;
const POSICION_META_4 = 4000;
const POSICION_META_FINAL = 4800;


//posicion para que aparezcan las estrellas
const POSICION_ESTRELLA_META_1 = 2430;
const POSICION_ESTRELLA_META_2 = 3680;
const POSICION_ESTRELLA_META_3 = 4750;



//leyenda
const leyenda_acelerar = document.getElementById("leyenda-acelerar");
const leyenda_frenar = document.getElementById("leyenda-frenar");
const leyenda_izquierda = document.getElementById("leyenda-izquierda");
const leyenda_derecha = document.getElementById("leyenda-derecha");
const leyenda_claxon = document.getElementById("leyenda-claxon");

//metas que iran apareciendo
const meta_uno = document.getElementById("meta-uno");
const meta_dos = document.getElementById("meta-dos");
const meta_tres = document.getElementById("meta-tres");
const metafinal = document.getElementById("meta-final");

//imagen del ganador
//no se muestra hasta que haya llegado hasta el final
const letrero_ganador = document.getElementById("ganador");

//estrellas 
const estrella_uno = document.getElementById("estrella-uno");
const estrella_dos = document.getElementById("estrella-dos");
const estrella_tres = document.getElementById("estrella-tres");

//sonido claxon
const claxon_sonido = document.getElementById("claxon");

//checkbox de autoscroll
const autoscroll_onoff = document.getElementById("check-autoscroll");

//funcion que es llamada cuando hemos terminado la carrera
//pasa toda  la leyenda a color negro
const apagar_motores = () => 
{
    descolorizar_leyanda(leyenda_acelerar);
    descolorizar_leyanda(leyenda_frenar);
    descolorizar_leyanda(leyenda_izquierda);
    descolorizar_leyanda(leyenda_derecha);
    descolorizar_leyanda(leyenda_claxon);

};


//colorizamos la leyenda
const colorizar_leyenda = (elemento) =>
{

    if (elemento.classList[1] === "leyenda-texto-desactivado") 
    {
        elemento.classList.remove("leyenda-texto-desactivado");
        elemento.classList.add("leyenda-texto-activado");
    }
};

//al levantar la tecla descolorizamos la leyenda
const descolorizar_leyanda = (elemento) => {

    if (elemento.classList[1] === "leyenda-texto-activado") 
    {
        elemento.classList.remove("leyenda-texto-activado");
        elemento.classList.add("leyenda-texto-desactivado");
    }
};


//le añadimos a la clase ver que tiene un display:block
const ver_elemento = (elemento_a_ver) => 
{
    elemento_a_ver.classList.add("ver");
};



//funcion donde controla la pulssacion del espacio
const Claxon = (elemento) => 
{
    //colorizamos la leyenda cuando se ha pulsado
    colorizar_leyenda(elemento);

    claxon_sonido.currentTime = 0;
    claxon_sonido.play();

};



//funcion donde controla el movimiento hacia atras del coche
const Frenar = (elemento) => 
{


    //colorizamos la leyenda cuando se ha pulsado
    colorizar_leyenda(elemento);

    //que se salga el coche por arriba
    if (posicion_coche_y <= POSICION_INICIAL)
    {
        return;
    }
    // movimiento del coche
    posicion_coche_y -= 10;
    cocheimagen.style.transform = `translate(${posicion_coche_x}px, ${posicion_coche_y}px)`;

};



//funcion donde controla movimiento hacia abajo del coche
const Acelerar = (elemento) => 
{

    //colorizamos la leyenda cuando se ha pulsado
    colorizar_leyenda(elemento);
    
    // movimiento del coche
    posicion_coche_y += 10;

};

//funcion donde controla movimiento hacia izquierda del coche
const Izquierda = (elemento) => 
{

    //controlamos los limites de la carretera
    if (posicion_coche_x <= rango_carretera.izquierda)
    {
        return;
    }
    
    //colorizamos la leyenda cuando se ha pulsado
    colorizar_leyenda(elemento);

    if (pulsadoAcelerar === true)
    {
        posicion_coche_y += 10;

    }
    
    if (pulsadoFrenar === true)
    {
        posicion_coche_y -= 10;
    }

    // movimiento del coche
    posicion_coche_x -= 10;
    

};


//movimiento hacia la derecha del coche
const Derecha = (elemento) => 
{

    //limite del coche
    if (posicion_coche_x >= rango_carretera.derecha) 
    {
        //todo: 
        return;
    }

    //colorizamos la leyenda cuando se ha pulsado
    colorizar_leyenda(elemento);


    if (pulsadoAcelerar === true) 
    {
        posicion_coche_y += 10;
    }

    if (pulsadoFrenar === true)
    {
        posicion_coche_y -= 10;
    }

    

    // movimiento del coche
    posicion_coche_x += 10;
    


};


//funcion donde comprueba la posicion_y
//recibe como parametro una posicion en Y (scrollY/posicion_coche_y)
//se llama desde keydown y evento scroll
const comprobar_posiciones_coche = (posicion_y) => 
{
    //el coche va llegando a las distintas posiciones para mostrar las metas
    if (posicion_y >= POSICION_META_4 && alcanzadameta4 === false) 
    {
        alcanzadameta4 = true;
        ver_elemento(metafinal);
    }
    else if (posicion_y >= POSICION_META_3 && alcanzadameta3 === false) 
    {
        alcanzadameta3 = true;
        ver_elemento(meta_tres);
    }
    else if (posicion_y >= POSICION_META_2 && alcanzadameta2 === false) 
    {
        alcanzadameta2 = true;
        ver_elemento(meta_dos);

    }
    else if (posicion_y >= POSICION_META_1 && alcanzadameta1 === false) 
    {
        alcanzadameta1 = true;
        ver_elemento(meta_uno);
    }


};

const ver_estrella = (estrella) => 
{

    estrella.attributes[2].nodeValue = "./images/estrella.svg";

};

//funcion donde comprueba la posicion_y
//recibe como parametro una posicion en Y (scrollY/posicion_coche_y)
//se llama desde keydown y evento scroll
const comprobar_posiciones_coche_para_estrellas = (posicion_y) => 
{
    //el coche va llegando a las distintas posiciones para mostrar las metas
    if (posicion_y >= POSICION_ESTRELLA_META_3) 
    {
        ver_estrella(estrella_tres);
    }
    else if (posicion_y >= POSICION_ESTRELLA_META_2) 
    {
        ver_estrella(estrella_dos);
    }
    else if (posicion_y >= POSICION_ESTRELLA_META_1)
    {
        ver_estrella(estrella_uno);
    }


    

};


/////////////////
/////////////////////
//// EVENTOS
///////////


//para hacerlo mas realista pulsar abajo y izquierda/derecha, vaya un minimo en diagonal
//comprobamos que al soltar
document.addEventListener("keyup", (evento) => 
{
    evento.preventDefault();

    // si hay un ganador no nos interesa seguir
    if (ganador === true) return;

    //pasamos a minisculas la tecla que nos a ha pasado
    //controlamos la tecla alterna y las flechas
    switch (evento.key.toLowerCase()) 
    {

        case eventoskeys.Frenar[0]: //arrowup
        case eventoskeys.Frenar[1]: //w
            descolorizar_leyanda(leyenda_frenar);
            pulsadoFrenar = false;
        break;

        case eventoskeys.Acelerar[0]: //arrowdown
        case eventoskeys.Acelerar[1]: //s
            descolorizar_leyanda(leyenda_acelerar);
            pulsadoAcelerar = false;
        break;

        case eventoskeys.Izquierda[0]: //arrowleft
        case eventoskeys.Izquierda[1]:  //a
            descolorizar_leyanda(leyenda_izquierda);
        break;

        case eventoskeys.Derecha[0]: //arrowright
        case eventoskeys.Derecha[1]: //d
            descolorizar_leyanda(leyenda_derecha);
        break;

        case eventoskeys.Claxon: //espacio
            descolorizar_leyanda(leyenda_claxon);
        break;

        //si se sale de lo establecido, simplemente salimos
        default:

        return;


    }


});




//evento donde controlamos pulsar cualquier tecla
//dentro contolamos las teclas que queremos
document.addEventListener("keydown", (evento) => 
{
    evento.preventDefault();

    //si hay un ganador, ya no es necesario avanzar mas
    if (ganador === true) return;

    //hemos llegado a la meta final y mostramos un pequeño rotulo
    if (posicion_coche_y >= POSICION_META_FINAL) 
    {
        ganador = true;

        //toda la leyenda a color negro
        apagar_motores();

        //mostrar letrero ganador
        ver_elemento(letrero_ganador);

        //apagamos motores
        console.log("eres el ganador");
        return;

    }

    //
    comprobar_posiciones_coche(posicion_coche_y);
    
    //mostramos las estrellas de la zona de la leyenda
    comprobar_posiciones_coche_para_estrellas(posicion_coche_y);

    
    // console.log("evento=" + evento.code + " "  + evento.key);

    //pasamos a minisculas la tecla que nos a ha pasado
    //controlamos la tecla alterna y las flechas
    switch (evento.key.toLowerCase()) 
    {

        case eventoskeys.Frenar[0]: //arrowup
        case eventoskeys.Frenar[1]: //w
            pulsadoFrenar = true;
            Frenar(leyenda_frenar);
        break;

        case eventoskeys.Acelerar[0]: //arrowdown
        case eventoskeys.Acelerar[1]: //s
            pulsadoAcelerar = true;
            Acelerar(leyenda_acelerar);
        break;

        case eventoskeys.Izquierda[0]: //arrowleft
        case eventoskeys.Izquierda[1]: //a
            Izquierda(leyenda_izquierda);
        break;

        case eventoskeys.Derecha[0]: //arrowright
        case eventoskeys.Derecha[1]: //d
            Derecha(leyenda_derecha);
        break;

        case eventoskeys.Claxon: //espacio
            //evitamos que se pulse continuamente
            if (evento.repeat === false)
            {
                Claxon(leyenda_claxon);
            }
        break;

        // si se sale de lo establecido simplemente no continuamos
        default:

        return;


    }

    //mostramos la posicion del coche
    cocheimagen.style.transform = `translate(${posicion_coche_x}px, ${posicion_coche_y}px)`;


    //en caso de que el autoscroll este activado
    if (autoscroll_onoff.checked === true) 
    {
        //auto scroll donde esta el coche
        window.scrollTo({
            top: posicion_coche_y - POSICION_INICIAL * 2,
            left: posicion_coche_x,
        });

    }



    // seguimos al coche cuando acelera, scroll automatico

});


//mostramos las metas al desplazar el scroll
//tambien se muestran las metas cuando el coche se desplaza
window.addEventListener("scroll", () => 
{
    comprobar_posiciones_coche(scrollY);
});



//funcion que en caso que detecte un click sobre el label o sobre
//el input, desplaza el scroll hasta el coche
autoscroll_onoff.addEventListener("click", ()=>
{
    window.scrollTo({
        top: posicion_coche_y - POSICION_INICIAL * 2,
        left: posicion_coche_x,
    });

});



//atrasamos un poco el scroll inicial sobre el coche
window.scrollTo({
    top: posicion_coche_y - POSICION_INICIAL * 2,
    left: posicion_coche_x
});

