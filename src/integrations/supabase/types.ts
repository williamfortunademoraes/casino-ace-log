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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      apostas: {
        Row: {
          casa_id: string | null
          created_at: string | null
          data: string | null
          id: string
          jogo_id: string | null
          lucro: number | null
          observacao: string | null
          resultado: string | null
          screenshot_url: string | null
          user_id: string
          valor_apostado: number
          valor_ganho: number
        }
        Insert: {
          casa_id?: string | null
          created_at?: string | null
          data?: string | null
          id?: string
          jogo_id?: string | null
          lucro?: number | null
          observacao?: string | null
          resultado?: string | null
          screenshot_url?: string | null
          user_id: string
          valor_apostado: number
          valor_ganho?: number
        }
        Update: {
          casa_id?: string | null
          created_at?: string | null
          data?: string | null
          id?: string
          jogo_id?: string | null
          lucro?: number | null
          observacao?: string | null
          resultado?: string | null
          screenshot_url?: string | null
          user_id?: string
          valor_apostado?: number
          valor_ganho?: number
        }
        Relationships: [
          {
            foreignKeyName: "apostas_casa_id_fkey"
            columns: ["casa_id"]
            isOneToOne: false
            referencedRelation: "casas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "apostas_jogo_id_fkey"
            columns: ["jogo_id"]
            isOneToOne: false
            referencedRelation: "jogos"
            referencedColumns: ["id"]
          },
        ]
      }
      casas: {
        Row: {
          autorizada_governo: boolean | null
          created_at: string | null
          favorito: boolean | null
          id: string
          link: string | null
          logo: string | null
          lucro_total: number | null
          nome: string
          total_ganho: number | null
          total_gasto: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          autorizada_governo?: boolean | null
          created_at?: string | null
          favorito?: boolean | null
          id?: string
          link?: string | null
          logo?: string | null
          lucro_total?: number | null
          nome: string
          total_ganho?: number | null
          total_gasto?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          autorizada_governo?: boolean | null
          created_at?: string | null
          favorito?: boolean | null
          id?: string
          link?: string | null
          logo?: string | null
          lucro_total?: number | null
          nome?: string
          total_ganho?: number | null
          total_gasto?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      jogos: {
        Row: {
          categoria: string
          created_at: string | null
          favorito: boolean | null
          id: string
          imagem_promocional: string | null
          lucro_total: number | null
          nome: string
          provider: string | null
          rtp_teorico: number | null
          total_ganho: number | null
          total_gasto: number | null
          total_jogadas: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          categoria: string
          created_at?: string | null
          favorito?: boolean | null
          id?: string
          imagem_promocional?: string | null
          lucro_total?: number | null
          nome: string
          provider?: string | null
          rtp_teorico?: number | null
          total_ganho?: number | null
          total_gasto?: number | null
          total_jogadas?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          categoria?: string
          created_at?: string | null
          favorito?: boolean | null
          id?: string
          imagem_promocional?: string | null
          lucro_total?: number | null
          nome?: string
          provider?: string | null
          rtp_teorico?: number | null
          total_ganho?: number | null
          total_gasto?: number | null
          total_jogadas?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          dias_ativos: number | null
          id: string
          nivel: number | null
          updated_at: string | null
          username: string | null
          vip_nivel: string | null
          xp: number | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          dias_ativos?: number | null
          id: string
          nivel?: number | null
          updated_at?: string | null
          username?: string | null
          vip_nivel?: string | null
          xp?: number | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          dias_ativos?: number | null
          id?: string
          nivel?: number | null
          updated_at?: string | null
          username?: string | null
          vip_nivel?: string | null
          xp?: number | null
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
          role?: Database["public"]["Enums"]["app_role"]
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
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
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
      app_role: ["admin", "user"],
    },
  },
} as const
