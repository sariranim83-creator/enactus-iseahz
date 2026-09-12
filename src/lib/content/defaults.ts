import type { SiteContent } from "@/types/content";

/**
 * Bundled fallback content. This is what renders if Supabase is not yet
 * configured (no env vars) or a table is empty, so the site is never broken
 * during setup. Once Supabase is connected, the admin dashboard becomes the
 * source of truth and this file is only a safety net.
 */
export const defaultContent: SiteContent = {
  general: {
    clubName: "Enactus ISEAHZ",
    institutionName: {
      en: "Higher Institute of Applied Studies in Humanities of Zaghouan (ISEAHZ)",
      fr: "Institut Supérieur des Études Appliquées en Humanités de Zaghouan (ISEAHZ)",
    },
    location: "Zaghouan, Tunisia",
    logoUrl: null,
    faviconUrl: null,
    siteTitle: {
      en: "Enactus ISEAHZ | Young Leaders Creating Sustainable Impact",
      fr: "Enactus ISEAHZ | De jeunes leaders qui créent un impact durable",
    },
    siteDescription: {
      en: "Enactus ISEAHZ is a student-led community at the Higher Institute of Applied Studies in Humanities of Zaghouan, empowering young leaders through entrepreneurship, sustainability, communication and experiential learning.",
      fr: "Enactus ISEAHZ est une communauté étudiante de l'Institut Supérieur des Études Appliquées en Humanités de Zaghouan, qui forme de jeunes leaders à travers l'entrepreneuriat, la durabilité, la communication et l'apprentissage par l'action.",
    },
  },
  hero: {
    headline: {
      en: "Young leaders creating sustainable impact.",
      fr: "De jeunes leaders qui créent un impact durable.",
    },
    subheadline: { en: "ENACTUS ISEAHZ", fr: "ENACTUS ISEAHZ" },
    description: {
      en: "At the Higher Institute of Applied Studies in Humanities of Zaghouan, we bring students together to develop entrepreneurial skills, grow as leaders, and turn ideas into meaningful action for our communities.",
      fr: "À l'Institut Supérieur des Études Appliquées en Humanités de Zaghouan, nous réunissons des étudiants pour développer des compétences entrepreneuriales, grandir en tant que leaders et transformer des idées en actions concrètes pour nos communautés.",
    },
    primaryCtaLabel: { en: "Discover Enactus ISEAHZ", fr: "Découvrir Enactus ISEAHZ" },
    secondaryCtaLabel: { en: "Become a Member", fr: "Devenir membre" },
    recruitmentUrl: null,
  },
  vision: {
    year: "2026–2027",
    ambitionStatement: {
      en: "Build boldly. Lead responsibly. Create impact that lasts.",
      fr: "Construire avec audace. Diriger avec responsabilité. Créer un impact durable.",
    },
    annualVision: {
      en: "Empowering young leaders to turn learning into action, business skills into opportunity, and sustainability into everyday practice — while building a team ambitious enough to compete and grounded enough to create real local impact.",
      fr: "Donner aux jeunes leaders les moyens de transformer l'apprentissage en action, les compétences entrepreneuriales en opportunités, et la durabilité en pratique quotidienne — tout en construisant une équipe assez ambitieuse pour concourir et assez ancrée pour créer un véritable impact local.",
    },
  },
  about: {
    intro: {
      en: "Enactus ISEAHZ is a student-led community at ISEAHZ in Zaghouan. We are students who believe that leadership is learned by doing, and that the best ideas are the ones put into action.",
      fr: "Enactus ISEAHZ est une communauté étudiante de l'ISEAHZ, à Zaghouan. Nous croyons que le leadership s'apprend en agissant, et que les meilleures idées sont celles que l'on met en pratique.",
    },
    mission: {
      en: "Our mission is to create sustainable solutions for local issues while developing the next generation of student entrepreneurs.",
      fr: "Notre mission est de créer des solutions durables aux enjeux locaux tout en formant la prochaine génération d'étudiants entrepreneurs.",
    },
    values: {
      en: "We combine entrepreneurship, business skills, communication, sustainability, leadership, experiential learning, teamwork and community impact — not as separate activities, but as one way of working together.",
      fr: "Nous combinons entrepreneuriat, compétences entrepreneuriales, communication, durabilité, leadership, apprentissage par l'action, esprit d'équipe et impact communautaire — non pas comme des activités séparées, mais comme une seule et même manière de travailler ensemble.",
    },
    actionWords: ["LEARN", "BUILD", "LEAD", "CONNECT", "COMPETE", "CREATE IMPACT"],
  },
  enactusExplainer: {
    entrepreneurial: {
      en: "Igniting business innovation with integrity and passion.",
      fr: "Susciter l'innovation entrepreneuriale avec intégrité et passion.",
    },
    action: {
      en: "The experience of social impact that sparks social enterprise.",
      fr: "L'expérience de l'impact social qui donne naissance à l'entreprise sociale.",
    },
    us: {
      en: "Student, academic and business leaders collaborating to create a better world.",
      fr: "Des leaders étudiants, académiques et professionnels qui collaborent pour créer un monde meilleur.",
    },
    globalPurpose: {
      en: "Enactus is a global network of leaders committed to using business as a catalyst for positive social and environmental impact. It educates, inspires and supports young people to use innovation and entrepreneurship to solve major problems.",
      fr: "Enactus est un réseau mondial de leaders engagés à utiliser l'entreprise comme catalyseur d'un impact social et environnemental positif. Le réseau forme, inspire et accompagne les jeunes pour qu'ils utilisent l'innovation et l'entrepreneuriat afin de résoudre des problèmes majeurs.",
    },
    referenceUrl: "https://enactus.org/",
  },
  whyJoin: [
    {
      order: 1,
      number: "01",
      title: { en: "Professional Growth", fr: "Développement professionnel" },
      description: {
        en: "Build communication, teamwork, leadership and business skills.",
        fr: "Développer des compétences en communication, en travail d'équipe, en leadership et en gestion.",
      },
    },
    {
      order: 2,
      number: "02",
      title: { en: "Business English", fr: "Anglais professionnel" },
      description: {
        en: "Create opportunities for students to practice professional English in real situations.",
        fr: "Créer des occasions pour les étudiants de pratiquer l'anglais professionnel dans des situations réelles.",
      },
    },
    {
      order: 3,
      number: "03",
      title: { en: "Communication", fr: "Communication" },
      description: {
        en: "Develop confidence in speaking, presenting, networking and collaborating.",
        fr: "Gagner en confiance pour parler en public, présenter, réseauter et collaborer.",
      },
    },
    {
      order: 4,
      number: "04",
      title: { en: "Entrepreneurship", fr: "Entrepreneuriat" },
      description: {
        en: "Learn to think entrepreneurially and turn problems into opportunities.",
        fr: "Apprendre à penser en entrepreneur et à transformer les problèmes en opportunités.",
      },
    },
    {
      order: 5,
      number: "05",
      title: { en: "Sustainability", fr: "Durabilité" },
      description: {
        en: "Understand how sustainability connects to education, business and community development.",
        fr: "Comprendre le lien entre durabilité, éducation, entrepreneuriat et développement communautaire.",
      },
    },
    {
      order: 6,
      number: "06",
      title: { en: "Team Culture", fr: "Culture d'équipe" },
      description: {
        en: "Create a supportive, fun environment where students feel they belong.",
        fr: "Créer un environnement bienveillant et convivial où chaque étudiant se sent à sa place.",
      },
    },
    {
      order: 7,
      number: "07",
      title: { en: "Competition", fr: "Compétition" },
      description: {
        en: "Prepare seriously and professionally for Enactus Tunisia's National Competition.",
        fr: "Se préparer sérieusement et professionnellement pour la Compétition Nationale Enactus Tunisie.",
      },
    },
    {
      order: 8,
      number: "08",
      title: { en: "Your CV", fr: "Votre CV" },
      description: {
        en: "Gain real experiences, responsibilities, teamwork and leadership experiences that can strengthen your professional profile.",
        fr: "Acquérir de vraies expériences — responsabilités, travail d'équipe, leadership — qui viennent renforcer votre profil professionnel.",
      },
    },
  ],
  culture: {
    headline: {
      en: "Grow together. Have fun. Build something meaningful.",
      fr: "Grandir ensemble. S'amuser. Construire quelque chose qui compte.",
    },
    description: {
      en: "Enactus ISEAHZ is serious about impact — without being boring about it. This year we're building our team culture: welcome rituals, monthly team moments, celebrations and learning sessions that will grow throughout the year.",
      fr: "Enactus ISEAHZ prend l'impact au sérieux — sans jamais se prendre trop au sérieux. Cette année, nous construisons notre culture d'équipe : rituels d'accueil, moments d'équipe mensuels, célébrations et sessions d'apprentissage qui évolueront tout au long de l'année.",
    },
    ritualPlaceholders: [
      { en: "Team traditions", fr: "Traditions d'équipe" },
      { en: "Welcome rituals", fr: "Rituels d'accueil" },
      { en: "Monthly team moments", fr: "Moments d'équipe mensuels" },
      { en: "Celebrations", fr: "Célébrations" },
      { en: "Learning sessions", fr: "Sessions d'apprentissage" },
      { en: "Team challenges", fr: "Défis d'équipe" },
    ],
  },
  stats: [
    { id: "s1", category: "club", value: "100+", label: { en: "Students", fr: "Étudiants" }, visible: true, order: 1 },
    { id: "s2", category: "club", value: "3", label: { en: "Certified Workshops", fr: "Ateliers certifiés" }, visible: true, order: 2 },
    { id: "s3", category: "club", value: "10+", label: { en: "Events Organized", fr: "Événements organisés" }, visible: true, order: 3 },
    { id: "s4", category: "network", value: "33", label: { en: "Countries", fr: "Pays" }, visible: true, order: 4 },
    { id: "s5", category: "network", value: "92", label: { en: "Teams Across Tunisia", fr: "Équipes à travers la Tunisie" }, visible: true, order: 5 },
  ],
  sdgs: [
    {
      id: "sdg4",
      number: 4,
      name: { en: "Quality Education", fr: "Éducation de qualité" },
      description: {
        en: "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.",
        fr: "Assurer l'accès de tous à une éducation de qualité, équitable et inclusive, et promouvoir des possibilités d'apprentissage tout au long de la vie.",
      },
      whyItMatters: {
        en: "As future educators, quality education is at the heart of who we are and what we build together.",
        fr: "En tant que futurs éducateurs, l'éducation de qualité est au cœur de ce que nous sommes et de ce que nous construisons ensemble.",
      },
      iconUrl: null,
      slot: "primary",
      order: 1,
    },
    {
      id: "sdg5",
      number: 5,
      name: { en: "Gender Equality", fr: "Égalité entre les sexes" },
      description: {
        en: "Achieve gender equality and empower all women and girls.",
        fr: "Parvenir à l'égalité des sexes et autonomiser toutes les femmes et les filles.",
      },
      whyItMatters: {
        en: "We believe leadership opportunities and student entrepreneurship should be open and accessible to everyone, equally.",
        fr: "Nous croyons que les opportunités de leadership et d'entrepreneuriat étudiant doivent être ouvertes et accessibles à tous, à égalité.",
      },
      iconUrl: null,
      slot: "supporting",
      order: 2,
    },
    {
      id: "sdg10",
      number: 10,
      name: { en: "Reduced Inequalities", fr: "Inégalités réduites" },
      description: {
        en: "Reduce inequality within and among countries.",
        fr: "Réduire les inégalités dans les pays et d'un pays à l'autre.",
      },
      whyItMatters: {
        en: "Local impact means making sure opportunities for growth and learning reach students across our community, not just a few.",
        fr: "L'impact local, c'est veiller à ce que les opportunités de croissance et d'apprentissage profitent à tous les étudiants de notre communauté, et non à une minorité.",
      },
      iconUrl: null,
      slot: "supporting",
      order: 3,
    },
    {
      id: "sdg16",
      number: 16,
      name: { en: "Peace, Justice and Strong Institutions", fr: "Paix, justice et institutions efficaces" },
      description: {
        en: "Promote peaceful and inclusive societies, provide access to justice for all and build effective, accountable institutions.",
        fr: "Promouvoir l'avènement de sociétés pacifiques et inclusives, assurer l'accès de tous à la justice et mettre en place des institutions efficaces, responsables et ouvertes à tous.",
      },
      whyItMatters: {
        en: "We're building a club with strong governance and accountability — modelling the kind of institutions we want to contribute to.",
        fr: "Nous construisons un club fondé sur une gouvernance solide et la responsabilité — à l'image des institutions auxquelles nous voulons contribuer.",
      },
      iconUrl: null,
      slot: "supporting",
      order: 4,
    },
  ],
  localImpact: {
    headline: { en: "Our impact starts locally.", fr: "Notre impact commence localement." },
    description: {
      en: "Based in Zaghouan, Enactus ISEAHZ connects student learning with the needs, opportunities and realities of our local community.",
      fr: "Basé à Zaghouan, Enactus ISEAHZ relie l'apprentissage étudiant aux besoins, aux opportunités et aux réalités de notre communauté locale.",
    },
  },
  competition: {
    headline: { en: "Built to compete. Driven to impact.", fr: "Bâtis pour concourir. Animés par l'impact." },
    intro: {
      en: "Enactus national competitions give student teams the opportunity to showcase their entrepreneurial action and impact. Competition helps spur innovation, and national champion teams advance to the Enactus World Cup.",
      fr: "Les compétitions nationales Enactus donnent aux équipes étudiantes l'occasion de présenter leurs actions entrepreneuriales et leur impact. La compétition stimule l'innovation, et les équipes championnes nationales accèdent à la Enactus World Cup.",
    },
    ambitionStatement: {
      en: "This year, we are raising our standards — strengthening our team, developing our skills, documenting our growth and preparing to compete with purpose.",
      fr: "Cette année, nous élevons nos standards — en renforçant notre équipe, en développant nos compétences, en documentant notre progression et en nous préparant à concourir avec ambition.",
    },
    referenceUrl: "https://enactus.org/competitions/",
  },
  competitionPhotos: [],
  team: [
    {
      id: "ranim-sari",
      name: "Ranim Sari",
      position: { en: "Team Leader", fr: "Cheffe d'équipe" },
      photoUrl: null,
      bio: {
        en: "Team Leader of Enactus ISEAHZ and a third-year Bachelor of Education student at ISEAHZ. A Certified UPG Sustainability Leader, she leads the club's social entrepreneurship initiatives and its current community-focused work in the Zaghouan region, bringing a strong grounding in sustainable development practice to the team's mission.",
        fr: "Cheffe d'équipe d'Enactus ISEAHZ et étudiante en troisième année de Licence en Éducation à l'ISEAHZ. Certifiée UPG Sustainability Leader, elle dirige les initiatives d'entrepreneuriat social du club ainsi que son travail actuel axé sur la communauté dans la région de Zaghouan, apportant à la mission de l'équipe une solide expérience en développement durable.",
      },
      socialLinks: {},
      order: 1,
      active: true,
    },
  ],
  events: [],
  gallery: [],
  social: {
    instagram: null,
    facebook: "https://www.facebook.com/217167498152861",
    tiktok: null,
    linkedin: null,
  },
  contact: {
    email: "contact@enactusiseahz.tn",
    location: "Higher Institute of Applied Studies in Humanities of Zaghouan, Zaghouan, Tunisia",
  },
  partners: [],
  seo: {
    pageTitle: {
      en: "Enactus ISEAHZ | Young Leaders Creating Sustainable Impact",
      fr: "Enactus ISEAHZ | De jeunes leaders qui créent un impact durable",
    },
    metaDescription: {
      en: "Enactus ISEAHZ is a student-led community at the Higher Institute of Applied Studies in Humanities of Zaghouan, empowering young leaders through entrepreneurship, sustainability, communication and experiential learning.",
      fr: "Enactus ISEAHZ est une communauté étudiante de l'Institut Supérieur des Études Appliquées en Humanités de Zaghouan, qui forme de jeunes leaders à travers l'entrepreneuriat, la durabilité, la communication et l'apprentissage par l'action.",
    },
    socialImageUrl: null,
  },
};
