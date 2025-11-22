// components/shared/VideoEmbed.tsx
'use client'

interface VideoEmbedProps {
  url: string
}

export function VideoEmbed({ url }: VideoEmbedProps) {
  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)
    return match ? match[1] : null
  }

  const videoId = getYouTubeId(url)

  if (!videoId) {
    return (
      <div className="aspect-video bg-bright-ocean-200 dark:bg-yale-blue-800 rounded-lg flex items-center justify-center">
        <p className="text-bright-ocean-600 dark:text-yale-blue-400">Invalid video URL</p>
      </div>
    )
  }

  return (
    <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  )
}