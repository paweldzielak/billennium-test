export type LoginMethod = "login" | "register"

export type Note = {
  id: string | number
  title: string
  content: string
  date: string
  created_at: string
}

export type NoteType = Note