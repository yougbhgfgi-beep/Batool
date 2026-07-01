import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Lock, Heart, Stars, Music } from "lucide-react";

export default function LoveWebsite() {
    const [isLogged, setIsLogged] = useState(false);
    const [password, setPassword] = useState("");
    const [showLetter, setShowLetter] = useState(false);
    const [showSecret, setShowSecret] = useState(false);
    const [showFinalScene, setShowFinalScene] = useState(false);
    const [timeTogether, setTimeTogether] = useState({});
    const [isPlaying, setIsPlaying] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const audioRef = React.useRef(null);

    const loveStartDate = new Date("2024-09-20T00:00:00");
    const { scrollYProgress } = useScroll();
    const scaleHero = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const diff = now - loveStartDate;

            const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
            const years = Math.floor(totalDays / 365);
            const months = Math.floor((totalDays % 365) / 30);
            const days = totalDays % 30;
            const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
            const minutes = Math.floor(diff / (1000 * 60)) % 60;
            const seconds = Math.floor(diff / 1000) % 60;

            setTimeTogether({ years, months, days, hours, minutes, seconds });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleLogin = () => {
        if (password.toUpperCase() === "LOVE") {
            setIsLogged(true);
            if (audioRef.current) {
                audioRef.current.play().catch(e => console.log("Audio play failed:", e));
                setIsPlaying(true);
            }
            setTimeout(() => setShowLetter(true), 1200);
        } else {
            alert("كلمة السر خطأ، حاولي مرة أخرى ❤️");
        }
    };

    const triggerSecret = () => {
        setShowSecret(true);
        setTimeout(() => setShowSecret(false), 2000);
    };

    if (!isLogged) {
        return (
            <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
                {/* Video Background */}
                <div className="absolute inset-0 z-0">
                    <video 
                        autoPlay 
                        muted 
                        loop 
                        playsInline
                        className="w-full h-full object-cover opacity-60"
                    >
                        <source src="/wa_video_2026_02_11_2135.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative z-10 bg-white/10 backdrop-blur-lg border border-white/20 p-10 rounded-3xl text-center text-white shadow-2xl max-w-sm w-full"
                >
                    <div className="mb-6 flex justify-center">
                        <div className="bg-white/20 p-4 rounded-full shadow-lg animate-pulse">
                            <Heart className="text-pink-400" size={50} fill="currentColor" />
                        </div>
                    </div>

                    <h1 className="text-4xl font-bold mb-8 font-serif drop-shadow-md">افتح قلبي يا حبيبتي ❤️</h1>

                    <div className="flex justify-center mb-8">
                        <input
                            type="password"
                            placeholder="كلمة السر"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 text-center focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                        />
                    </div>

                    <button
                        onClick={handleLogin}
                        className="w-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-bold py-3 rounded-xl shadow-lg transform transition hover:scale-105"
                    >
                        دخول
                    </button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-b from-rose-100 via-pink-200 to-rose-300 text-gray-800 overflow-hidden relative">
            <audio ref={audioRef} src="/music.mp3" loop />

            <button
                onClick={() => {
                    if (isPlaying) audioRef.current.pause();
                    else audioRef.current.play();
                    setIsPlaying(!isPlaying);
                }}
                className={`fixed top-4 left-4 z-50 bg-white/80 p-3 rounded-full shadow-lg text-pink-600 hover:bg-white transition-all duration-300 ${isPlaying ? "animate-spin" : ""}`}
            >
                <Music size={24} />
            </button>

            {/* Secret Popup */}
            <AnimatePresence>
                {showSecret && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
                    >
                        <div className="bg-white px-16 py-10 rounded-3xl text-4xl font-bold text-pink-600 shadow-2xl">
                            بحبك ❤
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Letter Modal */}
            <AnimatePresence>
                {showLetter && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6"
                    >
                        <div className="bg-white rounded-3xl max-w-3xl w-full p-8 shadow-2xl text-right" dir="rtl">
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-2xl font-bold">رسالة من قلبي</h2>
                                <button onClick={() => setShowLetter(false)} className="text-gray-500 hover:text-red-500">
                                    إغلاق
                                </button>
                            </div>

                            <div className="text-lg leading-relaxed text-gray-800 space-y-4">
                                <p>بصي يا حبيبتي احنا اهه عرفين بعض من زمان ويوم ما دخلتي حياتي كانت برضه مرة واحدة ومش كانت مترتبه جت صدفه لسبب بس وحياه ربنا احسن صدفه وسبب في حياتي علشان عرفتيني على حد زيك يا نور عيني 🥹♥️♥️</p>

                                <p>عاوز اقولك اني من يوم ما عرفتك وانتي بقيتي كل حاجه لياا بقيتي أبويا وأخويا وحبيبتي وصاحبتي وسندي وضهري ونور عيني ودنيتي كلها انتي بقيتي الحياه اللي عايش عشانها انا بحبك قوي بحب حنيتك وبحب كلامك لياا بحب ضحكتك بحبك غيرتك علياا بحب كل حاجه بحبك كلك على بعضك كده انتي الحاجه الوحيده اللي طلعت من الدنيا انتي الأكسجين اللي بتنفسه 🥺♥️</p>

                                <p>العيد قرب وانتي معايا يا عمري ودي العيد التاني لياا انا وانتي 🥺وإن شاء الله يا حياتي مش هيبقى آخر عيد هنفضل مع بعض طول العمر 🏘🌎♥️😘</p>

                                <p>لسه كام شهر ونتم سنتين مع بعض يا عمري 👀♥️</p>

                                <p>ربنا يخليك ليا يا حته مني ويدميك ليه يا نور عيني وميحرمنيش منك ابداً يا حياتي 🌎🏘😘</p>
                            </div>

                            <div className="mt-6 flex justify-center">
                                <button onClick={() => setShowLetter(false)} className="bg-pink-500 text-white px-6 py-2 rounded-full shadow hover:scale-105 transition">
                                    بختمها بحبك ❤️
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Final Scene Overlay */}
            <AnimatePresence>
                {showFinalScene && (
                    <FinalSceneComponent onClose={() => setShowFinalScene(false)} />
                )}
            </AnimatePresence>

            {/* Hero Cinematic */}
            <motion.section style={{ scale: scaleHero }} className="text-center py-16 md:py-32 px-4 text-gray-800">
                <h1 className="text-4xl md:text-6xl lg:text-8xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-500 to-pink-600 drop-shadow-lg" dir="ltr">عبد الرحمن ❤️ بتول</h1>
                <p className="text-lg md:text-xl lg:text-2xl">قصة حب مكتوبة للابد</p>
                <button
                    onClick={triggerSecret}
                    className="mt-10 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-full shadow-xl"
                >
                    زر المفاجأة
                </button>
            </motion.section>

            {/* Timeline Memories */}
            <section className="py-24 bg-white/70">
                <h2 className="text-4xl font-bold text-center mb-16 px-4 text-gray-800">خط ذكرياتنا</h2>
                <div className="relative max-w-4xl mx-auto px-4">
                    <div className="absolute left-1/2 top-0 w-1 bg-pink-400 h-full hidden md:block" />

                    {[
                        { text: "أول تعارف", date: "13/9/2024" },
                        { text: "أول ضحكة سوا", date: "13/9/2024" },
                        { text: "أول خروجة", date: "20/9/2024" },
                        { text: "الاعتراف بالحب", date: "23/9/2024" },
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className={`mb-16 flex ${index % 2 === 0 ? "md:justify-start" : "md:justify-end"} justify-center`}
                        >
                            <div className="bg-pink-500 text-white p-6 rounded-2xl w-80 shadow-xl">
                                <div className="font-bold">{item.text}</div>
                                <div className="text-sm mt-1">{item.date}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Luxury Gallery */}
            <section className="py-24 text-center px-4">
                <h2 className="text-4xl font-bold mb-16 text-gray-800">صورنا</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                    {[
                        { src: "/img1.jpg", caption: "كان احلى يوم يا نور عيني 🥺♥️\nاليوم اللي اتخصميني بسببه وانا مش كنت راضي 😂♥️\nبحبك قوي قوي يا بتول 😍🫶" },
                        { src: "/img2.jpg", caption: "وجودك هو السند والضهر.. البنت الي بجد بتحلي دنيتي ✨💍" },
                        { src: "/img3.jpg", caption: "كل تفصيله فيكي بتخطف قلبي.. بحبك يا أغلى ناسي 🌏💞" }
                    ].map((img, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            className="p-2 bg-gradient-to-r from-pink-400 to-rose-500 rounded-3xl shadow-2xl relative group overflow-hidden"
                            onClick={() => setSelectedImage(img.src)}
                        >
                            <div className="bg-white aspect-[9/16] md:h-96 rounded-2xl flex flex-col items-center justify-start overflow-hidden relative cursor-pointer">
                                <img
                                    src={img.src}
                                    alt={`Love Memory ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                    <p className="text-sm font-medium whitespace-pre-line">{img.caption}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Lightbox */}
            {selectedImage && (
                <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-4" onClick={() => setSelectedImage(null)}>
                    <button className="absolute top-6 right-6 text-white text-3xl" onClick={() => setSelectedImage(null)}>×</button>
                    <img src={selectedImage} alt="expanded" className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl" onClick={(e) => e.stopPropagation()} />
                </div>
            )}

            {/* Sea Section */}
            <section className="py-24 bg-gradient-to-b from-blue-300 to-cyan-400 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 max-w-4xl mx-auto px-6"
                >
                    <h2 className="text-5xl font-bold mb-8 drop-shadow-lg">مكانا المفضل 🌊</h2>
                    <p className="text-3xl font-serif leading-relaxed drop-shadow-md">
                        "مكانا المفضل هو البحر عشان احنا عارفين ان حبنا زيو مليان اسرار"
                    </p>
                </motion.div>
                <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
                    <svg className="relative block w-[calc(100%+1.3px)] h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white/30"></path>
                    </svg>
                </div>
            </section>

            {/* Counter */}
            <section className="py-24 bg-white/70 text-center px-4">
                <h2 className="text-3xl font-bold mb-10 text-gray-800">من يوم 20/9/2024 واحنا مع بعض</h2>
                <div className="grid grid-cols-2 lg:grid-cols-6 gap-6 max-w-4xl mx-auto">
                    <TimeBox label="سنين" value={timeTogether.years} />
                    <TimeBox label="شهور" value={timeTogether.months} />
                    <TimeBox label="أيام" value={timeTogether.days} />
                    <TimeBox label="ساعات" value={timeTogether.hours} />
                    <TimeBox label="دقائق" value={timeTogether.minutes} />
                    <TimeBox label="ثواني" value={timeTogether.seconds} />
                </div>
            </section>

            <footer className="text-center py-10 flex flex-col items-center gap-4">
                <p className="text-gray-600">For the rest of our life ❤</p>
                <button
                    onClick={() => setShowFinalScene(true)}
                    className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg hover:bg-purple-700 transition-all shadow-lg hover:scale-110 active:scale-95"
                >
                    النهاية
                </button>
            </footer>
        </div>
    );
}

function TimeBox({ label, value }) {
    return (
        <div className="bg-pink-500 text-white p-6 rounded-2xl shadow-xl">
            <div className="text-3xl font-bold">{value || 0}</div>
            <div className="text-sm font-medium">{label}</div>
        </div>
    );
}

function FinalSceneComponent({ onClose }) {
    const [step, setStep] = useState(0);

    useEffect(() => {
        const timeouts = [500, 2500, 6000, 10000, 14000, 18000, 22000, 26000, 30000, 34000];
        const timers = timeouts.map((t, i) => setTimeout(() => setStep(i + 1), t));
        return () => timers.forEach(clearTimeout);
    }, []);

    const hearts = React.useMemo(() =>
        [...Array(20)].map((_, i) => ({
            id: i, left: Math.random() * 100, delay: Math.random() * 5,
            size: 16 + Math.random() * 24, duration: 6 + Math.random() * 8
        })), []
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 flex flex-col items-center justify-center text-center p-6 md:p-8 overflow-y-auto"
        >
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-rose-900/20 via-black to-black z-0 pointer-events-none"></div>

            {/* Floating Hearts */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                {hearts.map(h => (
                    <motion.div
                        key={h.id}
                        initial={{ opacity: 0, x: h.left + "%", y: "100%" }}
                        animate={{ opacity: [0, 0.5, 0], y: "-10%" }}
                        transition={{ duration: h.duration, repeat: Infinity, delay: h.delay }}
                        className="absolute text-pink-500/30"
                        style={{ left: h.left + "%" }}
                    >
                        <Heart size={h.size} fill="currentColor" />
                    </motion.div>
                ))}
            </div>

            {[...Array(50)].map((_, i) => (
                <motion.div
                    key={`star-${i}`}
                    className="absolute bg-white/80 rounded-full z-0 pointer-events-none"
                    style={{
                        width: Math.random() * 3 + 'px', height: Math.random() * 3 + 'px',
                        top: Math.random() * 100 + '%', left: Math.random() * 100 + '%',
                    }}
                    animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
                    transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 4 }}
                />
            ))}

            <button onClick={onClose} className="absolute top-6 md:top-8 right-6 md:right-8 text-slate-400 hover:text-white hover:rotate-90 hover:scale-110 transition-all duration-300 text-4xl md:text-5xl font-bold z-50">
                ×
            </button>

            <div className="relative z-10 max-w-2xl w-full flex flex-col items-center justify-center min-h-[60vh]">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.h2
                            key="step1"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.2 }}
                            className="text-6xl md:text-8xl font-bold text-pink-500 animate-pulse drop-shadow-[0_0_50px_rgba(225,29,72,0.8)]"
                        >
                            إلى بتول.. ❤️
                        </motion.h2>
                    )}

                    {step >= 2 && step < 8 && (
                        <motion.div key="msg" className="space-y-6 md:space-y-10 py-6" dir="rtl">
                            {step >= 2 && (
                                <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="bg-white/5 p-8 md:p-10 rounded-[2.5rem] backdrop-blur-md border border-pink-500/20">
                                    <p className="text-2xl md:text-4xl font-bold leading-relaxed mb-6 text-rose-100">بتول.. أنتي مش بس حبيبتي،</p>
                                    <p className="text-xl md:text-3xl font-bold text-rose-300">أنتي كل دنيتي وأماني وسعادتي.</p>
                                </motion.div>
                            )}
                            {step >= 3 && (
                                <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="bg-white/5 p-6 md:p-8 rounded-[2rem] backdrop-blur-sm border border-indigo-500/20">
                                    <p className="text-xl md:text-3xl font-bold text-white">كل لحظة معاكي بتخليني أعشق الحياة أكتر..</p>
                                    <p className="text-lg md:text-2xl text-indigo-300 mt-4">وجودك في حياتي مش مجرد صدفة، ده أجمل planned حاجة حصلتلي.</p>
                                </motion.div>
                            )}
                            {step >= 4 && (
                                <motion.p initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="text-3xl md:text-5xl font-script text-rose-400 drop-shadow-[0_0_20px_rgba(251,113,133,0.5)]">
                                    بحبك فوق ما تتخيلي.. ❤️
                                </motion.p>
                            )}
                            {step >= 5 && (
                                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="bg-white/5 p-6 md:p-8 rounded-[2rem] backdrop-blur-md border border-amber-500/20">
                                    <p className="text-xl md:text-2xl font-bold text-white leading-relaxed">وعد عليا يا بتول..</p>
                                    <p className="text-lg md:text-xl text-amber-200 mt-3">إني هفضل ليكي أنا عبد الرحمن، اللي بيحبك بصدق، واللي مبيتغيرش عليه، وحبه ليكي مبيخلصش.</p>
                                </motion.div>
                            )}
                            {step >= 6 && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                                    <p className="text-2xl md:text-3xl font-bold text-rose-300">نفسي أكون سبب ضحكتك، وسندك، وأمانك طول العمر.</p>
                                </motion.div>
                            )}
                            {step >= 7 && (
                                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-lg md:text-2xl text-yellow-300 font-bold tracking-wide">
                                    ربنا يخليكي ليا وما يحرمنيش منك أبداً يا كل دنيتي. 🏘🌎♥️
                                </motion.p>
                            )}
                        </motion.div>
                    )}

                    {step >= 8 && (
                        <motion.div key="final" className="flex flex-col items-center">
                            <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ duration: 1.5, type: "spring" }} className="mb-8 md:mb-12 text-pink-500 bg-white/5 p-6 md:p-8 rounded-full shadow-[0_0_60px_rgba(225,29,72,0.5)] border border-pink-500/30">
                                <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                                    <Heart size={80} fill="currentColor" />
                                </motion.div>
                            </motion.div>
                            <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }} className="text-5xl md:text-8xl lg:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-500 to-red-500 mb-6 md:mb-10 drop-shadow-2xl">
                                عبد الرحمن ❤️ بتول
                            </motion.h1>
                            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }} className="text-2xl md:text-4xl font-bold mb-4 text-white drop-shadow-lg">
                                حبنا أقوى من كل شيء..
                            </motion.p>
                            <motion.p initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1, duration: 1 }} className="text-3xl md:text-5xl font-bold text-rose-400 animate-pulse drop-shadow-[0_0_20px_rgba(244,63,94,0.5)]">
                                إلى ما لا نهاية ♾️
                            </motion.p>
                            {step >= 9 && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                                    <p className="text-lg md:text-2xl text-gray-400 mt-10 font-serif italic border-t border-rose-500/30 pt-6">For the rest of our life.</p>
                                    <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1 }} className="text-base md:text-lg text-rose-500/70 mt-4 font-medium">
                                        — أنا دايماً وبال forever, عبد الرحمن 💌
                                    </motion.p>
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
