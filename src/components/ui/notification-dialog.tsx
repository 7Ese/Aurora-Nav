import * as React from "react"
import { CheckCircle, AlertCircle, XCircle, Info } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface NotificationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  type?: "success" | "error" | "warning" | "info"
  confirmText?: string
}

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
}

const colorMap = {
  success: "text-green-400",
  error: "text-red-400", 
  warning: "text-yellow-400",
  info: "text-blue-400",
}

export function NotificationDialog({
  open,
  onOpenChange,
  title,
  description,
  type = "info",
  confirmText = "确定"
}: NotificationDialogProps) {
  const Icon = iconMap[type]

  const handleConfirm = () => {
    onOpenChange(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-glass-bg/90 backdrop-blur-md border border-glass-border text-white">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <Icon className={`w-6 h-6 ${colorMap[type]}`} />
            <AlertDialogTitle className="text-white text-left">{title}</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-white/70 text-left">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction 
            onClick={handleConfirm}
            className="bg-theme-primary/80 hover:bg-theme-primary text-white border-0"
          >
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}