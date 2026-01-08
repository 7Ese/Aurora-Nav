import * as React from "react"
import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface PromptDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  placeholder?: string
  defaultValue?: string
  confirmText?: string
  cancelText?: string
  onConfirm: (value: string) => void
  onCancel?: () => void
}

export function PromptDialog({
  open,
  onOpenChange,
  title,
  description,
  placeholder,
  defaultValue = "",
  confirmText = "确认",
  cancelText = "取消",
  onConfirm,
  onCancel
}: PromptDialogProps) {
  const [value, setValue] = useState(defaultValue)

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue, open])

  const handleConfirm = () => {
    if (value.trim()) {
      onConfirm(value.trim())
      onOpenChange(false)
    }
  }

  const handleCancel = () => {
    onCancel?.()
    onOpenChange(false)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleConfirm()
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-glass-bg/90 backdrop-blur-md border border-glass-border text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-white">{title}</DialogTitle>
          {description && (
            <DialogDescription className="text-white/70">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="input" className="text-white/80 text-sm">
            请输入内容
          </Label>
          <Input
            id="input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
            onKeyPress={handleKeyPress}
            autoFocus
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-white/40 focus:ring-white/20"
          />
        </div>
        <DialogFooter className="gap-2">
          <Button 
            variant="outline" 
            onClick={handleCancel}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            {cancelText}
          </Button>
          <Button 
            onClick={handleConfirm}
            disabled={!value.trim()}
            className="bg-theme-primary/80 hover:bg-theme-primary text-white border-0"
          >
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}