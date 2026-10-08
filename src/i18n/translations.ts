import type { Locale } from './locale';

const en = {
  layout: {
    title: 'Software development & consulting',
    home: 'home', skip: 'Skip to content', navigation: 'Main navigation',
    work: 'Work', services: 'Services', about: 'About', contact: 'Contact',
    language: 'Language', light: 'Switch to light mode', dark: 'Switch to dark mode',
    footerFirst: 'Independent engineering.', footerSecond: 'Built with purpose.', by: 'By',
  },
  site: {
    description: 'Freelance software development and consulting by Alonso Villanueva. Websites, applications, backend APIs, automation, and deployment.',
    role: 'Senior Software Engineer & Team Lead',
    biography: 'I’m Alonso Villanueva, a Senior Software Engineer. Naranjo Solutions is my freelance and consulting practice, where I build modern, scalable software for clients—from the first conversation to deployment.',
    contactLabel: 'Connect with us',
    services: [
      { title: 'Websites & applications', description: 'A clear public presence, a new product, or a tool that helps your team get work done. Built around the people who will use it.', capabilities: ['Business websites', 'Web applications', 'Mobile & cross-platform apps'], tools: 'React · TypeScript · Vite · Ant Design' },
      { title: 'Backends & integrations', description: 'The systems behind the interface. APIs, databases, and authentication that connect your product to the rest of your business.', capabilities: ['Backend APIs', 'Database design', 'Authentication & integrations'], tools: 'FastAPI · PostgreSQL · SQLAlchemy · Alembic' },
      { title: 'Automation & custom tools', description: 'Turn repetitive work into reliable workflows. Connect services, process data, and give your team purpose-built tools.', capabilities: ['Data processing', 'Scheduled workflows', 'Service integrations'], tools: 'Python · Scheduled jobs · API integrations' },
      { title: 'Deployment & infrastructure', description: 'Take software from a working build to a running system, with repeatable deployments and infrastructure that can grow with it.', capabilities: ['Cloud infrastructure', 'Delivery pipelines', 'Containerized applications'], tools: 'Docker · GitHub Actions · AWS · Terraform' },
    ],
  },
  home: {
    eyebrow: 'Independent software development & consulting',
    heading: ['Software that', 'moves your', 'business'], headingFinal: 'forward',
    intro: ['From your first idea to the software', 'your business runs on. I build the whole thing.'],
    explore: 'Explore my work', delivery: 'Software delivery and your engineer', capabilities: 'Development capabilities',
    strip: ['Web & applications', 'Backend & APIs', 'Automation', 'Cloud & delivery'],
    workEyebrow: 'Selected client work', workHeading: ['Built for the', 'real world.'],
    workIntro: ['A closer look at how a business need', 'becomes a working software system.'], inside: 'Inside the project',
    servicesEyebrow: 'How I can help', servicesHeading: ['The right software.', 'For your next move.'],
    servicesIntro: ['One part of your system, or the full picture.', 'From concept through deployment.'],
    aboutEyebrow: 'The person behind the work', greeting: ['Hello,', 'I’m Alonso'],
    aboutLead: ['Good software starts', 'with understanding', 'what matters.'],
    aboutBody: 'I work across frontend, backend, automation, and infrastructure. That means I can connect the details of an interface with the systems behind it—and help you bring the pieces together.', more: 'More about me',
    ideas: 'Ideas', production: 'production',
  },
  contact: {
    eyebrow: 'Let’s make it happen', heading: ['A good idea.', 'A solid next step.'],
    intro: 'Have a website, a product, or a workflow that needs a better way forward? Let’s talk about what you want to build.',
    email: 'Email', phone: 'Phone', destination: 'Continue to my personal site',
  },
  project: {
    back: 'Back to selected work', technology: 'Project technology', details: 'Project details',
    capabilities: 'Delivered capabilities', technologyHeading: 'Technology',
    privacy: ['Client repositories are private.', 'No clinic or patient data is shown.'],
  },
  clinic: {
    category: 'Healthcare / Connected systems', overview: 'Platform overview', subtitle: 'A connected clinic platform',
    connected: 'One connected platform', connections: 'Website · Booking · Admin', ourClinic: 'Our clinic',
    care: 'Spine care', careHeading: ['Connected', 'to your care.'], explore: 'Explore the clinic ↗',
    publicWebsite: 'Public website', publicCaption: 'The clinic’s online presence.',
    appointment: 'Book an appointment', month: 'Sample month', weekdays: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    bookingNote: 'Choose a day. Find your time.', onlineBooking: 'Online booking', bookingCaption: 'A connected booking experience.',
    dashboard: 'Admin dashboard', dashboardCaption: 'A dedicated administration interface.',
    navigation: ['Overview', 'Bookings', 'Clinic', 'Settings'], clinicOverview: 'Clinic overview', search: 'Find a booking…', reference: 'Reference', status: 'Status',
    appointments: ['Booking 01', 'Booking 02', 'Booking 03'], statuses: ['Scheduled', 'Confirmed', 'Pending'],
    backend: 'Connected by one integrated platform', caption: 'Illustrated system overview · Not a product screenshot',
    descriptions: {
      website: 'The clinic’s public presence, brought together in a React website.',
      booking: 'An online booking experience connected to the clinic platform.',
      dashboard: 'A separate interface for clinic administration.',
      database: 'FastAPI services and PostgreSQL persistence connect the interfaces.',
    },
  },
  error: {
    title: 'Page not found', eyebrow: '404 / A small detour', headingFirst: 'Let’s get you', headingSecond: 'back on track',
    description: 'This page couldn’t be found. Explore my work or head back to the homepage.', home: 'Back to home', work: 'See selected work',
  },
};

type Translations = typeof en;

const es: Translations = {
  layout: {
    title: 'Desarrollo de software y consultoría',
    home: 'inicio', skip: 'Saltar al contenido', navigation: 'Navegación principal',
    work: 'Proyectos', services: 'Servicios', about: 'Sobre mí', contact: 'Contacto',
    language: 'Idioma', light: 'Cambiar al modo claro', dark: 'Cambiar al modo oscuro',
    footerFirst: 'Ingeniería independiente.', footerSecond: 'Creado con propósito.', by: 'Por',
  },
  site: {
    description: 'Desarrollo de software y consultoría independiente por Alonso Villanueva. Sitios web, aplicaciones, APIs, automatización y despliegue.',
    role: 'Ingeniero de software sénior y líder de equipo',
    biography: 'Soy Alonso Villanueva, ingeniero de software sénior. Naranjo Solutions es mi práctica independiente de desarrollo y consultoría, donde construyo software moderno y escalable para mis clientes, desde la primera conversación hasta el despliegue.',
    contactLabel: 'Conversemos',
    services: [
      { title: 'Sitios web y aplicaciones', description: 'Una presencia en línea clara, un producto nuevo o una herramienta que facilite el trabajo de tu equipo. Diseñados para las personas que los van a usar.', capabilities: ['Sitios web empresariales', 'Aplicaciones web', 'Apps móviles y multiplataforma'], tools: 'React · TypeScript · Vite · Ant Design' },
      { title: 'Backend e integraciones', description: 'Los sistemas detrás de la interfaz. APIs, bases de datos y autenticación que conectan tu producto con el resto de tu negocio.', capabilities: ['APIs de backend', 'Diseño de bases de datos', 'Autenticación e integraciones'], tools: 'FastAPI · PostgreSQL · SQLAlchemy · Alembic' },
      { title: 'Automatización y herramientas', description: 'Convierte tareas repetitivas en procesos confiables. Conecta servicios, procesa datos y dale a tu equipo herramientas hechas a su medida.', capabilities: ['Procesamiento de datos', 'Procesos programados', 'Integración de servicios'], tools: 'Python · Tareas programadas · Integraciones de APIs' },
      { title: 'Despliegue e infraestructura', description: 'Lleva el software de una versión funcional a un sistema en producción, con despliegues repetibles e infraestructura que pueda crecer con él.', capabilities: ['Infraestructura en la nube', 'Flujos de entrega', 'Aplicaciones en contenedores'], tools: 'Docker · GitHub Actions · AWS · Terraform' },
    ],
  },
  home: {
    eyebrow: 'Desarrollo de software y consultoría independiente',
    heading: ['Software que', 'impulsa tu', 'negocio'], headingFinal: 'hacia adelante',
    intro: ['Desde tu primera idea hasta el software', 'que sostiene tu negocio. Construyo todo el sistema.'],
    explore: 'Explora mis proyectos', delivery: 'Desarrollo de software y tu ingeniero', capabilities: 'Capacidades de desarrollo',
    strip: ['Web y aplicaciones', 'Backend y APIs', 'Automatización', 'Nube y despliegue'],
    workEyebrow: 'Proyectos para clientes', workHeading: ['Creado para el', 'mundo real.'],
    workIntro: ['Una mirada a cómo una necesidad de negocio', 'se convierte en un sistema de software funcional.'], inside: 'Conoce el proyecto',
    servicesEyebrow: 'Cómo puedo ayudarte', servicesHeading: ['El software adecuado.', 'Para tu próximo paso.'],
    servicesIntro: ['Una parte de tu sistema o la solución completa.', 'Desde el concepto hasta el despliegue.'],
    aboutEyebrow: 'La persona detrás del trabajo', greeting: ['Hola,', 'soy Alonso'],
    aboutLead: ['El buen software empieza', 'por entender', 'lo que importa.'],
    aboutBody: 'Trabajo en frontend, backend, automatización e infraestructura. Eso me permite conectar los detalles de una interfaz con los sistemas que la sostienen y ayudarte a unir todas las piezas.', more: 'Más sobre mí',
    ideas: 'Ideas', production: 'producción',
  },
  contact: {
    eyebrow: 'Hagámoslo realidad', heading: ['Una buena idea.', 'Un siguiente paso firme.'],
    intro: '¿Tienes un sitio web, un producto o un proceso que necesita una mejor solución? Conversemos sobre lo que quieres construir.',
    email: 'Correo', phone: 'Teléfono', destination: 'Continúa a mi sitio personal',
  },
  project: {
    back: 'Volver a los proyectos', technology: 'Tecnologías del proyecto', details: 'Detalles del proyecto',
    capabilities: 'Funcionalidades entregadas', technologyHeading: 'Tecnología',
    privacy: ['Los repositorios del cliente son privados.', 'No se muestran datos de la clínica ni de pacientes.'],
  },
  clinic: {
    category: 'Salud / Sistemas conectados', overview: 'Vista de la plataforma', subtitle: 'Una plataforma clínica conectada',
    connected: 'Una plataforma conectada', connections: 'Sitio web · Reservas · Administración', ourClinic: 'Nuestra clínica',
    care: 'Cuidado de la columna', careHeading: ['Conectados', 'con tu salud.'], explore: 'Explora la clínica ↗',
    publicWebsite: 'Sitio web público', publicCaption: 'La presencia en línea de la clínica.',
    appointment: 'Reserva una cita', month: 'Mes de ejemplo', weekdays: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
    bookingNote: 'Elige un día. Encuentra tu horario.', onlineBooking: 'Reservas en línea', bookingCaption: 'Una experiencia de reservas conectada.',
    dashboard: 'Panel administrativo', dashboardCaption: 'Una interfaz dedicada a la administración.',
    navigation: ['Resumen', 'Reservas', 'Clínica', 'Ajustes'], clinicOverview: 'Resumen de la clínica', search: 'Buscar una reserva…', reference: 'Referencia', status: 'Estado',
    appointments: ['Reserva 01', 'Reserva 02', 'Reserva 03'], statuses: ['Programada', 'Confirmada', 'Pendiente'],
    backend: 'Conectados por una plataforma integrada', caption: 'Vista ilustrada del sistema · No es una captura del producto',
    descriptions: {
      website: 'La presencia pública de la clínica en un sitio web desarrollado con React.',
      booking: 'Una experiencia de reservas en línea conectada a la plataforma clínica.',
      dashboard: 'Una interfaz independiente para la administración de la clínica.',
      database: 'Los servicios de FastAPI y la persistencia en PostgreSQL conectan las interfaces.',
    },
  },
  error: {
    title: 'Página no encontrada', eyebrow: '404 / Un pequeño desvío', headingFirst: 'Volvamos al', headingSecond: 'camino correcto',
    description: 'No encontramos esta página. Explora mis proyectos o vuelve a la página de inicio.', home: 'Volver al inicio', work: 'Ver los proyectos',
  },
};

export const translations: Record<Locale, Translations> = { en, es };
