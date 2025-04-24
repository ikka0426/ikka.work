"use client";

import { useEffect, useRef, useState } from "react";
import { Skeleton } from "./ui/skeleton";

export function Utterances() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://utteranc.es/client.js'
    script.setAttribute('repo', 'ikka0426/ikka.work')
    script.setAttribute('issue-term', 'pathname')
    script.setAttribute('theme', 'github-light')
    script.setAttribute('crossorigin', 'anonymous')
    script.async = true
    
    setTimeout(() => {
      if (ref.current && !ref.current.querySelector('script[src="https://utteranc.es/client.js"]')) {
        ref.current.append(script)
      }
    }, 300)
  }, [])

  return <div ref={ref} />
}