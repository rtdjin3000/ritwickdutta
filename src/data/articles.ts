export interface WritingEntry {
  title: string;
  url: string;
  kind: "article" | "post";
  summary: string;
  topics: readonly string[];
  readTime?: string;
  ageAtCapture?: string;
}

export const archiveVerifiedOn = "2026-10-12";

export const articles: readonly WritingEntry[] = [
  {
    title: "Open Models Are Accelerating. The Model Harness Is Becoming the Differentiator.",
    url: "https://www.linkedin.com/pulse/open-models-accelerating-model-harness-becoming-ritwick-dutta-2cw9c/",
    kind: "article",
    summary: "Enterprise AI choices beyond the model: the systems, controls, and harness around it.",
    topics: ["Enterprise AI", "Open models", "Architecture"],
    readTime: "6 min read",
  },
  {
    title: "How to Stay Relevant in the Age of AI Agents (Without Losing Your Mind)",
    url: "https://www.linkedin.com/pulse/how-stay-relevant-age-ai-agents-without-losing-your-mind-dutta-4cy0c/",
    kind: "article",
    summary: "A practical perspective for builders navigating the pace of agentic AI.",
    topics: ["Agents", "Learning", "Leadership"],
    readTime: "2 min read",
  },
  {
    title: 'The Algorithmic Idol: Why AI is More "Social Climber" Than "Supercomputer"',
    url: "https://www.linkedin.com/pulse/algorithmic-idol-why-ai-more-social-climber-than-ritwick-dutta-moowe/",
    kind: "article",
    summary: "A different lens on how large language models learn and behave.",
    topics: ["LLMs", "AI perspectives"],
    readTime: "3 min read",
  },
  {
    title: "Stop Just Automating. Start Autonomizing. Your 5-Stage Roadmap from RPA to AI Agents",
    url: "https://www.linkedin.com/pulse/stop-just-automating-start-autonomizing-your-5-stage-roadmap-dutta-tsume/",
    kind: "article",
    summary: "The shift from repetitive automation toward agentic workflows and autonomy.",
    topics: ["Agents", "Enterprise AI", "Adoption"],
    readTime: "2 min read",
  },
  {
    title: "Are AI Models the New Ghosts of Our World?",
    url: "https://www.linkedin.com/pulse/ai-models-new-ghosts-our-world-ritwick-dutta-357we/",
    kind: "article",
    summary: "A reflection on language models and our relationship with invisible digital intelligence.",
    topics: ["LLMs", "AI perspectives"],
    readTime: "2 min read",
  },
  {
    title: "KV caching supercharges RAG and Agentic workflows",
    url: "https://www.linkedin.com/pulse/kv-caching-supercharges-rag-agentic-workflows-ritwick-dutta-4flre/",
    kind: "article",
    summary: "An introduction to KV caching and its relevance to RAG and agentic workloads.",
    topics: ["RAG", "Agents", "Inference"],
    readTime: "2 min read",
  },
  {
    title: "Reimagining Human Behavior Modeling in NLP: Toward Emotion-Attitude-Aware LLMs",
    url: "https://www.linkedin.com/pulse/reimagining-human-behavior-modeling-nlp-toward-llms-ritwick-dutta-qd50f/",
    kind: "article",
    summary: "Exploring emotion and attitude as directions for language-model behavior modeling.",
    topics: ["NLP", "LLMs", "Human behavior"],
    readTime: "2 min read",
  },
  {
    title: "Beyond Traditional RAG: How Agentic and Meta RAG are Redefining AI Retrieval",
    url: "https://www.linkedin.com/pulse/beyond-traditional-rag-how-agentic-meta-redefining-ai-ritwick-dutta-slkoe/",
    kind: "article",
    summary: "A perspective on evolving retrieval patterns around agentic systems.",
    topics: ["RAG", "Agents", "Architecture"],
    readTime: "2 min read",
  },
  {
    title: "The Rising Hype Around Model Context Protocol (MCP) in Agentic AI Workflows",
    url: "https://www.linkedin.com/pulse/rising-hype-around-model-context-protocol-mcp-agentic-ritwick-dutta-v973e/",
    kind: "article",
    summary: "Examining MCP's place in the conversation about agentic workflows.",
    topics: ["MCP", "Agents", "Architecture"],
    readTime: "2 min read",
  },
  {
    title: "Beyond the Bot: Human Leadership in the AI Age",
    url: "https://www.linkedin.com/pulse/beyond-bot-human-leadership-ai-age-ritwick-dutta-o4r3e/",
    kind: "article",
    summary: "The human side of leadership in a world increasingly shaped by AI.",
    topics: ["Leadership", "People", "AI adoption"],
    readTime: "2 min read",
  },
  {
    title: "Data & Knowledge Distillation: How Synthetic Data is Driving Business Success",
    url: "https://www.linkedin.com/pulse/data-knowledge-distillation-how-synthetic-driving-business-dutta-xwuje/",
    kind: "article",
    summary: "Synthetic data and knowledge distillation through a business-oriented lens.",
    topics: ["Synthetic data", "Distillation", "Enterprise AI"],
    readTime: "2 min read",
  },
  {
    title: "Leadership in the Age of LLMs and Gen AI: Strategies for Success",
    url: "https://www.linkedin.com/pulse/leadership-age-llms-gen-ai-strategies-success-ritwick-dutta-u1hye/",
    kind: "article",
    summary: "Leadership perspectives for organizations working with generative AI.",
    topics: ["Leadership", "GenAI", "Strategy"],
    readTime: "2 min read",
  },
  {
    title: "Top 5 AI Milestones Achieved in 2024",
    url: "https://www.linkedin.com/pulse/top-5-ai-milestones-achieved-2024-ritwick-dutta-6rxwe/",
    kind: "article",
    summary: "A retrospective on AI developments in 2024.",
    topics: ["AI developments", "2024"],
    readTime: "2 min read",
  },
  {
    title: "Nature's Blueprint: How AI and Ecology Are Reshaping Our World",
    url: "https://www.linkedin.com/pulse/natures-blueprint-how-ai-ecology-reshaping-our-world-ritwick-dutta-agabe/",
    kind: "article",
    summary: "A reflection on connections between artificial intelligence and ecology.",
    topics: ["AI perspectives", "Ecology"],
    readTime: "2 min read",
  },
  {
    title: "Machine Learning Operations (MLOps)",
    url: "https://www.linkedin.com/pulse/machine-learning-operations-mlops-ritwick-dutta-yowme/",
    kind: "article",
    summary: "An introduction to the operational side of machine learning.",
    topics: ["MLOps", "Operations"],
    readTime: "1 min read",
  },
  {
    title: "GPT - OpenAI DevDay Launch!",
    url: "https://www.linkedin.com/pulse/gpt-openai-devday-launch-ritwick-dutta-rah2e/",
    kind: "article",
    summary: "Commentary on an OpenAI DevDay launch.",
    topics: ["OpenAI", "GenAI", "AI developments"],
    readTime: "3 min read",
  },
  {
    title: "Artificial Intelligence in Political Science",
    url: "https://www.linkedin.com/pulse/artificial-intelligence-political-science-ritwick-dutta/",
    kind: "article",
    summary: "Exploring applications of AI in political science.",
    topics: ["Applied AI", "Political science"],
    readTime: "2 min read",
  },
  {
    title: "Personalizing a Chatbot with self-supervised learning capabilities",
    url: "https://www.linkedin.com/pulse/personalizing-chatbot-self-supervised-learning-ritwick-dutta/",
    kind: "article",
    summary: "A perspective on chatbot personalization and self-supervised learning.",
    topics: ["Chatbots", "Personalization", "Learning"],
    readTime: "2 min read",
  },
  {
    title: "The GCP Enterprise Data Solution Architecture - How to Integrate different types of data sources to generate effective Business Intelligence?",
    url: "https://www.linkedin.com/pulse/gcp-enterprise-data-solution-architecture-how-integrate-dutta/",
    kind: "article",
    summary: "Connecting enterprise data sources to business intelligence on Google Cloud.",
    topics: ["Google Cloud", "Data architecture", "Business intelligence"],
    readTime: "3 min read",
  },
  {
    title: "Personalizing a Chatbot - A Simple Architecture",
    url: "https://www.linkedin.com/pulse/personalizing-chatbot-simple-architecture-ritwick-dutta/",
    kind: "article",
    summary: "An architectural starting point for chatbot personalization.",
    topics: ["Chatbots", "Personalization", "Architecture"],
    readTime: "1 min read",
  },
  {
    title: "The Importance of AI Altruism",
    url: "https://www.linkedin.com/pulse/importance-ai-altruism-ritwick-dutta/",
    kind: "article",
    summary: "A reflection on AI altruism and the purposes of artificial intelligence.",
    topics: ["Responsible AI", "AI perspectives"],
    readTime: "1 min read",
  },
];

export const featuredArticles = [articles[0], articles[9], articles[3]];
