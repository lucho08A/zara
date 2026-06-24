/* ============================================================
   ANIMACIONES — GSAP + ScrollTrigger
   ============================================================
   ENFOQUE ROBUSTO:
   
   1. CSS define estado INICIAL OCULTO (opacity: 0) para todos
      los elementos que se animan.
   
   2. GSAP solo usa .to() para animar HACIA visible
      (nunca .from() que oculta el elemento primero).
   
   3. Red de seguridad: si GSAP no ejecuta correctamente
      en 1500ms, la clase 'sin-animacion' fuerza que todo
      aparezca con opacity: 1 !important.
   
   4. Resultado: NO ES POSIBLE que el contenido desaparezca.
   ============================================================ */

// Red de seguridad: Si en 1500ms no hay 'gsap-listo',
// activamos fallback y forzamos visibilidad total
var fallbackTimeout = setTimeout(function() {
  if (!document.documentElement.hasAttribute('data-gsap-listo')) {
    console.warn('⚠️ GSAP no se ejecutó en tiempo. Mostrando contenido con fallback.');
    document.documentElement.classList.add('sin-animacion');
  }
}, 1500);

document.addEventListener('DOMContentLoaded', function() {

  // Verificar que GSAP esté disponible
  if (typeof gsap === 'undefined') {
    console.error('❌ GSAP no cargó desde el CDN');
    document.documentElement.classList.add('sin-animacion');
    return;
  }

  try {
    gsap.registerPlugin(ScrollTrigger);
    console.log('✅ GSAP + ScrollTrigger cargados');

    /* ============================================================
       1. CORAZONES FLOTANTES DEL HERO  (EDITA AQUÍ)
       ============================================================ */
    var contenedorCorazones = document.getElementById('hero-floaters');
    if (contenedorCorazones) {
      var CANTIDAD_CORAZONES = 26;
      var variantes = ['', 'floater-durazno', 'floater-dorado'];

      for (var i = 0; i < CANTIDAD_CORAZONES; i++) {
        var corazon = document.createElement('span');
        corazon.className = 'floater ' + variantes[i % variantes.length];
        corazon.textContent = '♡';
        corazon.setAttribute('aria-hidden', 'true');

        corazon.style.top = (Math.random() * 100) + '%';
        corazon.style.left = (Math.random() * 100) + '%';
        corazon.style.fontSize = (0.9 + Math.random() * 1.8) + 'rem';
        corazon.style.opacity = (0.25 + Math.random() * 0.45).toString();

        contenedorCorazones.appendChild(corazon);

        gsap.to(corazon, {
          y: -(18 + Math.random() * 30),
          rotation: (Math.random() > 0.5 ? 1 : -1) * (6 + Math.random() * 10),
          duration: 4 + Math.random() * 5,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: Math.random() * 3
        });
      }
    }

    /* ============================================================
       2. ANIMACIÓN DE ENTRADA DEL HERO
       ============================================================
       Anima HACIA visible (opacity: 1). El CSS ya tiene opacity: 0
       definido, así que el primer .to() va de 0 a 1. */
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .to('.hero-eyebrow', { opacity: 1, duration: 0.7 }, 0)
      .to('.hero-titulo', { opacity: 1, duration: 0.9 }, 0.2)
      .to('.hero-frase', { opacity: 1, duration: 0.8 }, 0.4)
      .to('.scroll-indicador', { opacity: 1, duration: 0.6 }, 0.5);

    console.log('✅ Hero animado');

    /* ============================================================
       3. CABECERAS DE SECCIÓN
       ============================================================ */
    var cabeceras = document.querySelectorAll('.seccion-cabecera');
    cabeceras.forEach(function(cabecera) {
      gsap.to(cabecera, {
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cabecera,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    });

    /* ============================================================
       4. GALERÍA DE FOTOS (polaroids)
       ============================================================ */
    var polaroids = document.querySelectorAll('#galeria .polaroid');
    if (polaroids.length) {
      gsap.to(polaroids, {
        opacity: 1,
        duration: 1,
        ease: 'back.out(1.6)',
        stagger: 0.15,
        scrollTrigger: {
          trigger: '#galeria .galeria-grid',
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    }

    /* ============================================================
       5. TARJETAS DE CANCIONES
       ============================================================ */
    var cancionCards = document.querySelectorAll('#canciones .cancion-card');
    if (cancionCards.length) {
      gsap.to(cancionCards, {
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: '#canciones .canciones-lista',
          start: 'top 78%',
          toggleActions: 'play none none none'
        }
      });
    }

    /* ============================================================
       6. LA CARTA
       ============================================================ */
    var carta = document.querySelector('#carta .carta-contenedor');
    if (carta) {
      gsap.to(carta, {
        opacity: 1,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: carta,
          start: 'top 82%',
          toggleActions: 'play none none none'
        }
      });
    }

    /* ============================================================
       7. CIERRE FINAL
       ============================================================ */
    var cierre = document.querySelector('.cierre');
    if (cierre) {
      gsap.to(cierre, {
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cierre,
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      });
    }

    // Limpiamos el timeout de seguridad (GSAP ejecutó correctamente)
    clearTimeout(fallbackTimeout);
    
    // Marcamos que GSAP se ejecutó correctamente
    document.documentElement.setAttribute('data-gsap-listo', 'true');
    console.log('✅ Todas las animaciones configuradas correctamente');

    // Refrescar ScrollTrigger si las fuentes se cargan después
    window.addEventListener('load', function() {
      ScrollTrigger.refresh();
    });

  } catch (error) {
    console.error('❌ Error al configurar animaciones:', error);
    document.documentElement.classList.add('sin-animacion');
  }
});