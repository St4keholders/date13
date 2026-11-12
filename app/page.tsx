"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { MapPin, Sparkles, Calendar, Clock, Utensils, Heart } from "lucide-react";
import FloatingHearts from "@/components/FloatingHearts";

const NO_PHRASES = [
  "No",
  "¿Segura, Mariangel? 🥺",
  "Piénsalo bien... ¡son hamburguesas! 🍔",
  "Me vas a romper el corazón 💔",
  "¡Prometo que están deliciosas! 🤤",
  "¿Ni siquiera con papitas extra? 🍟",
  "Ese botón ya casi ni sirve 👀",
  "¡Anda, di que sí! ❤️",
  "Error 404: Opción 'No' deshabilitada 😂",
];

const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function InvitePage() {
  const [accepted, setAccepted] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [noOffset, setNoOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const launchCelebrationConfetti = useCallback(() => {
    const colors = ["#ff4d6d", "#ff758f", "#ff8fa3", "#ffb703", "#fb8500"];

    confetti({
      particleCount: 85,
      spread: 75,
      origin: { y: 0.6 },
      colors,
    });

    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0.1, y: 0.65 },
        colors,
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 0.9, y: 0.65 },
        colors,
      });
    }, 220);
  }, []);

  useEffect(() => {
    if (accepted) {
      launchCelebrationConfetti();
    }
  }, [accepted, launchCelebrationConfetti]);

  const handleNoInteraction = () => {
    const nextCount = noCount + 1;
    setNoCount(nextCount);

    if (nextCount >= 2) {
      const randomX = Math.floor(Math.random() * 121) - 60; // -60px to 60px
      const randomY = Math.floor(Math.random() * 121) - 60; // -60px to 60px
      setNoOffset({ x: randomX, y: randomY });
    }
  };

  const noScale = Math.max(0.35, 1 - noCount * 0.1);
  const yesScale = Math.min(2.15, 1 + noCount * 0.22);
  const currentNoText = NO_PHRASES[Math.min(noCount, NO_PHRASES.length - 1)];

  return (
    <main className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-4 py-6 select-none">
      {/* Decorative soft background blobs */}
      <div
        className="pointer-events-none fixed -top-24 -left-24 h-72 w-72 rounded-full bg-rose-300/35 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed -right-24 -bottom-24 h-80 w-80 rounded-full bg-orange-300/30 blur-3xl"
        aria-hidden="true"
      />

      <FloatingHearts />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {!accepted ? (
            <motion.section
              key="question-card"
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
              aria-labelledby="invite-heading"
              className="flex w-full flex-col items-center rounded-3xl border border-white/70 bg-white/75 p-6 text-center shadow-[0_20px_50px_rgba(244,63,94,0.16)] backdrop-blur-xl sm:p-8"
            >
              {/* Sweet Header Badge */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4, ease: EASE_OUT_EXPO }}
                className="mb-5 inline-flex items-center gap-1.5 rounded-full border border-rose-200/80 bg-rose-50/90 px-4 py-1.5 text-xs font-semibold tracking-wide text-rose-700 shadow-xs sm:text-sm"
              >
                <span>Para: Mariangel 💕 | De: Juan Andrés</span>
              </motion.div>

              {/* Central pulsing burger + heart icon */}
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 3, -3, 0],
                }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="mb-5 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-rose-100 via-pink-50 to-orange-100 text-4xl shadow-inner ring-4 ring-white/80"
                aria-hidden="true"
              >
                <span>🍔❤️</span>
              </motion.div>

              {/* Main Question */}
              <h1
                id="invite-heading"
                className="mb-3 text-2xl leading-tight font-extrabold tracking-tight text-rose-950 sm:text-3xl"
              >
                ¿Quieres salir conmigo este viernes por hamburguesas?
              </h1>

              <p className="mb-7 max-w-xs text-sm leading-relaxed text-rose-700/85 sm:text-base">
                Prometo risas garantizadas, papitas crujientes y la mejor compañía de todas ✨
              </p>

              {/* Interactive Buttons Area */}
              <div className="relative flex min-h-[150px] w-full flex-col items-center justify-center gap-4">
                <motion.button
                  type="button"
                  onClick={() => setAccepted(true)}
                  animate={{
                    scale: yesScale,
                  }}
                  whileHover={{ scale: Math.min(2.25, yesScale * 1.04) }}
                  whileTap={{ scale: Math.max(0.95, yesScale * 0.96) }}
                  transition={{
                    type: "spring",
                    stiffness: 320,
                    damping: 20,
                  }}
                  aria-label="Sí, acepto salir por hamburguesas"
                  className="relative z-20 inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-orange-400 px-7 py-3.5 text-base font-bold text-white shadow-[0_10px_25px_-5px_rgba(244,63,94,0.55)] ring-2 ring-white/60 transition-shadow hover:shadow-[0_14px_30px_-4px_rgba(244,63,94,0.75)] focus-visible:ring-4 focus-visible:ring-rose-400 focus-visible:outline-none"
                >
                  <span>¡Sí, claro que sí! 🍔💖</span>
                </motion.button>

                <motion.button
                  type="button"
                  onClick={handleNoInteraction}
                  animate={{
                    scale: noScale,
                    x: noOffset.x,
                    y: noOffset.y,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 22,
                  }}
                  aria-label={currentNoText}
                  style={{
                    fontSize: `${Math.max(11, 15 - noCount * 0.5)}px`,
                    padding: `${Math.max(6, 10 - noCount * 0.5)}px ${Math.max(12, 20 - noCount)}px`,
                  }}
                  className="z-10 mt-2 cursor-pointer rounded-xl border border-rose-200/80 bg-white/85 font-medium text-rose-800/80 shadow-xs backdrop-blur-xs transition-colors hover:bg-rose-50 focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:outline-none"
                >
                  {currentNoText}
                </motion.button>
              </div>
            </motion.section>
          ) : (
            <motion.section
              key="accepted-card"
              initial={{ opacity: 0, scale: 0.9, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
              aria-labelledby="success-heading"
              className="flex w-full flex-col items-center rounded-3xl border border-white/80 bg-white/80 p-6 text-center shadow-[0_24px_60px_rgba(244,63,94,0.22)] backdrop-blur-xl sm:p-8"
            >
              {/* Joyful Animated Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 280, damping: 16, delay: 0.1 }}
                className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-tr from-rose-500 to-orange-400 text-3xl text-white shadow-lg ring-4 ring-rose-100"
                aria-hidden="true"
              >
                🥳
              </motion.div>

              <h1
                id="success-heading"
                className="mb-2 text-2xl leading-tight font-extrabold tracking-tight text-rose-950 sm:text-3xl"
              >
                ¡SÍÍÍ! ¡Muchas gracias, Mariangel! 🥰🍔❤️
              </h1>

              <p className="mb-6 max-w-xs text-sm leading-relaxed font-medium text-rose-700/90 sm:text-base">
                Sabía que no podías resistirte a unas buenas hamburguesas conmigo.
              </p>

              {/* Date Details Card */}
              <div className="mb-6 w-full rounded-2xl border border-rose-100 bg-gradient-to-br from-rose-50/90 via-white/95 to-orange-50/80 p-4 text-left shadow-inner sm:p-5">
                <div className="mb-3 flex items-center gap-2 border-b border-rose-100/90 pb-2.5 text-xs font-bold tracking-wider text-rose-500 uppercase">
                  <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />
                  <span>Detalles de nuestra cita</span>
                </div>

                <ul className="space-y-2.5 text-sm text-rose-950">
                  <li className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2 font-medium text-rose-700">
                      <Sparkles className="h-4 w-4 text-amber-500" />
                      Invita:
                    </span>
                    <span className="font-bold">Juan Andrés ✨</span>
                  </li>
                  <li className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2 font-medium text-rose-700">
                      <Calendar className="h-4 w-4 text-rose-500" />
                      Fecha:
                    </span>
                    <span className="font-bold">Viernes, 13/11/2026 📅</span>
                  </li>
                  <li className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2 font-medium text-rose-700">
                      <Clock className="h-4 w-4 text-rose-500" />
                      Hora:
                    </span>
                    <span className="font-bold">7:00 PM 🕖</span>
                  </li>
                  <li className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2 font-medium text-rose-700">
                      <Utensils className="h-4 w-4 text-orange-500" />
                      Plan:
                    </span>
                    <span className="font-bold">Noche de Hamburguesas 🍔🍟</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex w-full flex-col gap-3">
                <motion.a
                  href="https://maps.app.goo.gl/dKLeJo5c9YR7jWgr5"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  animate={{
                    y: [0, -2, 0],
                  }}
                  transition={{
                    y: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
                  }}
                  aria-label="Ver ubicación de la cita en Google Maps"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-orange-400 px-6 py-3.5 text-base font-bold text-white shadow-[0_10px_25px_-5px_rgba(244,63,94,0.5)] ring-2 ring-white/70 transition-shadow hover:shadow-[0_15px_30px_-5px_rgba(244,63,94,0.7)] focus-visible:ring-4 focus-visible:ring-rose-400 focus-visible:outline-none"
                >
                  <MapPin className="h-5 w-5 shrink-0" />
                  <span>📍 Ver ubicación de la cita</span>
                </motion.a>

                <motion.button
                  type="button"
                  onClick={launchCelebrationConfetti}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50/80 px-4 py-2.5 text-xs font-semibold text-rose-700 transition-colors hover:bg-rose-100/80 focus-visible:ring-2 focus-visible:ring-rose-300 focus-visible:outline-none sm:text-sm"
                >
                  <Sparkles className="h-4 w-4 text-rose-500" />
                  <span>¡Lanzar más confeti y amor! 🎉</span>
                </motion.button>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
