import type { ProjectType } from "./types";

export type ServiceIcon = ProjectType | "Platform";

export type Service = {
  slug: string;
  title: string;
  oneLiner: string;
  includes: string[];
  /** TODO: the Fiverr gig URL for this service. Empty hides the Fiverr button. */
  fiverr: string;
  icon: ServiceIcon;
};

export const services: Service[] = [
  {
    slug: "ai-platform",
    title: "AI platform / SaaS",
    oneLiner:
      "A complete AI product or internal platform: the screen your team uses, the backend, the AI and the cloud it runs on.",
    includes: [
      "Architecture and a clear plan before any code",
      "React or Next.js app for your team or customers",
      "NestJS or FastAPI backend with clean, documented APIs",
      "AI built in: RAG, agents and MCP tools for Claude",
      "Integrations with the tools you already use",
      "Human approval, AI cost tracking and audit logs",
      "CI/CD and deployment on AWS",
    ],
    fiverr: "",
    icon: "Platform",
  },
  {
    slug: "ai-chatbot",
    title: "AI chatbot",
    oneLiner:
      "A chatbot trained on your documents and website that answers accurately and hands off to your team.",
    includes: [
      "Trained on your PDFs, docs and website pages (RAG)",
      "Claude, GPT or Gemini, picked for your budget",
      "Says \"I don't know\" instead of guessing",
      "Hand-off to a human by email or live chat",
      "Chat widget for your website",
      "Deployment and a handover guide",
    ],
    fiverr: "https://www.fiverr.com/s/wbblvlA",
    icon: "Chatbots",
  },
  {
    slug: "mcp-server",
    title: "MCP server",
    oneLiner: "Connect Claude or your AI agent to your CRM, database, files or internal API, securely.",
    includes: [
      "Custom MCP server for your system or API",
      "Typed tools with input validation",
      "Authentication, permissions and audit logs",
      "Works with Claude Desktop, Claude Code and custom agents",
      "Docker setup for easy deployment",
      "Docs and example prompts",
    ],
    fiverr: "https://www.fiverr.com/s/X00B44k",
    icon: "MCP",
  },
  {
    slug: "ai-agent",
    title: "AI agent / n8n",
    oneLiner: "Automate a real workflow end to end, with human approval where it matters.",
    includes: [
      "Workflow mapping before any code",
      "n8n or Python agent, whichever fits",
      "Human approval steps for risky actions",
      "Connects to Gmail, Sheets, Slack, your CRM and more",
      "Error handling, retries and logs",
      "A short runbook for your team",
    ],
    fiverr: "",
    icon: "Agents",
  },
  {
    slug: "whatsapp-ai-assistant",
    title: "WhatsApp AI assistant",
    oneLiner: "Answer customers and book appointments on WhatsApp, in English and Arabic.",
    includes: [
      "WhatsApp Business (Cloud API) setup",
      "Replies in English and Arabic",
      "Answers from your own FAQs and documents",
      "Appointment booking with your calendar",
      "Human takeover for complex chats",
      "Conversation logs",
    ],
    fiverr: "",
    icon: "WhatsApp",
  },
  {
    slug: "ai-voice-agent",
    title: "AI voice agent",
    oneLiner: "A phone receptionist that answers questions and books appointments, 24/7.",
    includes: [
      "A phone number answered by AI around the clock",
      "Answers FAQs and books appointments",
      "Natural voice with low latency",
      "Call transcripts and summaries",
      "Calendar and CRM integration",
      "Escalation to a human when needed",
    ],
    fiverr: "",
    icon: "Voice",
  },
];
