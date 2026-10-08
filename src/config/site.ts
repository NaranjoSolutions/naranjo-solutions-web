interface Service {
  title: string;
  description: string;
  capabilities: string[];
  tools: string;
}

interface SiteConfig {
  brand: string;
  description: string;
  owner: {
    name: string;
    role: string;
    biography: string;
  };
  contact: {
    url: string;
    label: string;
    display: string;
    email: string;
    phone: {
      number: string;
      display: string;
    };
  };
  services: Service[];
}

export const siteConfig: SiteConfig = {
  brand: "Naranjo Solutions",
  description:
    "Freelance software development and consulting by Alonso Villanueva. Websites, applications, backend APIs, automation, and deployment.",
  owner: {
    name: "Alonso Villanueva",
    role: "Senior Software Engineer & Team Lead",
    biography:
      "I’m Alonso Villanueva, a Senior Software Engineer & Team Lead. Naranjo Solutions is my freelance and consulting practice, where I build modern, scalable software for clients—from the first conversation to deployment.",
  },
  contact: {
    url: "https://alonsovndev.com/",
    label: "Connect with us",
    display: "alonsovndev.com",
    email: "alonsonh94@gmail.com",
    phone: {
      number: "+50689599092",
      display: "+506 8959 9092",
    },
  },
  services: [
    {
      title: "Websites & applications",
      description:
        "A clear public presence, a new product, or a tool that helps your team get work done. Built around the people who will use it.",
      capabilities: ["Business websites", "Web applications", "Mobile & cross-platform apps"],
      tools: "React · TypeScript · Vite · Ant Design",
    },
    {
      title: "Backends & integrations",
      description:
        "The systems behind the interface. APIs, databases, and authentication that connect your product to the rest of your business.",
      capabilities: ["Backend APIs", "Database design", "Authentication & integrations"],
      tools: "FastAPI · PostgreSQL · SQLAlchemy · Alembic",
    },
    {
      title: "Automation & custom tools",
      description:
        "Turn repetitive work into reliable workflows. Connect services, process data, and give your team purpose-built tools.",
      capabilities: ["Data processing", "Scheduled workflows", "Service integrations"],
      tools: "Python · Scheduled jobs · API integrations",
    },
    {
      title: "Deployment & infrastructure",
      description:
        "Take software from a working build to a running system, with repeatable deployments and infrastructure that can grow with it.",
      capabilities: ["Cloud infrastructure", "Delivery pipelines", "Containerized applications"],
      tools: "Docker · GitHub Actions · AWS · Terraform",
    },
  ],
};
