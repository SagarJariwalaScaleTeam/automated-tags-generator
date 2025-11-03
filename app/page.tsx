"use client"
import { Sparkles } from "lucide-react"
import ProjectCard from "@/components/project-card"

const projects = [
  {
    title: "React",
    owner: "Facebook (Meta)",
    description:
      "A JavaScript library for building user interfaces, focused on component-based architecture and virtual DOM rendering.",
    repo_url: "facebook/react",
  },
  {
    title: "Next.js",
    owner: "Vercel",
    description:
      "A React framework for production that enables hybrid static and server-side rendering, API routes, and optimized performance.",
    repo_url: "vercel/next.js",
  },
  {
    title: "Node.js",
    owner: "OpenJS Foundation",
    description:
      "A JavaScript runtime built on Chrome's V8 engine, designed for scalable network applications and server-side scripting.",
    repo_url: "nodejs/node",
  },
  {
    title: "freeCodeCamp",
    owner: "freeCodeCamp.org",
    description:
      "A nonprofit community that helps people learn to code through free interactive tutorials, projects, and certifications.",
    repo_url: "freeCodeCamp/freeCodeCamp",
  },
  {
    title: "Vue.js",
    owner: "Evan You",
    description:
      "A progressive JavaScript framework for building user interfaces, designed for simplicity and incremental adoption.",
    repo_url: "vuejs/vue",
  },
]

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Project Tags Generator</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Discover AI-generated insights for popular open-source projects
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </main>
  )
}
