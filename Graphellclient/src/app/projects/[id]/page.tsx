// src/app/projects/[id]/page.tsx
import ProjectClient from './projectclient';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProjectPage({ params }: PageProps) {
  const resolvedParams = await params;
  return <ProjectClient id={resolvedParams.id} />;
}

