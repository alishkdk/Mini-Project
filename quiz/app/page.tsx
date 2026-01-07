'use client'
import React from 'react'
import { Brain, Calculator, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const ProjectHome = () => {
  const router = useRouter()

  const projects = [
    {
      id: 'quiz',
      title: 'BrainQuest Quiz',
      description: 'Interactive quiz app with timer and scoring',
      icon: Brain,
      color: 'bg-purple-500',
      route: '/Quiz'
    },
    {
      id: 'calculator',
      title: 'Calculator',
      description: 'Windows 11 style calculator',
      icon: Calculator,
      color: 'bg-teal-500',
      route: '/Calculator'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            My Mini Projects
          </h1>
          <p className="text-xl text-gray-600">
            Select a project to view
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project) => {
            const Icon = project.icon
            return (
              <div
                key={project.id}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
              >
                <div
                  className={`${project.color} w-16 h-16 rounded-xl flex items-center justify-center mb-4`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {project.title}
                </h3>

                <p className="text-gray-600 mb-6">
                  {project.description}
                </p>

                <button
                  onClick={() => router.push(project.route)}
                  className={`w-full ${project.color} text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-all flex items-center justify-center gap-2`}
                >
                  Open Project
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ProjectHome
