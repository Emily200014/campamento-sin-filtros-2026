/*==================================================
    CAMPAMENTO SIN FILTROS
    SCRIPT.JS
===================================================*/


/*==================================================
    LÍNEAS DIGITALES
===================================================*/

const linesContainer =
    document.getElementById("digitalLines");

const colors = [
    "#C9F80A",
    "#00B7FF",
    "#43D854"
];

if(linesContainer){

    for(let i = 0; i < 180; i++){

        const line =
            document.createElement("div");

        line.className =
            "digital-line";

        const color =
            colors[
                Math.floor(
                    Math.random() *
                    colors.length
                )
            ];

        line.style.background =
            `linear-gradient(
                90deg,
                transparent,
                ${color},
                transparent
            )`;

        line.style.boxShadow =
            `0 0 8px ${color}`;

        line.style.top =
            Math.random() * 100 + "%";

        line.style.width =
            (50 + Math.random() * 250) + "px";

        line.style.height =
            (1 + Math.random() * 2) + "px";

        line.style.animationDuration =
            (2 + Math.random() * 5) + "s";

        line.style.animationDelay =
            (Math.random() * 5) + "s";

        line.style.opacity =
            (.15 + Math.random() * .35);

        linesContainer.appendChild(line);

    }

}



/*==================================================
    REDES SOCIALES
===================================================*/

const socialBackground =
    document.getElementById("socialBackground");

const socialIcons = [

    "fa-instagram",
    "fa-facebook-f",
    "fa-tiktok",
    "fa-youtube"

];

if(socialBackground){

    for(let i = 0; i < 20; i++){

        const icon =
            document.createElement("i");

        const randomIcon =
            socialIcons[
                Math.floor(
                    Math.random() *
                    socialIcons.length
                )
            ];

        icon.className =
            `fa-brands ${randomIcon} floating-social`;

        icon.style.left =
            Math.random() * 92 + "%";

        icon.style.top =
            Math.random() * 88 + "%";

        icon.style.fontSize =
            (18 + Math.random() * 35) + "px";

        icon.style.opacity =
            (.025 + Math.random() * .06);

        icon.style.animationDuration =
            (18 + Math.random() * 20) + "s";

        icon.style.animationDelay =
            (-Math.random() * 20) + "s";

        socialBackground.appendChild(icon);

    }

}



/*==================================================
    ELEMENTOS
===================================================*/

const btn =
    document.getElementById("btnReveal");

const flash =
    document.getElementById("flash");

const screen1 =
    document.getElementById("screen1");

const signalScreen =
    document.getElementById("signalScreen");

const screen2 =
    document.getElementById("screen2");

const screen3 =
    document.getElementById("screen3");

const loading =
    document.getElementById("loading");

const progress =
    document.getElementById("progress");

const loadingText =
    document.getElementById("loadingText");

const title =
    document.getElementById("title");

const flyer =
    document.querySelector(".flyer");

const flyerImage =
    document.querySelector(".flyer-img");



/*==================================================
    SONIDOS
===================================================*/

const soundAmbient =
    document.getElementById("soundAmbient");

const soundClick =
    document.getElementById("soundClick");

const soundLoading =
    document.getElementById("soundLoading");

const soundStatic =
    document.getElementById("soundStatic");

const soundReveal =
    document.getElementById("soundReveal");



/*==================================================
    CONTROL DE SONIDOS
===================================================*/

function restartSound(sound){

    if(!sound){

        return;

    }

    sound.currentTime =
        0;

    const playPromise =
        sound.play();

    if(playPromise !== undefined){

        playPromise.catch(

            error => {

                console.log(
                    "No se pudo reproducir el sonido:",
                    error
                );

            }

        );

    }

}


function stopSound(sound){

    if(!sound){

        return;

    }

    sound.pause();

    sound.currentTime =
        0;

}



/*==================================================
    AUDIO AMBIENTE
===================================================*/

let ambientStarted =
    false;


function startAmbient(){

    if(

        ambientStarted ||

        !soundAmbient

    ){

        return;

    }

    soundAmbient.loop =
        true;

    soundAmbient.volume =
        0.35;

    const playPromise =
        soundAmbient.play();

    if(playPromise !== undefined){

        playPromise

            .then(

                () => {

                    ambientStarted =
                        true;

                    removeAmbientListeners();

                }

            )

            .catch(

                error => {

                    console.log(
                        "El navegador bloqueó el audio:",
                        error
                    );

                }

            );

    }

}


function removeAmbientListeners(){

    document.removeEventListener(
        "click",
        startAmbient
    );

    document.removeEventListener(
        "touchstart",
        startAmbient
    );

    document.removeEventListener(
        "pointerdown",
        startAmbient
    );

    document.removeEventListener(
        "keydown",
        startAmbient
    );

}


document.addEventListener(
    "click",
    startAmbient
);

document.addEventListener(
    "touchstart",
    startAmbient,
    { passive:true }
);

document.addEventListener(
    "pointerdown",
    startAmbient
);

document.addEventListener(
    "keydown",
    startAmbient
);



/*==================================================
    MATRIX
===================================================*/

const canvas =
    document.getElementById("matrix");

const ctx =
    canvas
        ? canvas.getContext("2d")
        : null;

let matrixAnimation =
    null;

const letters =
    "01ABCDEFGHIJKLMNOPQRSTUVWXYZ#$%&";

const fontSize =
    16;

let columns =
    0;

let drops =
    [];


function resizeMatrix(){

    if(!canvas){

        return;

    }

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

    columns =
        Math.floor(
            canvas.width /
            fontSize
        );

    drops =
        [];

    for(

        let i = 0;

        i < columns;

        i++

    ){

        drops[i] =
            Math.random() * -20;

    }

}


function drawMatrix(){

    if(

        !canvas ||

        !ctx

    ){

        return;

    }

    ctx.fillStyle =
        "rgba(0,0,0,.08)";

    ctx.fillRect(

        0,
        0,
        canvas.width,
        canvas.height

    );

    ctx.fillStyle =
        "#00ff99";

    ctx.font =
        fontSize +
        "px monospace";

    for(

        let i = 0;

        i < drops.length;

        i++

    ){

        const text =
            letters[

                Math.floor(

                    Math.random() *
                    letters.length

                )

            ];

        ctx.fillText(

            text,

            i *
            fontSize,

            drops[i] *
            fontSize

        );

        if(

            drops[i] *
            fontSize >

            canvas.height &&

            Math.random() >

            .975

        ){

            drops[i] =
                0;

        }

        drops[i]++;

    }

}


resizeMatrix();


window.addEventListener(

    "resize",

    resizeMatrix

);



/*==================================================
    GLITCH DEL TÍTULO
===================================================*/

if(title){

    setInterval(

        () => {

            title.style.transform =

                `translate(

                    ${Math.random() * 4 - 2}px,

                    ${Math.random() * 4 - 2}px

                )`;

            setTimeout(

                () => {

                    title.style.transform =
                        "";

                },

                80

            );

        },

        500

    );

}



/*==================================================
    GLITCH DEL FLYER
===================================================*/

if(

    flyer &&

    flyerImage

){

    setInterval(

        () => {

            if(

                !screen2 ||

                !screen2.classList.contains(
                    "active"
                )

            ){

                return;

            }

            flyer.classList.add(
                "glitch"
            );

            flyerImage.classList.add(
                "glitch"
            );

            setTimeout(

                () => {

                    flyer.classList.remove(
                        "glitch"
                    );

                    flyerImage.classList.remove(
                        "glitch"
                    );

                },

                120

            );

        },

        1800

    );

}



/*==================================================
    SECUENCIA PRINCIPAL
===================================================*/

if(btn){

    btn.addEventListener(

        "click",

        () => {


            /*=========================
                EVITAR DOBLE CLIC
            =========================*/

            btn.disabled =
                true;



            /*=========================
                INICIAR AUDIO AMBIENTE
            =========================*/

            startAmbient();



            /*=========================
                SONIDO DEL BOTÓN
            =========================*/

            restartSound(
                soundClick
            );



            /*=========================
                REINICIAR CARGA
            =========================*/

            if(progress){

                progress.style.width =
                    "0%";

            }

            if(loadingText){

                loadingText.textContent =
                    "Conectando...";

            }

            if(loading){

                loading.classList.add(
                    "active"
                );

            }



            /*=========================
                SONIDO DE CARGA
            =========================*/

            if(soundLoading){

                soundLoading.loop =
                    true;

                restartSound(
                    soundLoading
                );

            }



            /*=========================
                MATRIX
            =========================*/

            if(canvas){

                matrixAnimation =
                    setInterval(

                        drawMatrix,

                        35

                    );

            }



            let porcentaje =
                0;

            let indice =
                0;


            const mensajes = [

                "Conectando...",

                "Accediendo al sistema...",

                "Buscando filtros...",

                "Eliminando máscaras...",

                "Descifrando identidad...",

                "Acceso concedido..."

            ];



            /*=========================
                BARRA DE CARGA
            =========================*/

            const carga =
                setInterval(

                    () => {

                        porcentaje +=
                            2;


                        if(progress){

                            progress.style.width =
                                porcentaje + "%";

                        }


                        if(

                            porcentaje % 20 ===
                            0

                        ){

                            if(loadingText){

                                loadingText.textContent =
                                    mensajes[indice];

                            }

                            indice++;

                            if(

                                indice >=
                                mensajes.length

                            ){

                                indice =
                                    mensajes.length - 1;

                            }

                        }



                        /*=========================
                            FIN DE CARGA
                        =========================*/

                        if(

                            porcentaje >=
                            100

                        ){

                            clearInterval(
                                carga
                            );



                            if(matrixAnimation){

                                clearInterval(
                                    matrixAnimation
                                );

                                matrixAnimation =
                                    null;

                            }



                            /*=========================
                                DETENER CARGA
                            =========================*/

                            stopSound(
                                soundLoading
                            );



                            /*=========================
                                OCULTAR LOADING
                            =========================*/

                            if(loading){

                                loading.classList.remove(
                                    "active"
                                );

                            }



                            /*=========================
                                OCULTAR INICIO
                            =========================*/

                            if(screen1){

                                screen1.classList.remove(
                                    "active"
                                );

                            }



                            /*=========================
                                MOSTRAR INTERFERENCIA
                            =========================*/

                            if(signalScreen){

                                signalScreen.classList.add(
                                    "active"
                                );

                            }



                            /*=========================
                                SONIDO DE ESTÁTICA
                            =========================*/

                            if(soundStatic){

                                soundStatic.loop =
                                    true;

                                restartSound(
                                    soundStatic
                                );

                            }



                            /*=========================
                                DURACIÓN DE INTERFERENCIA
                            =========================*/

                            setTimeout(

                                () => {


                                    /*=========================
                                        DETENER ESTÁTICA
                                    =========================*/

                                    stopSound(
                                        soundStatic
                                    );



                                    /*=========================
                                        OCULTAR INTERFERENCIA
                                    =========================*/

                                    if(signalScreen){

                                        signalScreen.classList.remove(
                                            "active"
                                        );

                                    }



                                    /*=========================
                                        MOSTRAR FLYER
                                    =========================*/

                                    if(screen2){

                                        screen2.classList.add(
                                            "active"
                                        );

                                    }



                                    /*=========================
                                        SONIDO REVEAL
                                    =========================*/

                                    restartSound(
                                        soundReveal
                                    );



                                    /*=========================
                                        FLASH
                                    =========================*/

                                    if(flash){

                                        flash.style.opacity =
                                            "1";

                                        setTimeout(

                                            () => {

                                                flash.style.opacity =
                                                    "0";

                                            },

                                            120

                                        );

                                    }



                                    /*=========================
                                        FLYER DURANTE 7 SEGUNDOS
                                    =========================*/

                                    setTimeout(

                                        () => {


                                            if(screen2){

                                                screen2.classList.remove(
                                                    "active"
                                                );

                                            }


                                            if(screen3){

                                                screen3.classList.add(
                                                    "active"
                                                );

                                            }

                                        },

                                        7000

                                    );


                                },

                                2500

                            );

                        }

                    },

                    55

                );

        }

    );

} 