import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TerminalMonitorProps {
  activeView: 'problem' | 'solution'
}

const problemLogs = [
  { text: '$ ssh prod-server-01', type: 'command' },
  { text: 'Permission denied (publickey)', type: 'error' },
  { text: '$ ssh -i ~/.ssh/id_rsa prod-server-01', type: 'command' },
  { text: 'Connection timed out', type: 'error' },
  { text: '$ docker build -t app .', type: 'command' },
  { text: 'ERROR: failed to solve: process "/bin/sh -c npm install" did not complete successfully', type: 'error' },
  { text: 'exit code 137', type: 'error' },
  { text: '$ kubectl get pods', type: 'command' },
  { text: 'NAME                     READY   STATUS             RESTARTS   AGE', type: 'info' },
  { text: 'app-7f8b9c2d-x4k5p        0/1     CrashLoopBackOff   5          12m', type: 'error' },
  { text: 'app-3a4e5f6g-y7h8j        0/1     ImagePullBackOff   3          8m', type: 'error' },
  { text: 'FATAL: deployment failed — manual intervention required', type: 'error' },
]

const solutionLogs = [
  { text: '$ git push origin main', type: 'command' },
  { text: '✓ DockBit detected stack: Node.js + Express', type: 'success' },
  { text: '✓ Auto-generating Dockerfile...', type: 'success' },
  { text: '✓ Building image...', type: 'success' },
  { text: '✓ Build complete — 42s', type: 'success' },
  { text: '✓ Deploying to 3 regions...', type: 'success' },
  { text: '  → us-east-1: live', type: 'info' },
  { text: '  → eu-west-1: live', type: 'info' },
  { text: '  → ap-southeast-1: live', type: 'info' },
  { text: '✓ Health check passed — all services healthy', type: 'success' },
  { text: '→ View deployment: https://app.dockbit.io/deploy/abc123', type: 'success' },
]

const TerminalMonitor = ({ activeView }: TerminalMonitorProps) => {
  const [visibleLogs, setVisibleLogs] = useState<typeof problemLogs>([])
  const [currentLogIndex, setCurrentLogIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const logs = activeView === 'problem' ? problemLogs : solutionLogs

  useEffect(() => {
    setVisibleLogs([])
    setCurrentLogIndex(0)
  }, [activeView])

  useEffect(() => {
    if (currentLogIndex < logs.length) {
      const timer = setTimeout(() => {
        setVisibleLogs((prev) => [...prev, logs[currentLogIndex]])
        setCurrentLogIndex((prev) => prev + 1)
      }, 400)
      return () => clearTimeout(timer)
    } else {
      // Reset after showing all logs
      const resetTimer = setTimeout(() => {
        setVisibleLogs([])
        setCurrentLogIndex(0)
      }, 3000)
      return () => clearTimeout(resetTimer)
    }
  }, [currentLogIndex, logs])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [visibleLogs])

  const getLogColor = (type: string) => {
    switch (type) {
      case 'command':
        return 'text-cyan'
      case 'error':
        return 'text-red-400'
      case 'success':
        return 'text-green-400'
      case 'info':
        return 'text-gray-400'
      default:
        return 'text-white'
    }
  }

  return (
    <div className="relative h-full min-h-[400px]">
      {/* Glassmorphism panel */}
      <div className="relative h-full rounded-3xl bg-gradient-to-br from-white/60 to-white/30 dark:from-white/10 dark:to-white/5 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-[0_8px_32px_rgba(23,41,60,0.12)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] overflow-hidden">
        {/* Terminal window */}
        <div className="h-full flex flex-col">
          {/* Terminal title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-navy-dark/95 border-b border-white/10">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="flex-1 text-center">
              <span className="text-xs text-gray-400 font-mono">deploy.sh — dockbit</span>
            </div>
          </div>

          {/* Terminal body */}
          <div 
            ref={scrollRef}
            className="flex-1 p-4 bg-navy-dark/95 overflow-y-auto font-mono text-sm"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <AnimatePresence mode="popLayout">
              {visibleLogs.map((log, index) => (
                <motion.div
                  key={`${activeView}-${index}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className={`${getLogColor(log.type)} mb-1`}
                >
                  {log.text}
                </motion.div>
              ))}
            </AnimatePresence>
            
            {/* Blinking cursor */}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="inline-block w-2 h-4 bg-cyan ml-1"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TerminalMonitor
