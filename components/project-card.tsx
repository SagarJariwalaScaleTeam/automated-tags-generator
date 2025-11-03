"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Loader2, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Project {
  title: string
  owner: string
  description: string
  repo_url: string
}

interface ProjectCardProps {
  project: Project
}

interface TagResponse {
  reasoning: string
  tools_used: string[]
  final_output: {
    project_name: string
    tags: string[]
  }
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [tags, setTags] = useState<string[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  const generateTags = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const [owner, repo] = project.repo_url.split("/")
      const url = `https://n8n-82ff.onrender.com/webhook/f39f8b1a-af1d-46b6-b8c6-14db4aded1fe?owner=${owner}&repo=${repo}&repo_url=${project.repo_url}`

      const response = await fetch(url, {
        method: "GET",
      })

      if (!response.ok) {
        throw new Error("Failed to generate tags")
      }

      const data = await response.json()

      if (Array.isArray(data) && data.length > 0) {
        const tagData = data[0] as TagResponse
        setTags(tagData.final_output.tags)
      } else {
        throw new Error("Invalid response format")
      }
    } catch (err) {
      setError("Failed to generate tags. Please try again.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="flex flex-col h-full transition-all hover:shadow-lg hover:border-primary/50">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardTitle className="text-xl text-foreground">{project.title}</CardTitle>
            <CardDescription className="text-sm mt-1">{project.owner}</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-4">
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">{project.description}</p>

        {/* Tags Section */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && <div className="text-xs text-destructive bg-destructive/10 p-3 rounded-md mt-2">{error}</div>}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground py-3">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Generating tags...</span>
          </div>
        )}

        {/* Generate Button */}
        <Button
          onClick={generateTags}
          disabled={isLoading}
          className="mt-auto w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Generate Tags
            </>
          )}
        </Button>

        {/* Repository Link */}
        <a
          href={`https://github.com/${project.repo_url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 text-xs text-muted-foreground hover:text-primary transition-colors py-2"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          View Repository
        </a>
      </CardContent>
    </Card>
  )
}
