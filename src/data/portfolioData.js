import {
    FaJava, FaAngular, FaDatabase,
    FaGithub, FaLinkedin, FaTwitter, FaInstagram,
    FaEnvelope
} from 'react-icons/fa';
import {
    SiFlutter, SiSupabase, SiFirebase, SiSpringboot,
    SiSpring, SiMysql, SiDart
} from 'react-icons/si';
import {
    HiOutlineBriefcase, HiOutlineAcademicCap,
    HiOutlineLightningBolt, HiOutlineSparkles
} from 'react-icons/hi';
import { TbBrandOpenai, TbApi } from 'react-icons/tb';
import { RiFlutterFill, RiOpenaiFill } from 'react-icons/ri';
// ============== YAHAN APNA DATA DALO ==============

export const personalInfo = {
    name: "Mohit Kushwah",
    firstName: "Mohit",
    lastName: "Kushwah",
    title: "Full Stack Developer",
    tagline: "Turning Ideas into Digital Reality",
    description: "I'm a passionate Full Stack Developer with 3+ years of experience in building modern, responsive, and user-friendly web applications. I specialize in React, Node.js, and modern web technologies.",
    shortBio: "A creative developer who loves to build beautiful and functional web applications that make a difference.",
    email: "dev.mohitkushwah@gmail.com",
    phone: "+91 8435951261",
    location: "Indore, India",
    // website: "https://yourwebsite.com",
    resumeLink: "/Mohit_Kushwah_Resume.pdf",
    profileImage: "/images/profile.jpeg",
    heroImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
    available: true,
};

export const socialLinks = [
    { name: "GitHub", icon: FaGithub, url: "https://github.com/mohitkushwah12", color: "#333" },
    { name: "LinkedIn", icon: FaLinkedin, url: "https://linkedin.com/in/mohit-kushwah-mk2786", color: "#0077B5" },
    { name: "Twitter", icon: FaTwitter, url: "https://twitter.com/yourusername", color: "#1DA1F2" },
    { name: "Instagram", icon: FaInstagram, url: "https://instagram.com/__mr__mo_hit__", color: "#E4405F" },
    { name: "Email", icon: FaEnvelope, url: "mailto:dev.mohitkushwah@gmail.com", color: "#EA4335" },
];

export const navLinks = [
    { name: "Home", to: "home" },
    { name: "About", to: "about" },
    { name: "Skills", to: "skills" },
    { name: "Experience", to: "experience" },
    { name: "Projects", to: "projects" },
    { name: "Testimonials", to: "testimonials" },
    { name: "Contact", to: "contact" },
];

export const stats = [
    { number: 10, suffix: "+", label: "Projects Completed" },
    { number: 5, suffix: "+", label: "Happy Clients" },
    { number: 1.5, suffix: "+", label: "Years Experience" },
    { number: 20, suffix: "+", label: "Technologies" },
];

export const roles = [
    "Flutter Developer",
    "Java Spring Boot Developer",
    "Mobile App Developer",
    "Full Stack Developer",
    "AI Tools Expert",
    "FlutterFlow Specialist",
];

export const skills = {
    mobile: [
        {
            name: "Flutter",
            icon: SiFlutter,
            level: 92,
            color: "#02569B",
            description: "Cross-platform mobile app development"
        },
        {
            name: "FlutterFlow",
            icon: RiFlutterFill,
            level: 90,
            color: "#4B39EF",
            description: "Low-code Flutter app builder"
        },
        {
            name: "Dart",
            icon: SiDart,
            level: 88,
            color: "#0175C2",
            description: "Programming language for Flutter"
        },
        {
            name: "Firebase Notifications",
            icon: SiFirebase,
            level: 85,
            color: "#FFA000",
            description: "Push notifications system"
        },
    ],
    backend: [
        {
            name: "Java",
            icon: FaJava,
            level: 90,
            color: "#007396",
            description: "Enterprise application development"
        },
        {
            name: "Spring Boot",
            icon: SiSpringboot,
            level: 88,
            color: "#6DB33F",
            description: "Java-based backend framework"
        },
        {
            name: "Spring Core",
            icon: SiSpring,
            level: 85,
            color: "#6DB33F",
            description: "Core Spring framework features"
        },
        {
            name: "Hibernate",
            icon: FaDatabase,
            level: 82,
            color: "#59666C",
            description: "ORM framework for Java"
        },
        {
            name: "REST APIs",
            icon: TbApi,
            level: 92,
            color: "#FF6B6B",
            description: "RESTful web services"
        },
        {
            name: "Supabase Edge Functions",
            icon: SiSupabase,
            level: 80,
            color: "#3ECF8E",
            description: "Serverless edge computing"
        },
    ],
    frontend: [
        {
            name: "Angular",
            icon: FaAngular,
            level: 85,
            color: "#DD0031",
            description: "Frontend framework by Google"
        },
    ],
    database: [
        {
            name: "MySQL",
            icon: SiMysql,
            level: 88,
            color: "#4479A1",
            description: "Relational database management"
        },
        {
            name: "Supabase",
            icon: SiSupabase,
            level: 85,
            color: "#3ECF8E",
            description: "Open-source Firebase alternative"
        },
        {
            name: "Firebase",
            icon: SiFirebase,
            level: 88,
            color: "#FFCA28",
            description: "Google's mobile & web platform"
        },
    ],
    ai_tools: [
        {
            name: "ChatGPT",
            icon: RiOpenaiFill,
            level: 95,
            color: "#10A37F",
            description: "AI-powered assistance"
        },
        {
            name: "ChatGPT Assistant",
            icon: TbBrandOpenai,
            level: 90,
            color: "#10A37F",
            description: "Custom AI assistants"
        },
        {
            name: "Lovable AI",
            icon: HiOutlineSparkles,
            level: 85,
            color: "#FF6B9D",
            description: "AI-powered app builder"
        },
        {
            name: "BuildShip",
            icon: HiOutlineLightningBolt,
            level: 82,
            color: "#7C3AED",
            description: "Low-code backend builder"
        },
    ],
};

export const experiences = [
    {
        id: 1,
        role: "Full Stack & No-Code Developer (Flutter & FlutterFlow)",
        company: "Narma.dev Pvt. Ltd. Indore",
        companyUrl: "https://narma.dev/",
        duration: "Oct 2024 - Present",
        location: "Limbodi, Indore, India",
        description: [
            "Developed and maintained cross-platform mobile applications using Flutter and FlutterFlow",
            "Built scalable backend solutions with Supabase, Firebase, and PostgreSQL, including authentication, database design, and Row Level Security (RLS)",
            "Integrated REST APIs, AI services (OpenAI), payment gateways, push notifications, and third-party services into production applications",
            "Created reusable custom widgets, custom actions, and FlutterFlow components to improve development speed and maintainability",
            "Designed and deployed Supabase Edge Functions, automated workflows, and optimized application performance for a better user experience"
        ],
        technologies: [
            "Flutter",
            "FlutterFlow",
            "Dart",
            "Supabase",
            "Firebase",
            "PostgreSQL",
            "OpenAI API",
            "REST API",
            "Git",
            "GitHub"
        ],
        icon: HiOutlineBriefcase,
    },
    {
        id: 2,
        role: "Flutter Developer",
        company: "Acore It Hub Pvt. Ltd. Indore",
        companyUrl: "https://acoreithub.com/",
        duration: "Mar 2026 - Apr 2026",
        location: "Vijay Nagar, Indore, India",
        description: [
            "Developed cross-platform mobile applications using Flutter and FlutterFlow",
            "Integrated REST APIs, Firebase, and Supabase for authentication, database, and real-time features",
            "Built reusable UI components and implemented responsive layouts for Android and iOS",
            "Optimized application performance, fixed bugs, and improved overall user experience",
            "Collaborated with designers and developers using Git while following Agile development practices",
        ],
        technologies: [
            "Flutter",
            "Dart",
            "REST API",
            "Git",
            "Postman"
        ],
        icon: HiOutlineBriefcase,
    },
    {
        id: 3,
        role: "Java Developer Intern",
        company: "Dollop Infotech Pvt. Ltd. Indore",
        companyUrl: "https://dollopinfotech.com/",
        duration: "Nov 2023 - Apr 2024",
        location: "Vishnupuri, Indore, India",
        description: [
            "Developed RESTful APIs using Java and Spring Boot for web applications",
            "Designed and optimized MySQL database schemas, queries, and CRUD operations",
            "Integrated backend services with frontend applications and tested APIs using Postman",
            "Collaborated with the development team using Git and participated in Agile development practices",
            "Debugged, maintained, and enhanced existing application features to improve performance and reliability",
        ],
        technologies: ["Java", "Spring Boot", "MySQL", "Hibernate", "REST API", "Git", "Postman"],
        icon: HiOutlineBriefcase,
    },
];

export const education = [
    {
        id: 1,
        degree: "Master of Computer Science",
        institution: "Jawaharlal Intitute of Technology, Borawan",
        duration: "2022 - 2024",
        grade: "8.0 CGPA",
        description: "Specialized in Software Engineering and Web Technologies",
        icon: HiOutlineAcademicCap,
    },
    {
        id: 2,
        degree: "Bachelor of Computer Science",
        institution: "Sardar Vallabhbhai Patel College Mandleshwar",
        duration: "2019 - 2022",
        grade: "8.5 CGPA",
        description: "Specialized in Software Engineering and Web Technologies",
        icon: HiOutlineAcademicCap,
    },
];

export const projects = [
    {
        id: 1,
        title: "E-Commerce Platform",
        description: "A full-stack e-commerce platform with real-time inventory management, payment integration, and admin dashboard.",
        longDescription: "Built a comprehensive e-commerce solution featuring user authentication, product management, shopping cart, Stripe payment integration, order tracking, and an admin dashboard with analytics.",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600",
        technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redux", "Tailwind CSS"],
        category: "Full Stack",
        github: "https://github.com",
        live: "https://example.com",
        featured: true,
    },
    {
        id: 2,
        title: "Social Media Dashboard",
        description: "A real-time social media analytics dashboard with beautiful charts and data visualization.",
        longDescription: "Developed an analytics dashboard that aggregates social media data from multiple platforms, featuring real-time updates, interactive charts, and exportable reports.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600",
        technologies: ["Next.js", "TypeScript", "GraphQL", "D3.js", "PostgreSQL"],
        category: "Full Stack",
        github: "https://github.com",
        live: "https://example.com",
        featured: true,
    },
    {
        id: 3,
        title: "AI Chat Application",
        description: "An AI-powered chat application with natural language processing and smart responses.",
        longDescription: "Created an intelligent chat application using OpenAI API with features like context-aware responses, chat history, and multi-language support.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600",
        technologies: ["React", "Python", "FastAPI", "OpenAI", "WebSocket"],
        category: "AI/ML",
        github: "https://github.com",
        live: "https://example.com",
        featured: true,
    },
    {
        id: 4,
        title: "Task Management App",
        description: "A Kanban-style task management application with drag-and-drop functionality.",
        longDescription: "Built a project management tool featuring drag-and-drop task boards, team collaboration, deadline tracking, and notification system.",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600",
        technologies: ["React", "Firebase", "Tailwind CSS", "DnD Kit"],
        category: "Frontend",
        github: "https://github.com",
        live: "https://example.com",
        featured: false,
    },
    {
        id: 5,
        title: "Weather App",
        description: "A beautiful weather application with location-based forecasts and interactive maps.",
        longDescription: "Developed a weather application with geolocation support, 7-day forecasts, interactive weather maps, and severe weather alerts.",
        image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=600",
        technologies: ["React", "OpenWeather API", "Mapbox", "CSS Animations"],
        category: "Frontend",
        github: "https://github.com",
        live: "https://example.com",
        featured: false,
    },
    {
        id: 6,
        title: "REST API Service",
        description: "A scalable REST API service with authentication, rate limiting, and documentation.",
        longDescription: "Architected a robust REST API with JWT authentication, role-based access control, rate limiting, caching, and comprehensive Swagger documentation.",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600",
        technologies: ["Node.js", "Express", "MongoDB", "Redis", "Swagger"],
        category: "Backend",
        github: "https://github.com",
        live: "https://example.com",
        featured: false,
    },
];

export const testimonials = [
    {
        id: 1,
        name: "John Smith",
        role: "CEO, Tech Corp",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
        text: "Working with this developer was an absolute pleasure. The attention to detail and code quality exceeded our expectations. Highly recommended!",
        rating: 5,
    },
    {
        id: 2,
        name: "Sarah Johnson",
        role: "Product Manager, StartupXYZ",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
        text: "Exceptional developer who delivered our project ahead of schedule. The communication was excellent throughout the entire process.",
        rating: 5,
    },
    {
        id: 3,
        name: "Michael Chen",
        role: "CTO, Innovation Labs",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
        text: "One of the most talented developers I've worked with. The technical expertise and problem-solving skills are truly impressive.",
        rating: 5,
    },
];

export const services = [
    {
        id: 1,
        title: "Mobile App Development",
        description: "Building beautiful cross-platform mobile apps using Flutter and FlutterFlow.",
        icon: "📱",
        features: ["Flutter Apps", "FlutterFlow", "iOS & Android", "Push Notifications"],
    },
    {
        id: 2,
        title: "Backend Development",
        description: "Robust backend solutions with Java Spring Boot and REST APIs.",
        icon: "⚙️",
        features: ["Spring Boot", "REST APIs", "Hibernate ORM", "MySQL Database"],
    },
    {
        id: 3,
        title: "Cloud & Database",
        description: "Modern database and cloud solutions with Firebase and Supabase.",
        icon: "☁️",
        features: ["Firebase", "Supabase", "Edge Functions", "Real-time Data"],
    },
    {
        id: 4,
        title: "AI Integration",
        description: "Integrating AI tools like ChatGPT and Lovable AI into applications.",
        icon: "🤖",
        features: ["ChatGPT API", "AI Assistants", "Lovable AI", "BuildShip"],
    },
];