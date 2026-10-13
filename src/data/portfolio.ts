import type { ProjectCategory } from "../lib/filters";

export const profile = {
  name: "Ritwick Dutta",
  email: "rittwick.dutta@gmail.com",
  title: "Applied AI Architect",
  organization: "Microsoft",
  location: "Toronto, Canada",
  linkedin: "https://www.linkedin.com/in/ritwickdutta/",
  linkedinArticles: "https://www.linkedin.com/in/ritwickdutta/recent-activity/articles/",
  linkedinPosts: "https://www.linkedin.com/in/ritwickdutta/recent-activity/all/",
  github: [
    { label: "AI workshops & demos", username: "ritwickmicrosoft", url: "https://github.com/ritwickmicrosoft" },
    { label: "Independent projects", username: "rtdjin3000", url: "https://github.com/rtdjin3000" },
  ],
  description:
    "Ritwick Dutta is an applied AI architect at Microsoft focused on AI leadership, customer solutions, enterprise AI adoption, and production-ready GenAI and agentic systems.",
} as const;

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  type: "Workshop" | "Demo" | "Prototype" | "Application";
  year: string;
  categories: readonly ProjectCategory[];
  visual: "llmops" | "safety" | "mlops" | "documents" | "campaign" | "chat";
  tags: readonly string[];
  repository: string;
  source: string;
  context: string;
  approach: readonly string[];
  demonstrates: string;
  status: string;
  review: readonly { label: string; text: string }[];
}

export const projects: readonly Project[] = [
  {
    slug: "operational-llmops",
    title: "From RAG to release-ready",
    subtitle: "Operational LLMOps with Microsoft Foundry",
    description: "A hands-on workshop connecting RAG evaluation, model changes, and safety checks to the release process.",
    type: "Workshop",
    year: "2026",
    categories: ["operations", "workshops"],
    visual: "llmops",
    tags: ["Microsoft Foundry", "RAG", "Evaluation"],
    repository: "https://github.com/ritwickmicrosoft/llmops-workshop-demo-foundry",
    source: "https://github.com/ritwickmicrosoft/llmops-workshop-demo-foundry/blob/main/README.md",
    context:
      "An existing RAG chatbot is only the starting point. Customer teams need a practical way to evaluate quality, compare model changes, and decide what is ready to move forward.",
    approach: [
      "Use a pre-built RAG chatbot to make the operational lifecycle concrete.",
      "Introduce automated evaluation for groundedness, relevance, similarity, and fluency.",
      "Compare model versions and re-evaluate before promotion.",
      "Connect evaluation and safety checks to Azure DevOps release gates and MLflow GenAI integration.",
    ],
    demonstrates: "Customer enablement that makes production-readiness decisions tangible, rather than treating model selection as the entire solution.",
    status: "Public workshop and reference implementation. It is not a claim of a customer production deployment.",
    review: [
      { label: "Start with the architecture", text: "Review the RAG flow, inference integration, and evaluation modules." },
      { label: "Follow the operational journey", text: "Explore evaluation workflows, model swaps, and CI/CD promotion gates." },
      { label: "Adapt before using", text: "Define your own evaluation set, acceptance criteria, identity controls, and operating requirements." },
    ],
  },
  {
    slug: "ai-safety-red-teaming",
    title: "Make AI safety testable",
    subtitle: "PyRIT red-team demo",
    description: "An interactive notebook, report, and dashboard for exploring model safety evaluation with Microsoft's open-source PyRIT.",
    type: "Demo",
    year: "2026",
    categories: ["operations"],
    visual: "safety",
    tags: ["PyRIT", "Model safety", "Evaluation"],
    repository: "https://github.com/ritwickmicrosoft/pyrit-demo",
    source: "https://github.com/ritwickmicrosoft/pyrit-demo/blob/main/README.md",
    context:
      "AI safety becomes more useful to customer teams when it can be inspected, discussed, and tested. This demo makes risk identification visible through several hands-on interfaces.",
    approach: [
      "Offer notebook-based exploration of model safety testing.",
      "Generate a static report to make evaluation results reviewable.",
      "Use a live dashboard to explore supported model and multimodal scenarios.",
      "Keep the underlying PyRIT framework and Azure model prerequisites explicit.",
    ],
    demonstrates: "A practical approach to responsible AI enablement: make the testing process understandable and give teams evidence to review.",
    status: "Educational red-team demo for authorized testing. It does not certify a model or application as safe.",
    review: [
      { label: "Choose an interface", text: "Start with the notebook, report generator, or live dashboard." },
      { label: "Inspect the evaluation", text: "Review scoring and test limitations, not just a blocked or bypassed label." },
      { label: "Use with authorization", text: "Test only models and environments you are authorized to assess." },
    ],
  },
  {
    slug: "production-mlops",
    title: "The lifecycle after training",
    subtitle: "Azure ML + MLflow workshop",
    description: "An end-to-end learning path covering tracking, deployment, retraining, drift detection, and governance.",
    type: "Workshop",
    year: "2026",
    categories: ["operations", "workshops"],
    visual: "mlops",
    tags: ["Azure ML", "MLflow", "Governance"],
    repository: "https://github.com/ritwickmicrosoft/mlops-workshop-demo",
    source: "https://github.com/ritwickmicrosoft/mlops-workshop-demo/blob/main/README.md",
    context:
      "A model training notebook does not explain how a team will operate that model. This workshop brings the deployment, monitoring, and governance lifecycle into one learning path.",
    approach: [
      "Track training runs, metrics, artifacts, and model registration with MLflow.",
      "Explore batch endpoint deployment and automated retraining pipelines.",
      "Demonstrate drift and data-quality reporting.",
      "Introduce audit logging and governance with Azure-native services.",
    ],
    demonstrates: "Technical leadership that helps teams understand ownership and operational capability across the complete ML lifecycle.",
    status: "Public hands-on workshop using a sample spam-classification dataset. Production use requires environment-specific validation.",
    review: [
      { label: "Walk the lifecycle", text: "Follow the workshop modules from setup through governance." },
      { label: "Look beyond the model", text: "Review the retraining, observability, and audit-report components." },
      { label: "Plan your operating model", text: "Identify ownership, monitoring thresholds, and approval requirements before adapting the sample." },
    ],
  },
  {
    slug: "source-grounded-chart-intelligence",
    title: "Evidence behind the extraction",
    subtitle: "Source-grounded PDF chart intelligence",
    description: "A synthetic-data prototype that extracts chart values with source pages, evidence, confidence, and review flags.",
    type: "Prototype",
    year: "2026",
    categories: ["applied"],
    visual: "documents",
    tags: ["Azure AI Search", "GPT-4o", "Custom skills"],
    repository: "https://github.com/ritwickmicrosoft/ocr-skills",
    source: "https://github.com/ritwickmicrosoft/ocr-skills/blob/main/README.md",
    context:
      "Extracting a value is not enough when a reviewer needs to know where it came from. This prototype focuses on source-grounded interpretation of synthetic financial charts.",
    approach: [
      "Use Azure AI Search indexing and a custom Web API skill.",
      "Analyze normalized chart images with an existing GPT-4o deployment.",
      "Return structured results including visible values, source pages, evidence, confidence, and review flags.",
      "Keep regional deployment requirements and infrastructure prerequisites explicit.",
    ],
    demonstrates: "An evidence-first design for AI-assisted document understanding, with reviewability and deployment constraints treated as part of the architecture.",
    status: "Synthetic-data prototype, not financial advice or a financial system of record. The reviewed README records an infrastructure quota blocker; no completed end-to-end cloud deployment is claimed.",
    review: [
      { label: "Inspect the design", text: "Review the published architecture and structured extraction output." },
      { label: "Separate the test paths", text: "The local image preview and the PDF-to-Search indexing workflow validate different parts of the system." },
      { label: "Check current prerequisites", text: "Confirm regional access, identity, hosting quota, and deployment status in the repository before running." },
    ],
  },
  {
    slug: "consent-aware-campaigns",
    title: "Useful AI. Deliberate controls.",
    subtitle: "Consent-aware campaign application",
    description: "An independent application combining optional AI-assisted campaign writing with opt-in, preview, and human review workflows.",
    type: "Application",
    year: "2026",
    categories: ["applied"],
    visual: "campaign",
    tags: ["Next.js", "OpenAI", "Human review"],
    repository: "https://github.com/rtdjin3000/marketing_campaign_engine",
    source: "https://github.com/rtdjin3000/marketing_campaign_engine/blob/main/README.md",
    context:
      "Applying AI to a business workflow means accounting for consent and operator control, not just generating a message. This independent application explores those concerns in restaurant outreach.",
    approach: [
      "Combine lead review, customer imports, and campaign preparation in one application.",
      "Offer optional OpenAI-assisted subject-line and copy generation.",
      "Include preview, dry-run, opt-in checks, unsubscribe handling, and message logs.",
      "Make manual lead validation part of the workflow.",
    ],
    demonstrates: "A product-oriented view of AI adoption that connects usefulness with deliberate human control and operational safeguards.",
    status: "Independent public application. Repository-described controls are not a legal compliance certification, a claim of commercial adoption, or verified business outcomes.",
    review: [
      { label: "Follow the user journey", text: "Explore review, campaign preparation, and dry-run workflows." },
      { label: "Inspect the controls", text: "Review opt-in checks, opt-out handling, and logging before connecting real providers." },
      { label: "Validate for your use case", text: "Assess applicable marketing rules, permissions, security, and consent requirements separately." },
    ],
  },
  {
    slug: "open-model-conversations",
    title: "An open-model starting point",
    subtitle: "Falcon + LangChain + Chainlit",
    description: "A lightweight conversational prototype exploring an open model, orchestration, and a simple chat interface.",
    type: "Prototype",
    year: "2023",
    categories: ["applied"],
    visual: "chat",
    tags: ["Falcon", "LangChain", "Chainlit"],
    repository: "https://github.com/rtdjin3000/falcon_chat",
    source: "https://github.com/rtdjin3000/falcon_chat/blob/main/README.md",
    context:
      "Hands-on experimentation is a useful complement to architecture strategy. This early prototype connects the Falcon model to a conversational interface using an open-source toolchain.",
    approach: [
      "Use Falcon through Hugging Face as the language model.",
      "Connect the model with LangChain.",
      "Provide a simple Chainlit chat interface.",
    ],
    demonstrates: "A builder's mindset and experience exploring open-model application patterns alongside managed enterprise AI platforms.",
    status: "An early experimental prototype. Dependencies and model access need to be reviewed before running it today.",
    review: [
      { label: "Understand the scope", text: "This is a simple chat interface, not a full enterprise agent or RAG platform." },
      { label: "Review the toolchain", text: "Inspect the model integration, orchestration, and UI components." },
      { label: "Check today's compatibility", text: "Confirm current dependencies, access requirements, and licensing before adapting the prototype." },
    ],
  },
];

export const career = [
  {
    organization: "Microsoft",
    role: "Applied AI Architect, Financial Services",
    dates: "Oct 2025 - Present",
    description: "Advise regulated organizations on GenAI and agentic architecture, production readiness, and platform governance. Connect customer engineering teams with product groups through workshops and design reviews.",
    current: true,
  },
  {
    organization: "TELUS",
    role: "Lead AI Engineer",
    dates: "Oct 2023 - Oct 2025",
    description: "Led applied AI delivery across multimodal assistants, agentic problem management, and workforce forecasting. Built two RAG-based assistants for field technicians and sales enablement.",
    current: false,
  },
  {
    organization: "Bell",
    role: "Senior Manager, Artificial Intelligence",
    dates: "Nov 2021 - Sep 2023",
    description: "Owned AI and data strategy transformation and an enterprise ML portfolio. Advanced Google Cloud data foundations, GenAI personalization, and responsible AI practices.",
    current: false,
  },
  {
    organization: "Rogers Communications",
    role: "Manager, Data Scientist",
    dates: "Nov 2019 - Oct 2021",
    description: "Led cloud analytics transformation and a machine learning portfolio across sales, marketing, and pricing, including recommendations, segmentation, and NLP.",
    current: false,
  },
] as const;

export const leadership = [
  {
    number: "01",
    title: "Start with the customer",
    text: "Translate business ambiguity into architecture choices. Bring customer teams, technical stakeholders, and product engineering into the same conversation.",
    evidence: "Architecture advisory & design reviews at Microsoft",
  },
  {
    number: "02",
    title: "Build for the real world",
    text: "Treat evaluation, safety, governance, and supportability as design requirements. Help teams understand what needs to be true before an AI workload moves forward.",
    evidence: "Production-readiness reviews & operational workshops",
  },
  {
    number: "03",
    title: "Grow the capability",
    text: "Combine hands-on delivery with team and portfolio leadership. Make AI understandable through practical enablement, teaching, and shared implementation patterns.",
    evidence: "AI leadership at TELUS & Bell; teaching at Humber & Durham",
  },
] as const;
