export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      automation_runs: {
        Row: {
          automation_id: string
          contact_id: string
          created_at: string
          current_step: number
          id: string
          last_error: string | null
          next_run_at: string
          status: string
          updated_at: string
        }
        Insert: {
          automation_id: string
          contact_id: string
          created_at?: string
          current_step?: number
          id?: string
          last_error?: string | null
          next_run_at?: string
          status?: string
          updated_at?: string
        }
        Update: {
          automation_id?: string
          contact_id?: string
          created_at?: string
          current_step?: number
          id?: string
          last_error?: string | null
          next_run_at?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "automation_runs_automation_id_fkey"
            columns: ["automation_id"]
            isOneToOne: false
            referencedRelation: "automations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "automation_runs_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      automation_steps: {
        Row: {
          automation_id: string
          campaign_id: string
          created_at: string
          delay_minutes: number
          id: string
          position: number
        }
        Insert: {
          automation_id: string
          campaign_id: string
          created_at?: string
          delay_minutes?: number
          id?: string
          position: number
        }
        Update: {
          automation_id?: string
          campaign_id?: string
          created_at?: string
          delay_minutes?: number
          id?: string
          position?: number
        }
        Relationships: [
          {
            foreignKeyName: "automation_steps_automation_id_fkey"
            columns: ["automation_id"]
            isOneToOne: false
            referencedRelation: "automations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "automation_steps_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
        ]
      }
      automations: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          name: string
          trigger: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          trigger?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          trigger?: string
          updated_at?: string
        }
        Relationships: []
      }
      campaigns: {
        Row: {
          created_at: string
          created_by: string | null
          from_email: string
          from_name: string
          html: string
          id: string
          name: string
          scheduled_at: string | null
          sent_at: string | null
          status: string
          subject: string
          target_tags: string[]
          updated_at: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          from_email?: string
          from_name?: string
          html?: string
          id?: string
          name: string
          scheduled_at?: string | null
          sent_at?: string | null
          status?: string
          subject: string
          target_tags?: string[]
          updated_at?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          from_email?: string
          from_name?: string
          html?: string
          id?: string
          name?: string
          scheduled_at?: string | null
          sent_at?: string | null
          status?: string
          subject?: string
          target_tags?: string[]
          updated_at?: string
        }
        Relationships: []
      }
      contacts: {
        Row: {
          company: string | null
          created_at: string
          email: string
          id: string
          name: string | null
          phone: string | null
          source: string
          tags: string[]
          unsubscribed: boolean
          updated_at: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          id?: string
          name?: string | null
          phone?: string | null
          source?: string
          tags?: string[]
          unsubscribed?: boolean
          updated_at?: string
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string | null
          phone?: string | null
          source?: string
          tags?: string[]
          unsubscribed?: boolean
          updated_at?: string
        }
        Relationships: []
      }
      email_sends: {
        Row: {
          automation_run_id: string | null
          bounced_at: string | null
          campaign_id: string | null
          clicked_at: string | null
          contact_id: string | null
          created_at: string
          delivered_at: string | null
          error: string | null
          id: string
          message_id: string | null
          opened_at: string | null
          recipient_email: string
          sent_at: string | null
          status: string
          subject: string | null
        }
        Insert: {
          automation_run_id?: string | null
          bounced_at?: string | null
          campaign_id?: string | null
          clicked_at?: string | null
          contact_id?: string | null
          created_at?: string
          delivered_at?: string | null
          error?: string | null
          id?: string
          message_id?: string | null
          opened_at?: string | null
          recipient_email: string
          sent_at?: string | null
          status?: string
          subject?: string | null
        }
        Update: {
          automation_run_id?: string | null
          bounced_at?: string | null
          campaign_id?: string | null
          clicked_at?: string | null
          contact_id?: string | null
          created_at?: string
          delivered_at?: string | null
          error?: string | null
          id?: string
          message_id?: string | null
          opened_at?: string | null
          recipient_email?: string
          sent_at?: string | null
          status?: string
          subject?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_sends_automation_run_id_fkey"
            columns: ["automation_run_id"]
            isOneToOne: false
            referencedRelation: "automation_runs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_sends_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_sends_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
        ]
      }
      form_submissions: {
        Row: {
          business_description: string | null
          client_acquisition_channels: string[] | null
          company: string | null
          created_at: string
          email: string
          form_type: string | null
          id: string
          name: string
          notes: string | null
          phone: string
          revenue: string | null
          segment: string | null
          service_type: string | null
          social_media_handle: string | null
          status: string
          updated_at: string
          website: string | null
        }
        Insert: {
          business_description?: string | null
          client_acquisition_channels?: string[] | null
          company?: string | null
          created_at?: string
          email: string
          form_type?: string | null
          id?: string
          name: string
          notes?: string | null
          phone: string
          revenue?: string | null
          segment?: string | null
          service_type?: string | null
          social_media_handle?: string | null
          status?: string
          updated_at?: string
          website?: string | null
        }
        Update: {
          business_description?: string | null
          client_acquisition_channels?: string[] | null
          company?: string | null
          created_at?: string
          email?: string
          form_type?: string | null
          id?: string
          name?: string
          notes?: string | null
          phone?: string
          revenue?: string | null
          segment?: string | null
          service_type?: string | null
          social_media_handle?: string | null
          status?: string
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      influencers: {
        Row: {
          bio: string | null
          city: string | null
          created_at: string
          email: string
          followers_count: string | null
          id: string
          instagram: string
          name: string
          niche: string | null
          phone: string
          status: string
          updated_at: string
        }
        Insert: {
          bio?: string | null
          city?: string | null
          created_at?: string
          email: string
          followers_count?: string | null
          id?: string
          instagram: string
          name: string
          niche?: string | null
          phone: string
          status?: string
          updated_at?: string
        }
        Update: {
          bio?: string | null
          city?: string | null
          created_at?: string
          email?: string
          followers_count?: string | null
          id?: string
          instagram?: string
          name?: string
          niche?: string | null
          phone?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      proposal_slides: {
        Row: {
          benefits: string
          company: string
          created_at: string
          id: string
          label: string
          position: number
          services: Json
          term: string
          updated_at: string
          value: string
        }
        Insert: {
          benefits?: string
          company?: string
          created_at?: string
          id?: string
          label?: string
          position?: number
          services?: Json
          term?: string
          updated_at?: string
          value?: string
        }
        Update: {
          benefits?: string
          company?: string
          created_at?: string
          id?: string
          label?: string
          position?: number
          services?: Json
          term?: string
          updated_at?: string
          value?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      complete_lead: {
        Args: {
          p_company: string | null
          p_email: string
          p_form_type: string | null
          p_id: string
          p_name: string
          p_notes: string | null
          p_phone: string
          p_revenue: string | null
          p_service_type: string | null
        }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
    },
  },
} as const
