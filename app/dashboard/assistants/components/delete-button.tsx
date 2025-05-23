"use client"

import { useState } from "react"
import { TrashIcon } from "@heroicons/react/24/outline"
import { deleteAssistant } from "../lib/actions"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export default function DeleteButton({ id, name }: { id: string; name: string }) {
    const router = useRouter()
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        setIsDeleting(true)
        try {
            const result = await deleteAssistant(id, name)

            if (result.success && result.redirect) {
                router.push(result.redirect)
            } else if (!result.success) {
                console.error("Error deleting assistant:", result.message)
                alert(`Error: ${result.message}`)
                setIsDeleting(false)
            }
        } catch (error) {
            console.error("Error deleting assistant:", error)
            setIsDeleting(false)
        }
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/90">
                    <TrashIcon className="size-5" />
                    <span className="sr-only">Delete</span>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Assistant</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete <span className="font-medium">{name}</span>? This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        {isDeleting ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

