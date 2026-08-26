// Actualizar la apariencia del botón flotante
function updateMusicButtonUI(active) {
    const btn = document.getElementById('music-control-btn');
    const btnText = document.getElementById('music-text');
    if (btn && btnText) {
        if (active) {
            btn.classList.remove('paused');
            btnText.innerText = 'Música Sonando';
        } else {
            btn.classList.add('paused');
            btnText.innerText = 'Pausada';
        }
    }
}

// Función para iniciar la experiencia y activar el audio de inmediato al dar clic
function startExperience() {
    const audio = document.getElementById('bg-music');
    
    // Iniciar audio inmediatamente con la interacción directa del clic
    if (audio) {
        audio.play().then(() => {
            updateMusicButtonUI(true);
        }).catch(err => {
            console.log("Error al reproducir audio:", err);
        });
    }

    const welcomeScreen = document.getElementById('welcome-screen');
    if (welcomeScreen) {
        welcomeScreen.style.transition = 'opacity 0.8s ease';
        welcomeScreen.style.opacity = '0';
    }

    setTimeout(() => {
        if (welcomeScreen) welcomeScreen.style.display = 'none';

        // Ventana flotante de bienvenida con SweetAlert2 (Modo Oscuro)
        Swal.fire({
            title: 'Antes de comenzar...',
            text: 'Quiero decirte que sigues siendo la persona más especial en mi vida',
            iconHtml: '💞',
            customClass: {
                icon: 'no-border-icon'
            },
            confirmButtonText: 'Abrir mi corazón 💜',
            confirmButtonColor: '#7209b7',
            background: '#251229',
            color: '#f2e9f4'
        });
    }, 800);
}

// Control manual del botón flotante de música (Pausar / Reanudar)
function toggleMusic() {
    const audio = document.getElementById('bg-music');
    if (!audio) return;

    if (audio.paused) {
        audio.play().then(() => {
            updateMusicButtonUI(true);
        }).catch(error => {
            console.error("Error al reproducir:", error);
            alert("Verifica que el archivo assets/cancion.mp3 esté bien nombrado.");
        });
    } else {
        audio.pause();
        updateMusicButtonUI(false);
    }
}

// Contenido personalizado de los 6 sobres
const envelopeMessages = {
    sad: {
        title: "Cuando me extrañes mucho 🌧️",
        text: "Sabes, a mí también me pasa. A veces estoy sentado en mi escritorio y me pongo a pensar en cuánto quisiera tenerte cerca, en que si vivieras aquí podría ir a verte y darte un gran abrazo. Pero aunque eso no sea así, sé que algún día podré ir a verte en persona y que cuando eso pase no voy a soltarte jamás. Por ahora escríbeme, a mí también me gustará mucho recibir tu mensaje.",
        color: "#7209b7"
    },
    sleep: {
        title: "Cuando no puedas dormir 🌙",
        text: "¡Otra vez viendo el celular hasta tarde, bebé! Nono, muy mal, jsjsjs... es broma mi bebita linda. Vamos, ¿durmamos juntos ahora sí? Yo te cantaré una nana suavecita y me quedaré contigo hasta la mañana, ¿sí? Ahora recuesta tu linda cabecita en la almohada y vamos a soñar juntos.",
        color: "#4a2750"
    },
    happy: {
        title: "Cuando tengas un mal día ✨",
        text: "¿Quién molestó a mi bebé? ¿A quién le pego? Vamos mi amor, no te preocupes por lo que pudo haber pasado. Yo siempre estaré orgulloso de ti; en cada momento de tu vida para mí tú estarás brillando, así que levantemos esa cabecita y sigamos viendo hacia adelante, ¿sí? Miremos hacia un futuro en el que podamos pasar el día juntos y reírnos en el sofá.",
        color: "#ff4d6d"
    },
    sick: {
        title: "Cuando te sientas mal 🩹",
        text: "Ven, dame un abrazo. No importa qué sea lo que te esté afectando, seguro si te doy 8,273,489,347 besos logro curarte. Así que tranquila corazón, toma algo calientito y descansa; pronto pasará y cuando lo haga podremos jugar mucho juntos, lo prometo.",
        color: "#b5179e"
    },
    future: {
        title: "Cuando tengas miedo del futuro 🪐",
        text: "Te voy a contar un secreto bebé: yo también me siento aterrado del futuro, ya que es algo nuevo y puede que no sea como imagino. ¿Pero sabes? Me siento feliz de que llegue, porque sé que mientras más avancemos en la vida, más pronto llegará el día en que podamos vivir juntos. Así que no le tengamos miedo al futuro, sino recibámoslo de brazos abiertos.",
        color: "#5c2450"
    },
    love: {
        title: "Lo mucho que te amo ❤️",
        text: "Te amo, en serio te amo y lo haré en cada momento de mi vida, en cada instante en el que tenga conciencia. Te amo de una manera única que sobrepasa toda lógica existente. Te amo por quién eres, te amo por quién quieres llegar a ser, por lo que haces y por lo que no haces. Te amo por tus logros y por tus esfuerzos. Yo te amo simplemente por ser tú y quiero que lo sepas siempre.",
        color: "#ff4d6d"
    }
};

// Función para abrir los sobres flotantes (Modo Oscuro)
function openEnvelope(type) {
    const message = envelopeMessages[type];

    Swal.fire({
        title: message.title,
        text: message.text,
        confirmButtonText: 'Guardar en mi corazón 💜',
        confirmButtonColor: message.color,
        background: '#251229',
        color: '#f2e9f4',
        showClass: {
            popup: 'animate__animated animate__zoomIn'
        },
        hideClass: {
            popup: 'animate__animated animate__zoomOut'
        }
    });
}

// Función para calcular los días y horas juntos desde el 13 de Diciembre de 2019
function calculateDaysTogether() {
    const startDate = new Date('2019-12-13T00:00:00');
    const now = new Date();
    
    const differenceInMs = now - startDate;
    
    // Convertir milisegundos a días y horas
    const days = Math.floor(differenceInMs / (1000 * 60 * 60 * 24));
    const hours = Math.floor((differenceInMs / (1000 * 60 * 60)) % 24);
    
    const daysElem = document.getElementById('days-count');
    const hoursElem = document.getElementById('hours-count');
    
    if (daysElem && hoursElem) {
        daysElem.innerText = days;
        hoursElem.innerText = hours;
    }
}

// Ejecutar el cálculo inmediatamente al cargar la página
calculateDaysTogether();