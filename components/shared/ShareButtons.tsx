// components/shared/ShareButtons.tsx
'use client'

import { Facebook, Twitter, Link2, Mail } from 'lucide-react'
import { useState } from 'react'

interface ShareButtonsProps {
  title: string
  url: string
  image?: string
}

export function ShareButtons({ title, url, image }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${title}\n\n${url}`)}`,
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <a
        href={shareLinks.facebook}
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-300"
        title="Share on Facebook"
      >
        <Facebook className="w-5 h-5" />
      </a>

      <a
        href={shareLinks.twitter}
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 bg-blue-400 hover:bg-blue-500 text-white rounded-lg transition-colors duration-300"
        title="Share on Twitter"
      >
        <Twitter className="w-5 h-5" />
      </a>

      <a
        href={shareLinks.email}
        className="p-3 bg-bright-ocean-500 hover:bg-bright-ocean-600 text-white rounded-lg transition-colors duration-300"
        title="Share via Email"
      >
        <Mail className="w-5 h-5" />
      </a>

      <button
        onClick={copyToClipboard}
        className={`p-3 rounded-lg transition-colors duration-300 ${
          copied
            ? 'bg-green-500 text-white'
            : 'bg-bright-ocean-200 hover:bg-bright-ocean-300 dark:bg-yale-blue-700 dark:hover:bg-yale-blue-600 text-bright-ocean-700 dark:text-yale-blue-300'
        }`}
        title="Copy link"
      >
        <Link2 className="w-5 h-5" />
      </button>
    </div>
  )
}