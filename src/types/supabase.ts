export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      user_preferences: {
        Row: {
          user_id: string
          improvement_areas: string[]
          onboarded: boolean
          created_at?: string
          updated_at?: string
        }
        Insert: {
          user_id: string
          improvement_areas: string[]
          onboarded?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          user_id?: string
          improvement_areas?: string[]
          onboarded?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
