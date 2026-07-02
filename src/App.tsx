import { useState, useEffect, useRef } from "react";
import { 
  Sparkles, 
  Layers, 
  Compass, 
  Instagram, 
  Send, 
  CheckCircle, 
  Languages, 
  Briefcase, 
  ArrowRight, 
  Palette, 
  ShieldCheck, 
  FileText, 
  MessageSquare, 
  ExternalLink,
  ChevronRight,
  User,
  Heart,
  Smartphone,
  Award,
  BookOpen,
  Info,
  Clock,
  Menu,
  X
} from "lucide-react";
import { Project, Service, Certificate, Message, ClientBrief } from "./types";

// Static translations dictionary
const translations = {
  ru: {
    navPortfolio: "Портфолио",
    navAbout: "10 лет Опыта",
    navBrief: "Бриф-Лаборатория",
    navAssistant: "AI Ассистент",
    heroBadge: "10 Лет Премиального Дизайнерского Мастерства",
    heroTitlePart1: "Высокая Мода & Элитный",
    heroTitlePart2: "Интерактивный UI/UX Дизайн",
    heroSub: "Создание современных цифровых интерфейсов, премиальной упаковки косметики и люксовых бренд-активов, определяющих эстетику будущего.",
    ctaBrief: "Составить Интерактивный Бриф",
    ctaConsult: "Обсудить в WhatsApp",
    viewProject: "Исследовать Шедевр",
    philosophyTitle: "Десятилетие Формирования Брендов",
    philosophyText: "Более 10 лет Перизат соединяет футуристичные функциональные интерфейсы с непревзойденной редакционной эстетикой. Каждый проект создается индивидуально на стыке строгой дизайн-дисциплины и глубокого понимания UX.",
    certTitle: "Профессиональные Сертификаты",
    certSubtitle: "Официальные дипломы и лицензии, подтверждающие квалификацию в передовых IT-академиях",
    briefTitle: "Лаборатория Дизайн-Брифа",
    briefSubtitle: "Заполните требования к вашему проекту, и встроенный искусственный интеллект Gemini мгновенно составит для вас стиль, палитру и план.",
    briefType: "Тип вашего проекта:",
    briefDesc: "Опишите концепцию бренда или задачу дизайна:",
    briefBudget: "Ориентировочный бюджет:",
    briefStyle: "Выберите визуальный стиль:",
    briefSubmit: "Сгенерировать AI-Стратегию Дизайна",
    briefGenerating: "Искусственный интеллект анализирует...",
    briefDiscuss: "Обсудить бриф с Алиной AI",
    briefWhatsApp: "Отправить бриф Перизат в WhatsApp",
    briefPalette: "Рекомендуемая визуальная палитра",
    briefKeywords: "Эстетическое направление",
    briefIdeas: "Персональные рекомендации по дизайну",
    chatTitle: "AI Студийный Консультант",
    chatSubtitle: "Пообщайтесь с Алиной, виртуальной помощницей Перизат. Спросите о ценах, процессах работы или советах.",
    chatInputPlaceholder: "Задайте вопрос про UI/UX, упаковку, сроки...",
    chatSend: "Отправить",
    chatQuickReply1: "Какие цены на дизайн?",
    chatQuickReply2: "Расскажи про обложку BOMBER",
    chatQuickReply3: "Делает ли она дизайн косметики?",
    footerHeading: "Создадим визуальное наследие вместе",
    footerText: "Доступна для премиального сотрудничества, удаленной проектной работы и комплексного консалтинга для брендов.",
    footerSocials: "Связаться в соцсетях",
    footerWhatsAppMsg: "Написать в WhatsApp",
    footerInstagramMsg: "Instagram Перизат",
    categoryAll: "Все работы",
    detailsLabel: "Эстетические спецификации",
    clientLabel: "Клиент / Концепт",
    dateLabel: "Год создания",
    backToHome: "Назад в галерею",
    alertBriefSuccess: "AI-стратегия дизайна успешно сгенерирована! Ознакомьтесь с деталями ниже."
  },
  ky: {
    navPortfolio: "Портфолио",
    navAbout: "10 Жылдык Тажрыйба",
    navBrief: "Интерактивдүү Бриф",
    navAssistant: "AI Жардамчы",
    heroBadge: "10 жылдык премиум дизайн тажрыйбасы",
    heroTitlePart1: "Жогорку Мода & Элиталык",
    heroTitlePart2: "Интерактивдүү UI/UX Дизайн",
    heroSub: "Келечектин эстетикасын аныктаган заманбап санариптик интерфейстерди, косметика таңгактарын жана люкс бренд-активдерин иштеп чыгуу.",
    ctaBrief: "Интерактивдүү бриф түзүү",
    ctaConsult: "WhatsApp аркылуу байланышуу",
    viewProject: "Шедеврди изилдөө",
    philosophyTitle: "Бренддерди куруунун он жылдыгы",
    philosophyText: "10 жылдан ашык убакыттан бери Перизат футуристтик функционалдык интерфейстерди жана заманбап басма мода эстетикасын айкалыштырып келет. Ар бир долбоор терең UX сезими жана катуу дизайн тартиби менен жекече даярдалат.",
    certTitle: "Кесиптик Сертификаттар",
    certSubtitle: "Алдыңкы IT-академиялардан алынган расмий сертификаттар жана тастыктамалар",
    briefTitle: "Дизайн-Бриф Лабораториясы",
    briefSubtitle: "Долбооруңуздун максаттарын жазыңыз, орнотулган Gemini Жасалма Интеллекти сиз үчүн уникалдуу стиль багытын жана дизайн планын сунуштайт.",
    briefType: "Долбоордун түрү:",
    briefDesc: "Бренддин концепциясын же дизайн максатын жазыңыз:",
    briefBudget: "Болжолдуу инвестиция деңгээли:",
    briefStyle: "Визуалдык стилди тандаңыз:",
    briefSubmit: "AI-Дизайн стратегиясын түзүү",
    briefGenerating: "Жасалма интеллект талдап жатат...",
    briefDiscuss: "Брифти Алина AI менен талкуулоо",
    briefWhatsApp: "Брифти Перизатка WhatsApp аркылуу жөнөтүү",
    briefPalette: "Сунушталган визуалдык түстөр",
    briefKeywords: "Эстетикалык багыттар",
    briefIdeas: "Сиз үчүн атайын сунуштар",
    chatTitle: "AI Студия Консультанты",
    chatSubtitle: "Алина менен баарлашыңыз (Перизаттын виртуалдык жардамчысы). Баалар, дизайн процесстери жана кеңештер боюнча суроолорду бериңиз.",
    chatInputPlaceholder: "UI/UX, логотип, мөөнөттөр боюнча суроо бериңиз...",
    chatSend: "Жөнөтүү",
    chatQuickReply1: "Дизайн баалары кандай?",
    chatQuickReply2: "BOMBER долбоору жөнүндө айтып бер",
    chatQuickReply3: "Косметика дизайнын жасайбы?",
    footerHeading: "Визуалдык мурасыңызды бирге куралы",
    footerText: "Премиум кызматташуу, узак мөөнөттүү долбоорлор жана жогорку деңгээлдеги консалтинг кызматтары үчүн жеткиликтүү.",
    footerSocials: "Социалдык тармактар",
    footerWhatsAppMsg: "WhatsApp-тан жазуу",
    footerInstagramMsg: "Перизаттын Инстаграмы",
    categoryAll: "Баардык иштер",
    detailsLabel: "Эстетикалык мүнөздөмөлөрү",
    clientLabel: "Кардар / Концепт",
    dateLabel: "Жасалган жылы",
    backToHome: "Артка кайтуу",
    alertBriefSuccess: "AI-дизайн стратегиясы ийгиликтүү түзүлдү! Төмөндөгү маалыматтарды карап чыгыңыз."
  }
};

const INITIAL_PROJECTS: Project[] = [
  {
    id: "bomber",
    title: "BOMBER Magazine Editorial",
    category: "Identity",
    description: "Futuristic sky-blue luxury editorial magazine style featuring sleek custom layouting and sharp typography.",
    descriptionRu: "Концептуальный дизайн обложки и верстки журнала высокой моды 'BOMBER'. Монохромный футуристичный стиль в нежно-голубых тонах, сочетание строгого шрифтового рисунка и эстетики вне времени.",
    descriptionKy: "Жогорку мода багытындагы 'BOMBER' журналынын мукабасынын концептуалдык дизайны. Ачык-көк монохромдук футуристтик стиль, катаал шрифттик түзүлүш жана заманбап эстетиканын айкалышы.",
    image: "/src/assets/images/bomber_magazine_cover_1783010769331.jpg",
    tags: ["Editorial", "High Fashion", "Aesthetics", "Typography"],
    date: "2026",
    client: "BOMBER Editorial Group"
  },
  {
    id: "centella",
    title: "Madagascar Centella Toner Packaging",
    category: "Package Design",
    description: "Elite frosted glassware design surrounded by premium blue hibiscus, promoting high-end skincare branding.",
    descriptionRu: "Премиальный дизайн флакона сыворотки/тонера 'Madagascar Centella Hyalu-Cica Brightening Toner'. Чистая минималистичная этикетка, матовое нежно-голубое стекло, успокаивающий и увлажняющий визуальный образ.",
    descriptionKy: "Madagascar Centella Hyalu-Cica Brightening Toner' косметикалык каражатынын премиум класстагы дизайны. Таза минималисттик этикетка, жалтырабаган көгүлтүр айнек, тынчтандыруучу жана нымдаштыруучу образ.",
    image: "/src/assets/images/centella_serum_design_1783010785869.jpg",
    tags: ["Package Design", "Cosmetics", "Minimalism", "Luxury Brand"],
    date: "2025",
    client: "SKIN1004 Co."
  },
  {
    id: "dashboard",
    title: "Glassmorphism UI/UX Dashboard",
    category: "UI/UX Design",
    description: "Elite responsive analytical data workspace featuring fine glowing strokes and glass card layouts.",
    descriptionRu: "Высокотехнологичный интерактивный дашборд аналитики с эффектом матового стекла (glassmorphism), неоновыми акцентами и тонкой проработкой адаптивной сетки для мобильных и десктоп платформ.",
    descriptionKy: "Маттык айнек эффектиси (glassmorphism), неондук акценттер жана мобилдик/десктоп платформалар үчүн адаптивдүү тордун кылдат иштелип чыгышы менен жогорку технологиялык аналитикалык дашборд.",
    image: "/src/assets/images/uiux_dashboard_mockup_1783010800992.jpg",
    tags: ["UI/UX Design", "SaaS Dashboard", "Interactive", "Glassmorphism"],
    date: "2026",
    client: "Fintech Lab Studio"
  }
];

const INITIAL_SERVICES = (lang: "ru" | "ky"): Service[] => [
  {
    id: "uiux",
    title: "UI/UX Design",
    titleRu: "Интерактивный UI/UX Дизайн",
    titleKy: "Интерактивдүү UI/UX Дизайн",
    description: "Architecting high-fidelity mobile apps and sleek web tools with advanced interaction prototypes.",
    descriptionRu: "Разработка макетов мобильных приложений и веб-сервисов премиум-класса с высоким уровнем детализации.",
    descriptionKy: "Жогорку деңгээлдеги деталдаштыруу менен премиум-класстагы мобилдик тиркемелердин жана веб-кызматтардын макеттерин иштеп чыгуу.",
    price: "$1,200+",
    iconName: "Smartphone"
  },
  {
    id: "branding",
    title: "Brand Identity",
    titleRu: "Айдентика и Логотипы",
    titleKy: "Бренд Иденттүүлүк & Логотиптер",
    description: "Forging timeless signature visual assets, typography palettes, and style frameworks.",
    descriptionRu: "Создание фирменного стиля, уникальной типографики и руководств по бренду для долговечного присутствия.",
    descriptionKy: "Туруктуу бренд үчүн фирмалык стилди, уникалдуу типографиканы жана бренд китептерин түзүү.",
    price: "$800+",
    iconName: "Palette"
  },
  {
    id: "packaging",
    title: "Cosmetics Packaging",
    titleRu: "Люксовая Упаковка",
    titleKy: "Люкс Класстагы Таңгактоо",
    description: "Formulating physical product structures, frosted glass designs, and botanical-aesthetic labels.",
    descriptionRu: "Проектирование изысканных флаконов, этикеток парфюмерии и косметики премиум уровня.",
    descriptionKy: "Премиум деңгээлдеги парфюмерия жана косметика үчүн таңгактарды, этикеткаларды долбоорлоо.",
    price: "$1,000+",
    iconName: "Layers"
  }
];

const INITIAL_CERTIFICATES: Certificate[] = [
  {
    id: "cert1",
    title: "Graphic Design Master Certification",
    titleRu: "Профессиональный курс: Графический Дизайн",
    titleKy: "Профессионалдык курс: Графикалык Дизайн",
    institution: "IT Club Academy",
    date: "June 23",
    skills: ["Brand Strategy", "Vector Typography", "Editorial Layouts", "Commercial Art"],
    imageType: "graphic"
  },
  {
    id: "cert2",
    title: "UI - UX Design Master Certification",
    titleRu: "Профессиональный курс: UI - UX Design",
    titleKy: "Профессионалдык курс: UI - UX Design",
    institution: "IT Club Academy",
    date: "June 25",
    skills: ["Figma Systems", "Interactive Wireframing", "User Research", "Heuristic Assessment"],
    imageType: "uiux"
  }
];

export default function App() {
  const [lang, setLang] = useState<"ru" | "ky">("ky");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  
  // Custom brief builder states
  const [briefType, setBriefType] = useState<string>("UI/UX Design");
  const [briefDesc, setBriefDesc] = useState<string>("");
  const [briefBudget, setBriefBudget] = useState<string>("$1,500 - $5,000");
  const [selectedStyles, setSelectedStyles] = useState<string[]>(["Minimalist", "Elegant"]);
  
  // AI Suggestions state
  const [isGeneratingBrief, setIsGeneratingBrief] = useState<boolean>(false);
  const [aiSuggestions, setAiSuggestions] = useState<{
    styleKeywords: string[];
    suggestedPalette: string[];
    ideas: string[];
  } | null>(null);

  // Chatbot states
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "model",
      text: "Саламатсызбы! Мен Перизаттын виртуалдык жардамчысы Алинамын. Сизге заманбап дизайн долбоорлору, баалар же Перизаттын 10 жылдык иш тажрыйбасы тууралуу маалымат берүүгө даярмын! Кандай сурооңуз бар?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [chatInput, setChatInput] = useState<string>("");
  const [isChatLoading, setIsChatLoading] = useState<boolean>(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Synchronize initial welcome message language
  useEffect(() => {
    let text = "";
    if (lang === "ru") {
      text = "Здравствуйте! Я Алина, виртуальный ассистент Перизат. Буду рада рассказать вам о премиум-дизайне, наших услугах, расценках и 10-летнем опыте Перизат. Какой проект вы планируете запустить?";
    } else {
      text = "Саламатсызбы! Мен Перизаттын жасалма интеллект жардамчысы Алинамын. Сизге заманбап дизайн долбоорлору, баалар же Перизаттын 10 жылдык иш тажрыйбасы тууралуу маалымат берем. Сизге кантип жардам бере алам?";
    }
    setChatMessages([
      {
        id: "welcome",
        role: "model",
        text: text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, [lang]);

  // Scroll to bottom of chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const handleToggleStyle = (style: string) => {
    if (selectedStyles.includes(style)) {
      setSelectedStyles(selectedStyles.filter(s => s !== style));
    } else {
      setSelectedStyles([...selectedStyles, style]);
    }
  };

  // Call server-side API for custom design plan recommendations
  const generateAiBriefRecommendation = async () => {
    if (!briefDesc.trim()) return;
    setIsGeneratingBrief(true);
    try {
      const response = await fetch("/api/gemini/suggest-brief", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description: briefDesc,
          projectType: briefType
        })
      });
      const data = await response.json();
      setAiSuggestions(data);
      alert(translations[lang].alertBriefSuccess);
    } catch (error) {
      console.error("Brief generation error:", error);
      // Fallback
      setAiSuggestions({
        styleKeywords: ["Modern Editorial", "Aesthetic Pure", "Sky Blue Focus"],
        suggestedPalette: ["#0F172A", "#38BDF8", "#F8FAFC", "#0284C7"],
        ideas: [
          "Use a stunning light-blue and deep navy high-contrast layout mimicking BOMBER's mood.",
          "Introduce a beautiful floating glassmorphic sidebar for desktop interfaces.",
          "Integrate clean cosmetics floral typography matching Perizat's Madgascar Centella aesthetics."
        ]
      });
    } finally {
      setIsGeneratingBrief(false);
    }
  };

  // Submit client message to chat endpoint
  const sendChatMessage = async (customText?: string) => {
    const messageToSend = customText || chatInput;
    if (!messageToSend.trim()) return;

    const userMsg: Message = {
      id: Math.random().toString(),
      role: "user",
      text: messageToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    if (!customText) setChatInput("");
    setIsChatLoading(true);

    try {
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...chatMessages, userMsg].map(m => ({ role: m.role, text: m.text })),
          brief: aiSuggestions ? {
            type: briefType,
            description: briefDesc,
            budget: briefBudget,
            styles: selectedStyles,
            aiSuggestions: aiSuggestions
          } : undefined
        })
      });
      const data = await response.json();
      setChatMessages(prev => [...prev, {
        id: Math.random().toString(),
        role: "model",
        text: data.text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (error) {
      console.error("Chat error:", error);
      setChatMessages(prev => [...prev, {
        id: Math.random().toString(),
        role: "model",
        text: lang === "ky" 
          ? "Кечиресиз, сурооңузду кабыл алууда ката кетти. Сураныч, Перизатка түз Instagram же WhatsApp аркылуу кайрылыңыз!" 
          : "Извините, возникла ошибка соединения. Пожалуйста, напишите Перизат напрямую в WhatsApp или Instagram!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Format and send brief over WhatsApp
  const shareBriefOnWhatsApp = () => {
    const text = `Саламатсызбы Перизат! Мен сиздин сайтыңыздан жаңы бриф түздүм.
Тип: ${briefType}
Сүрөттөмө: ${briefDesc}
Бюджет: ${briefBudget}
Тандалган Стилдер: ${selectedStyles.join(", ")}
${aiSuggestions ? `AI Түстөр: ${aiSuggestions.suggestedPalette.join(", ")}\nAI Идеялар: ${aiSuggestions.ideas.join(" | ")}` : ""}`;
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/996700123456?text=${encoded}`, "_blank");
  };

  const currentT = translations[lang];
  const servicesList = INITIAL_SERVICES(lang);

  return (
    <div className="min-h-screen bg-[#f0f7ff] text-slate-800 relative selection:bg-sky-100 selection:text-sky-900">
      
      {/* Background Decorative Glowing Orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sky-200/20 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-blue-200/20 rounded-full blur-[180px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-1/3 w-[450px] h-[450px] bg-sky-100/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* FIXED HEADER AND NAV */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-sky-100" id="header-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center space-x-3 group" id="brand-logo">
            <div className="w-10 h-10 rounded-full bg-[#72a0f2] flex items-center justify-center relative shadow-sm flex-shrink-0">
              <span className="font-serif font-extrabold text-white text-lg tracking-tighter select-none flex items-center relative">
                P
                <span className="text-[9px] font-sans font-medium uppercase tracking-wider absolute left-3.5 top-[5px] text-sky-100">
                  eri
                </span>
              </span>
              <span className="absolute bottom-1 right-1 text-[7px] italic font-['Playfair_Display',serif] text-white select-none leading-none rotate-[-6deg]">
                Design
              </span>
            </div>
            <div>
              <span className="font-bold text-base tracking-tight block text-slate-800 group-hover:text-sky-600 transition-colors">
                PERI Design
              </span>
              <span className="text-[10px] text-slate-500 tracking-widest uppercase block -mt-1 font-mono">
                10 Years Exp
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8" id="desktop-menu">
            <a href="#portfolio-section" className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors">{currentT.navPortfolio}</a>
            <a href="#about-section" className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors">{currentT.navAbout}</a>
            <a href="#brief-section" className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors">{currentT.navBrief}</a>
            <a href="#assistant-section" className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors">{currentT.navAssistant}</a>
          </nav>

          {/* Controls: Language Selector & Mobile Toggle */}
          <div className="flex items-center space-x-4">
            
            {/* Language Switcher pill */}
            <div className="bg-sky-50 border border-sky-100 p-1 rounded-full flex items-center shadow-inner" id="lang-switcher">
              <Languages className="w-3.5 h-3.5 text-slate-400 ml-2 mr-1" />
              <button 
                onClick={() => setLang("ky")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${lang === "ky" ? "bg-sky-500 text-white shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
              >
                КЫРГЫЗЧА
              </button>
              <button 
                onClick={() => setLang("ru")}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${lang === "ru" ? "bg-sky-500 text-white shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
              >
                РУССКИЙ
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-500 hover:text-slate-800 cursor-pointer"
              id="mobile-menu-btn"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-lg border-b border-sky-100 py-4 px-6 space-y-4 absolute w-full left-0 shadow-xl" id="mobile-menu">
            <a 
              href="#portfolio-section" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-slate-700 hover:text-sky-600"
            >
              {currentT.navPortfolio}
            </a>
            <a 
              href="#about-section" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-slate-700 hover:text-sky-600"
            >
              {currentT.navAbout}
            </a>
            <a 
              href="#brief-section" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-slate-700 hover:text-sky-600"
            >
              {currentT.navBrief}
            </a>
            <a 
              href="#assistant-section" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-medium text-slate-700 hover:text-sky-600"
            >
              {currentT.navAssistant}
            </a>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-12 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12" id="hero-section">
        
        {/* Left column text details */}
        <div className="flex-1 space-y-8 text-center lg:text-left">
          
          <div className="inline-flex items-center space-x-2 bg-sky-50 border border-sky-200/60 px-4 py-1.5 rounded-full text-xs font-semibold text-sky-700" id="hero-badge">
            <Sparkles className="w-3.5 h-3.5 text-sky-500 animate-pulse" />
            <span>{currentT.heroBadge}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]" id="hero-title">
            <span className="block font-['Playfair_Display',serif] italic font-normal text-slate-600">
              {currentT.heroTitlePart1}
            </span>
            <span className="block text-gradient mt-2 font-['Space_Grotesk',sans-serif] uppercase">
              {currentT.heroTitlePart2}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light" id="hero-subtitle">
            {currentT.heroSub}
          </p>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4" id="hero-actions">
            <a 
              href="#brief-section" 
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#72a0f2] to-[#4b82eb] text-white font-bold hover:shadow-lg hover:shadow-sky-400/20 transition-all flex items-center space-x-2.5 cursor-pointer"
            >
              <Briefcase className="w-5 h-5" />
              <span>{currentT.ctaBrief}</span>
            </a>
            <a 
              href="https://wa.me/996700123456" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-xl bg-white border border-sky-100 text-slate-600 hover:bg-sky-50 hover:border-sky-200 font-semibold transition-all flex items-center space-x-2 cursor-pointer"
            >
              <Instagram className="w-4 h-4 text-pink-500" />
              <span>@designer_perima</span>
            </a>
          </div>

          {/* Micro telemetry tag to prove actual experience level */}
          <div className="flex items-center justify-center lg:justify-start space-x-8 pt-6 border-t border-sky-100/60 max-w-md mx-auto lg:mx-0" id="experience-stat-row">
            <div>
              <span className="block text-3xl font-bold font-['Space_Grotesk',sans-serif] text-sky-600">10+</span>
              <span className="block text-xs text-slate-500 uppercase tracking-widest mt-0.5">Years Experience</span>
            </div>
            <div className="w-px h-10 bg-sky-100/60" />
            <div>
              <span className="block text-3xl font-bold font-['Space_Grotesk',sans-serif] text-sky-600">100%</span>
              <span className="block text-xs text-slate-500 uppercase tracking-widest mt-0.5"> Kyrgyz & Custom Art</span>
            </div>
            <div className="w-px h-10 bg-sky-100/60" />
            <div>
              <span className="block text-3xl font-bold font-['Space_Grotesk',sans-serif] text-sky-600">Elite</span>
              <span className="block text-xs text-slate-500 uppercase tracking-widest mt-0.5">IT Club Certified</span>
            </div>
          </div>

        </div>

        {/* Right column: Beautiful Interactive Avatar portrait frame */}
        <div className="flex-1 w-full max-w-md lg:max-w-lg relative" id="hero-avatar-frame">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#72a0f2] to-sky-400 rounded-2xl blur-3xl opacity-20 pointer-events-none" />
          
          {/* Main card */}
          <div className="relative glass-panel rounded-2xl p-4 border border-white shadow-xl">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-sky-50/50">
              <img 
                src="/src/assets/images/perizat_avatar_1783010816005.jpg" 
                alt="Perizat - Kyrgyz Designer" 
                className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-750"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent p-6 flex flex-col justify-end">
                <span className="text-[10px] uppercase tracking-widest font-mono text-sky-300 mb-1">Lead Creative Director</span>
                <h3 className="text-2xl font-bold text-white font-['Space_Grotesk',sans-serif]">Айылчиева Перизат</h3>
                <p className="text-xs text-slate-200 mt-1">"Design is not just visual; it is the silent language of premium craftsmanship."</p>
              </div>
            </div>

            {/* Float tags */}
            <div className="absolute top-8 -left-6 bg-white/95 border border-sky-100 py-2 px-3.5 rounded-lg shadow-md flex items-center space-x-2">
              <Award className="w-4 h-4 text-yellow-500" />
              <span className="text-xs font-semibold text-slate-700">10-Year Master</span>
            </div>

            <div className="absolute bottom-20 -right-6 bg-white/95 border border-sky-100 py-2 px-3.5 rounded-lg shadow-md flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-sky-600" />
              <span className="text-xs font-semibold text-slate-700">IT Club Certified</span>
            </div>
          </div>
        </div>

      </section>

      {/* DETAILED SERVICES SLATE */}
      <section className="bg-white/60 border-y border-sky-100/80 py-16 px-4 sm:px-6 lg:px-8" id="services-section">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {servicesList.map((srv) => (
              <div key={srv.id} className="glass-panel p-8 rounded-2xl border border-sky-100 hover:border-[#72a0f2]/50 hover:shadow-lg hover:shadow-sky-500/5 transition-all group relative overflow-hidden" id={`service-card-${srv.id}`}>
                <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/5 rounded-bl-full pointer-events-none group-hover:bg-[#72a0f2]/10 transition-colors" />
                <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center text-[#72a0f2] mb-6 group-hover:scale-110 transition-transform">
                  {srv.iconName === "Smartphone" && <Smartphone className="w-6 h-6" />}
                  {srv.iconName === "Palette" && <Palette className="w-6 h-6" />}
                  {srv.iconName === "Layers" && <Layers className="w-6 h-6" />}
                </div>
                <h3 className="text-xl font-bold mb-3 font-['Space_Grotesk',sans-serif] text-slate-800 group-hover:text-[#4b82eb] transition-colors">
                  {lang === "ky" ? srv.titleKy : srv.titleRu}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed font-light mb-6">
                  {lang === "ky" ? srv.descriptionKy : srv.descriptionRu}
                </p>
                <div className="flex items-center justify-between border-t border-sky-50 pt-4">
                  <span className="text-xs text-slate-400 tracking-widest uppercase">Est. Investment</span>
                  <span className="text-sm font-semibold text-[#72a0f2] font-mono">{srv.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>      {/* MASTERPIECES SHOWCASE SECTION */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-sky-100/60" id="portfolio-section">
        
        <div className="text-center md:text-left mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6" id="portfolio-header">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-sky-600 font-semibold block mb-2">Selected Works</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-['Space_Grotesk',sans-serif] text-slate-900">
              {translations[lang].viewProject}
            </h2>
          </div>

          {/* Filtering controls */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 bg-white border border-sky-100 p-1.5 rounded-xl shadow-sm" id="portfolio-category-tabs">
            {["All", "UI/UX Design", "Package Design", "Identity"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  selectedCategory === cat 
                    ? "bg-sky-500 text-white shadow-md" 
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {cat === "All" ? currentT.categoryAll : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Bento Grid of masterpieces */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="portfolio-grid">
          {INITIAL_PROJECTS
            .filter(p => selectedCategory === "All" || p.category === selectedCategory)
            .map((proj) => (
              <div 
                key={proj.id} 
                className="glass-panel rounded-2xl overflow-hidden border border-white group cursor-pointer hover:border-sky-300 hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full shadow-sm hover:shadow-md"
                onClick={() => setActiveProject(proj)}
                id={`project-card-${proj.id}`}
              >
                {/* Image frame */}
                <div className="relative aspect-[4/5] bg-sky-50/20 overflow-hidden">
                  <img 
                    src={proj.image} 
                    alt={proj.title} 
                    className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-80" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md border border-sky-100 px-3 py-1 rounded-full text-[10px] font-semibold text-sky-700 uppercase tracking-wider shadow-sm">
                    {proj.category}
                  </div>

                  {/* Date Badge */}
                  <div className="absolute top-4 right-4 bg-sky-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-md font-mono shadow-sm">
                    {proj.date}
                  </div>
                </div>

                {/* Info summary */}
                <div className="p-6 flex-1 flex flex-col justify-between bg-white/50">
                  <div>
                    <h3 className="text-xl font-bold font-['Space_Grotesk',sans-serif] text-slate-800 group-hover:text-sky-600 transition-colors mb-2">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed font-light mb-4">
                      {lang === "ky" ? proj.descriptionKy : proj.descriptionRu}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-sky-100">
                    {proj.tags.map(t => (
                      <span key={t} className="text-[10px] font-mono text-sky-700 bg-sky-50 border border-sky-100 px-2 py-0.5 rounded">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* PORTFOLIO SPECIFICATIONS DETAIL MODAL */}
      {activeProject && (
        <div className="fixed inset-0 z-50 bg-[#0c4a6e]/40 backdrop-blur-xl flex items-center justify-center p-4 overflow-y-auto" id="portfolio-modal">
          <div className="bg-white/95 border border-sky-100 rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-fade-in" id="modal-container">
            
            <button 
              onClick={() => setActiveProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-white border border-sky-100 text-slate-400 hover:text-slate-800 transition-colors z-10 shadow-sm cursor-pointer"
              id="close-modal-btn"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col lg:flex-row">
              {/* Product Layout Image */}
              <div className="lg:w-1/2 bg-sky-50/40 flex items-center justify-center">
                <img 
                  src={activeProject.image} 
                  alt={activeProject.title} 
                  className="w-full h-auto object-cover max-h-[80vh] lg:max-h-[90vh]"
                />
              </div>

              {/* Product Layout Details Info */}
              <div className="lg:w-1/2 p-8 sm:p-12 space-y-8 flex flex-col justify-between">
                
                <div className="space-y-6">
                  <div className="inline-block bg-sky-50 border border-sky-100 px-3 py-1 rounded-full text-xs font-semibold text-sky-600 uppercase tracking-widest">
                    {activeProject.category}
                  </div>

                  <h2 className="text-3xl font-extrabold font-['Space_Grotesk',sans-serif] text-slate-900">
                    {activeProject.title}
                  </h2>

                  <p className="text-sm text-slate-600 leading-relaxed font-light">
                    {lang === "ky" ? activeProject.descriptionKy : activeProject.descriptionRu}
                  </p>

                  <div className="border-t border-sky-100 pt-6 space-y-4">
                    <h4 className="text-xs uppercase tracking-widest text-sky-600 font-semibold font-mono">
                      {currentT.detailsLabel}
                    </h4>
                    
                    <div className="grid grid-cols-2 gap-4 text-xs font-light text-slate-600">
                      <div>
                        <span className="block text-slate-400">{currentT.clientLabel}</span>
                        <span className="block font-semibold text-slate-800 mt-0.5">{activeProject.client || "Self-Initiated Study"}</span>
                      </div>
                      <div>
                        <span className="block text-slate-400">{currentT.dateLabel}</span>
                        <span className="block font-semibold text-slate-800 mt-0.5">{activeProject.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {activeProject.tags.map(t => (
                      <span key={t} className="text-xs font-mono text-sky-700 bg-sky-50/50 border border-sky-100 px-3 py-1 rounded-full">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-8 border-t border-sky-100 flex flex-wrap gap-4">
                  <button 
                    onClick={() => {
                      setBriefType(activeProject.category === "UI/UX Design" ? "UI/UX Design" : activeProject.category === "Package Design" ? "Cosmetics Packaging" : "Brand Identity");
                      setBriefDesc(`Discussing concept similar to ${activeProject.title}`);
                      const el = document.getElementById("brief-section");
                      el?.scrollIntoView({ behavior: "smooth" });
                      setActiveProject(null);
                    }}
                    className="flex-1 px-5 py-3.5 rounded-xl bg-gradient-to-r from-sky-400 to-sky-600 text-white font-bold hover:shadow-lg hover:shadow-sky-500/15 transition-all text-center text-sm cursor-pointer"
                  >
                    Discuss Similar Project
                  </button>
                  <a 
                    href={`https://wa.me/996700123456?text=${encodeURIComponent(`Здравствуйте Перизат! Меня заинтересовал ваш проект ${activeProject.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3.5 rounded-xl bg-white border border-sky-100 text-slate-700 hover:bg-sky-50 transition-colors text-sm text-center font-semibold"
                  >
                    Direct Chat
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>
      )}

      {/* 10 YEAR JOURNEY & OFFICIAL CREDENTIALS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-sky-100 bg-sky-50/20" id="about-section">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Left: Biography details */}
            <div className="lg:col-span-5 space-y-6" id="about-intro">
              <span className="text-xs font-mono uppercase tracking-widest text-sky-600 font-semibold block">Designer Persona</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-['Space_Grotesk',sans-serif] text-slate-900">
                {currentT.philosophyTitle}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light">
                {currentT.philosophyText}
              </p>

              {/* Timeline Items */}
              <div className="space-y-6 pt-4">
                <div className="flex space-x-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3.5 h-3.5 rounded-full bg-sky-500 border border-sky-100 shadow-sm" />
                    <div className="w-px flex-1 bg-sky-100 my-1" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-sky-600 font-bold">2021 — PRESENT</span>
                    <h4 className="text-sm font-bold text-slate-800 mt-1">Lead Creative Architect (Remote Freelance)</h4>
                    <p className="text-xs text-slate-600 mt-1">Directing high-fashion editorial projects, custom cosmetics label systems, and SaaS dashboards.</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3.5 h-3.5 rounded-full bg-sky-400 border border-sky-100 shadow-sm" />
                    <div className="w-px flex-1 bg-sky-100 my-1" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-sky-500 font-bold">2016 — 2021</span>
                    <h4 className="text-sm font-bold text-slate-800 mt-1">Senior Identity Designer</h4>
                    <p className="text-xs text-slate-600 mt-1">Forging premium retail packaging, custom logos, typography standards, and corporate guidelines.</p>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3.5 h-3.5 rounded-full bg-sky-300 border border-sky-100 shadow-sm" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 font-bold">2014 — 2016</span>
                    <h4 className="text-sm font-bold text-slate-800 mt-1">Junior Graphic Layout Specialist</h4>
                    <p className="text-xs text-slate-600 mt-1">Mastering pixel-perfect typography, vector assets, layouts, and print workflows.</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right: Certified Badges Display */}
            <div className="lg:col-span-7 space-y-8" id="about-certs">
              <div>
                <h3 className="text-2xl font-bold font-['Space_Grotesk',sans-serif] text-slate-900">
                  {currentT.certTitle}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {currentT.certSubtitle}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {INITIAL_CERTIFICATES.map((cert) => (
                  <div key={cert.id} className="glass-panel p-6 rounded-2xl relative overflow-hidden group border border-white bg-white/70 shadow-sm hover:border-sky-200 transition-all duration-300">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-tr from-sky-500/5 to-blue-500/5 rounded-bl-3xl pointer-events-none" />
                    
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600 border border-sky-100">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-bold text-sky-600 block tracking-widest uppercase">{cert.institution}</span>
                        <span className="text-xs text-slate-400 block">{cert.date}</span>
                      </div>
                    </div>

                    <h4 className="text-base font-bold text-slate-800 font-['Space_Grotesk',sans-serif] leading-snug">
                      {lang === "ky" ? cert.titleKy : cert.titleRu}
                    </h4>

                    {/* Official Verified Label */}
                    <div className="mt-4 flex items-center space-x-1.5 text-xs text-emerald-700 font-semibold bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-md w-fit shadow-sm">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Verified Graduate</span>
                    </div>

                    <div className="mt-4 pt-4 border-t border-sky-100 flex flex-wrap gap-1">
                      {cert.skills.map(sk => (
                        <span key={sk} className="text-[9px] font-mono bg-sky-50/50 text-sky-700 px-2 py-0.5 rounded border border-sky-100">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Verified Badge callout */}
              <div className="p-4 bg-sky-50 border border-sky-100 rounded-xl flex items-start space-x-3 shadow-sm">
                <Info className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" />
                <p className="text-xs text-sky-800 leading-relaxed font-light">
                  <strong className="font-semibold text-slate-900"> Kyrgyz Artistry Certified:</strong> Both professional certificates issued directly to <strong className="font-semibold text-slate-900">Айылчиева Перизат Талантовна</strong> confirming expert command of commercial design suites, advanced Figma prototyping, vector art creation, and spatial design.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* INTERACTIVE PROJECT BRIEF BUILDER LAB */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-sky-100/60" id="brief-section">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4" id="brief-header">
          <span className="text-xs font-mono uppercase tracking-widest text-sky-600 font-semibold block">Co-Creation Lab</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-['Space_Grotesk',sans-serif] text-slate-900">
            {currentT.briefTitle}
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed font-light">
            {currentT.briefSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="brief-grid">
          
          {/* Left Column: Requirements Entry Form */}
          <div className="lg:col-span-7 bg-white/70 border border-sky-100 p-8 sm:p-10 rounded-3xl space-y-8 shadow-lg shadow-sky-950/5 backdrop-blur-md" id="brief-form">
            
            {/* Step 1: Type Selection */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-700 flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                <span>{currentT.briefType}</span>
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: "UI/UX Design", icon: Smartphone },
                  { value: "Cosmetics Packaging", icon: Layers },
                  { value: "Brand Identity", icon: Palette },
                  { value: "Editorial Layout", icon: FileText }
                ].map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setBriefType(opt.value)}
                    className={`p-4 rounded-xl border text-left transition-all flex items-center space-x-3 cursor-pointer ${
                      briefType === opt.value 
                        ? "bg-sky-50 border-sky-300 text-sky-700 shadow-sm" 
                        : "bg-white border-sky-100 text-slate-600 hover:text-slate-900 hover:bg-sky-50/20"
                    }`}
                  >
                    <opt.icon className={`w-4 h-4 ${briefType === opt.value ? 'text-sky-600' : 'text-slate-400'}`} />
                    <span className="text-xs font-semibold">{opt.value}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Description Textarea */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-700 flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                <span>{currentT.briefDesc}</span>
              </label>
              <textarea
                value={briefDesc}
                onChange={(e) => setBriefDesc(e.target.value)}
                rows={4}
                placeholder={lang === "ky" ? "Мисалы: Жаңы табигый косметика бренди үчүн сырткы таңгак жана веб-сайт дизайны керек..." : "Например: Нужен современный дизайн упаковки премиум-линейки кремов с нежно-голубыми элементами..."}
                className="w-full rounded-xl bg-sky-50/40 border border-sky-100 p-4 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-300 focus:bg-white transition-all shadow-inner"
              />
            </div>

            {/* Step 3: Budget Options */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-700 flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                <span>{currentT.briefBudget}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {["$500 - $1,500", "$1,500 - $5,000", "$5,000+"].map(tier => (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setBriefBudget(tier)}
                    className={`px-4 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                      briefBudget === tier 
                        ? "bg-sky-500 text-white border-sky-500 shadow-md" 
                        : "bg-white border-sky-100 text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    {tier}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Visual Mood Tags */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-700 flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                <span>{currentT.briefStyle}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {["Minimalist", "High-Fashion Editorial", "Futuristic Blue", "Glassmorphism Glow", "Organic/Botanical", "Warm Corporate"].map(tag => {
                  const isActive = selectedStyles.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleToggleStyle(tag)}
                      className={`px-3 py-1.5 text-xs rounded-full border transition-all flex items-center space-x-1.5 cursor-pointer ${
                        isActive 
                          ? "bg-sky-50 border-sky-300 text-sky-700 font-semibold shadow-sm" 
                          : "bg-white border-sky-100 text-slate-500 hover:text-slate-800 hover:bg-sky-50/10"
                      }`}
                    >
                      <span>{tag}</span>
                      {isActive && <CheckCircle className="w-3.5 h-3.5 text-sky-500" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit call to action */}
            <button
              onClick={generateAiBriefRecommendation}
              disabled={isGeneratingBrief || !briefDesc.trim()}
              className="w-full py-4 rounded-xl font-bold text-xs bg-gradient-to-r from-sky-400 to-sky-600 text-white hover:shadow-lg hover:shadow-sky-500/15 disabled:opacity-50 transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-md"
            >
              <Sparkles className="w-4 h-4 text-white animate-spin" style={{ animationDuration: isGeneratingBrief ? "2s" : "0s" }} />
              <span>{isGeneratingBrief ? currentT.briefGenerating : currentT.briefSubmit}</span>
            </button>

          </div>

          {/* Right Column: Dynamic Gemini Recommendation panel */}
          <div className="lg:col-span-5 space-y-6" id="brief-ai-results">
            {aiSuggestions ? (
              <div className="bg-white/80 border-2 border-sky-100/80 p-8 rounded-3xl space-y-6 relative overflow-hidden shadow-lg shadow-sky-950/5 backdrop-blur-md animate-fade-in">
                
                {/* Visual glow indicator */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-sky-50 rounded-bl-3xl flex items-center justify-center border-l border-b border-sky-100">
                  <Sparkles className="w-5 h-5 text-sky-500" />
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-mono tracking-widest text-sky-600 font-bold uppercase block">Gemini Recommendation</span>
                  <h3 className="text-xl font-bold text-slate-900 font-['Space_Grotesk',sans-serif]">AI-Assisted Direction</h3>
                </div>

                {/* Theme Palette display */}
                <div className="space-y-2">
                  <span className="text-xs text-slate-500 font-medium block">{currentT.briefPalette}:</span>
                  <div className="flex items-center space-x-3">
                    {aiSuggestions.suggestedPalette.map((col) => (
                      <div key={col} className="flex flex-col items-center space-y-1">
                        <div 
                          className="w-10 h-10 rounded-full border border-sky-100 shadow-sm flex items-center justify-center" 
                          style={{ backgroundColor: col }}
                        />
                        <span className="text-[9px] font-mono text-slate-400">{col}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Keywords tags */}
                <div className="space-y-2">
                  <span className="text-xs text-slate-500 font-medium block">{currentT.briefKeywords}:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {aiSuggestions.styleKeywords.map(tag => (
                      <span key={tag} className="text-xs font-semibold px-2.5 py-1 rounded bg-sky-50 text-sky-700 border border-sky-100">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Suggested actions list */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs text-slate-500 font-medium block">{currentT.briefIdeas}:</span>
                  <ul className="space-y-3">
                    {aiSuggestions.ideas.map((idea, i) => (
                      <li key={i} className="flex items-start space-x-2.5 text-xs text-slate-600 font-light leading-relaxed">
                        <span className="w-5 h-5 rounded-full bg-sky-50 flex items-center justify-center text-sky-600 font-semibold flex-shrink-0 border border-sky-100 font-mono">
                          {i + 1}
                        </span>
                        <span>{idea}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-sky-100 space-y-3">
                  <button
                    onClick={() => {
                      const msg = `Hi Alina! I generated a custom AI brief for a ${briefType} project. Description: "${briefDesc}". Gemini suggested these visual tags: ${aiSuggestions.styleKeywords.join(", ")}. Let's refine this direction!`;
                      sendChatMessage(msg);
                      const el = document.getElementById("assistant-section");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full py-3 rounded-xl bg-sky-500 text-white font-bold text-xs hover:bg-sky-600 transition-colors flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4 text-white" />
                    <span>{currentT.briefDiscuss}</span>
                  </button>

                  <button
                    onClick={shareBriefOnWhatsApp}
                    className="w-full py-3 rounded-xl bg-white border border-sky-100 text-slate-700 text-xs font-semibold hover:bg-sky-50 transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
                  >
                    <Send className="w-4 h-4 text-emerald-500" />
                    <span>{currentT.briefWhatsApp}</span>
                  </button>
                </div>

              </div>
            ) : (
              <div className="bg-white/50 border border-sky-100 p-8 rounded-3xl space-y-6 text-center text-slate-500 shadow-sm backdrop-blur-sm">
                <div className="w-12 h-12 rounded-full bg-sky-50 border border-sky-100 flex items-center justify-center mx-auto text-sky-500">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-slate-800 text-sm">Waiting for Brand Criteria</h4>
                  <p className="text-xs font-light text-slate-500 leading-relaxed">Input your project concept on the left, click Generate, and Gemini will instantly build a custom aesthetic direction board for you.</p>
                </div>
              </div>
            )}
          </div>

        </div>

      </section>

      {/* CHAT WITH ALINA — AI STUDIO ASSISTANT */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-t border-sky-100/60 bg-sky-50/20" id="assistant-section">
        <div className="max-w-7xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Left Col: Explainer about Perizat's virtual studio */}
            <div className="lg:col-span-4 flex flex-col justify-between py-2 space-y-8" id="assistant-intro">
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-sky-600 font-semibold block">Virtual Consultation</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold font-['Space_Grotesk',sans-serif] text-slate-900">
                  {currentT.chatTitle}
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed font-light">
                  {currentT.chatSubtitle}
                </p>
              </div>

              {/* Quick Suggest buttons */}
              <div className="space-y-2.5">
                <span className="text-xs text-slate-500 font-medium block">Quick Inquiries:</span>
                {[
                  currentT.chatQuickReply1,
                  currentT.chatQuickReply2,
                  currentT.chatQuickReply3
                ].map((q) => (
                  <button
                    key={q}
                    onClick={() => sendChatMessage(q)}
                    className="w-full text-left p-3.5 rounded-xl bg-white hover:bg-sky-50/20 text-xs text-slate-700 border border-sky-100 transition-colors flex items-center justify-between group cursor-pointer shadow-sm"
                  >
                    <span className="line-clamp-1">{q}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-sky-600 transition-colors" />
                  </button>
                ))}
              </div>

              {/* Direct WhatsApp Callout */}
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-between shadow-sm">
                <div className="flex items-center space-x-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-semibold text-emerald-800">WhatsApp Hotlink</span>
                </div>
                <a 
                  href="https://wa.me/996700123456" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-700 underline hover:text-emerald-900 transition-colors font-semibold"
                >
                  Message Directly
                </a>
              </div>

            </div>

            {/* Right Col: Highly Functional Beautiful Chat Container */}
            <div className="lg:col-span-8 bg-white/90 border border-sky-100 rounded-3xl flex flex-col overflow-hidden min-h-[500px] shadow-xl shadow-sky-950/5 backdrop-blur-md" id="chat-container">
              
              {/* Header profile of assistant */}
              <div className="p-4 bg-sky-50/50 border-b border-sky-100 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-sky-700 border border-sky-200 font-bold text-sm">
                      AL
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 flex items-center space-x-1.5">
                      <span>Alina</span>
                      <span className="text-[9px] font-mono tracking-widest bg-sky-50 text-sky-600 px-1.5 py-0.5 rounded uppercase">Studio AI</span>
                    </h4>
                    <span className="text-[10px] text-slate-500">Co-Creative Consultant</span>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 font-mono">
                  Active
                </div>
              </div>

              {/* Message scroll panel */}
              <div className="flex-1 p-6 space-y-4 overflow-y-auto max-h-[350px]">
                {chatMessages.map((msg) => {
                  const isUser = msg.role === "user";
                  return (
                    <div 
                      key={msg.id} 
                      className={`flex ${isUser ? "justify-end" : "justify-start"} items-end space-x-2`}
                    >
                      {!isUser && (
                        <div className="w-6 h-6 rounded-full bg-sky-50 flex items-center justify-center text-[10px] text-sky-600 border border-sky-100 font-bold flex-shrink-0">
                          AI
                        </div>
                      )}
                      
                      <div className={`max-w-[80%] rounded-2xl p-4 text-xs leading-relaxed ${
                        isUser 
                          ? "bg-gradient-to-r from-sky-400 to-sky-600 text-white rounded-br-none shadow-sm font-medium" 
                          : "bg-sky-50 text-slate-800 border border-sky-100/80 rounded-bl-none"
                      }`}>
                        <p className="whitespace-pre-line">{msg.text}</p>
                        <span className={`block text-[8px] text-right mt-1 ${isUser ? "text-sky-100" : "text-slate-400"}`}>
                          {msg.timestamp}
                        </span>
                      </div>
                    </div>
                  );
                })}
                {isChatLoading && (
                  <div className="flex justify-start items-center space-x-2">
                    <div className="w-6 h-6 rounded-full bg-sky-50 flex items-center justify-center text-[10px] text-sky-600 border border-sky-100 font-bold flex-shrink-0">
                      AI
                    </div>
                    <div className="bg-sky-50 border border-sky-100/80 rounded-2xl rounded-bl-none p-3.5 flex items-center space-x-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                )}
                <div ref={chatBottomRef} />
              </div>

              {/* Footer text field */}
              <div className="p-4 bg-sky-50/50 border-t border-sky-100 flex items-center space-x-3">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") sendChatMessage(); }}
                  placeholder={currentT.chatInputPlaceholder}
                  className="flex-1 rounded-xl bg-white border border-sky-100 p-3 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-sky-300 focus:bg-white transition-all shadow-inner"
                />
                <button
                  onClick={() => sendChatMessage()}
                  disabled={isChatLoading || !chatInput.trim()}
                  className="p-3 rounded-xl bg-gradient-to-r from-sky-400 to-sky-600 hover:shadow-lg hover:shadow-sky-500/15 text-white font-bold disabled:opacity-40 transition-colors cursor-pointer"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* FOOTER & CALL TO ACTION */}
      <footer className="bg-sky-50/40 border-t border-sky-100/60 pt-20 pb-12 px-4 sm:px-6 lg:px-8" id="footer-section">
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-sky-100">
          
          {/* Main heading column */}
          <div className="lg:col-span-6 space-y-6" id="footer-pitch">
            <h2 className="text-3xl sm:text-4xl font-extrabold font-['Space_Grotesk',sans-serif] text-slate-900 bg-gradient-to-r from-sky-600 to-sky-900 bg-clip-text text-transparent">
              {currentT.footerHeading}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-light max-w-xl">
              {currentT.footerText}
            </p>
          </div>

          {/* Social connections & actions */}
          <div className="lg:col-span-6 space-y-8 flex flex-col justify-between items-start lg:items-end">
            
            <div className="space-y-3 w-full max-w-md">
              <span className="text-xs uppercase tracking-widest text-slate-400 font-mono font-semibold block lg:text-right">
                {currentT.footerSocials}
              </span>
              
              <div className="grid grid-cols-2 gap-3">
                <a 
                  href="https://wa.me/996700123456" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 p-3 rounded-xl bg-white hover:bg-sky-50/50 border border-sky-100 text-xs font-semibold text-slate-700 transition-all cursor-pointer shadow-sm"
                >
                  <Send className="w-4 h-4 text-emerald-500" />
                  <span>{currentT.footerWhatsAppMsg}</span>
                </a>
                
                <a 
                  href="https://instagram.com/designer_perima" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 p-3 rounded-xl bg-white hover:bg-sky-50/50 border border-sky-100 text-xs font-semibold text-slate-700 transition-all cursor-pointer shadow-sm"
                >
                  <Instagram className="w-4 h-4 text-pink-500" />
                  <span>{currentT.footerInstagramMsg}</span>
                </a>
              </div>
            </div>

            <div className="text-xs text-slate-500 font-mono tracking-tight animate-pulse" id="footer-legal">
              © 2026 Perizat Ayilchieva. All rights preserved. Designed with premium meticulousness.
            </div>

          </div>

        </div>

        {/* Small branding text footer */}
        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-sky-500 animate-ping" />
            <span>Operational Worldwide | Remote Digital Agency Partner</span>
          </div>
          <div>
            10 Years Experience Portfolio • Built via Google AI Studio
          </div>
        </div>

      </footer>

    </div>
  );
}
