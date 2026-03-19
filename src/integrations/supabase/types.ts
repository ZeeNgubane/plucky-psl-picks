export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      players: {
        Row: {
          id: number
          created_at: string
          Name: string
          position: string
          team: string
          "GW points": string | null
          "total points": string | null
          form: string | null
          selection_percentage: number | null
          price: number | null
          price_change: number | null
        }
        Insert: {
          id?: number
          created_at?: string
          Name: string
          position: string
          team: string
          "GW points"?: string | null
          "total points"?: string | null
          form?: string | null
          selection_percentage?: number | null
          price?: number | null
          price_change?: number | null
        }
        Update: {
          id?: number
          created_at?: string
          Name?: string
          position?: string
          team?: string
          "GW points"?: string | null
          "total points"?: string | null
          form?: string | null
          selection_percentage?: number | null
          price?: number | null
          price_change?: number | null
        }
        Relationships: []
      }
      fixtures: {
        Row: {
          away_score: number | null
          away_team: string
          created_at: string
          home_score: number | null
          home_team: string
          id: string
          match_date: string
          match_time: string | null
          matchday: number | null
          season: string | null
          status: string
          updated_at: string
          venue: string | null
        }
        Insert: {
          away_score?: number | null
          away_team: string
          created_at?: string
          home_score?: number | null
          home_team: string
          id?: string
          match_date: string
          match_time?: string | null
          matchday?: number | null
          season?: string | null
          status?: string
          updated_at?: string
          venue?: string | null
        }
        Update: {
          away_score?: number | null
          away_team?: string
          created_at?: string
          home_score?: number | null
          home_team?: string
          id?: string
          match_date?: string
          match_time?: string | null
          matchday?: number | null
          season?: string | null
          status?: string
          updated_at?: string
          venue?: string | null
        }
        Relationships: []
      }
      leaderboard: {
        Row: {
          gameweek_points: number
          id: string
          rank: number | null
          total_points: number
          updated_at: string
          user_id: string
        }
        Insert: {
          gameweek_points?: number
          id?: string
          rank?: number | null
          total_points?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          gameweek_points?: number
          id?: string
          rank?: number | null
          total_points?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      performer_likes: {
        Row: {
          created_at: string
          gameweek: number
          id: string
          player_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          gameweek: number
          id?: string
          player_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          gameweek?: number
          id?: string
          player_id?: string
          user_id?: string
        }
        Relationships: []
      }
      player_match_stats: {
        Row: {
          assists: number
          bonus_points: number
          clean_sheets: number
          created_at: string
          gameweek: number
          goals: number
          goals_conceded: number
          id: string
          minutes_played: number
          player_id: string
          red_cards: number
          total_points: number
          yellow_cards: number
        }
        Insert: {
          assists?: number
          bonus_points?: number
          clean_sheets?: number
          created_at?: string
          gameweek: number
          goals?: number
          goals_conceded?: number
          id?: string
          minutes_played?: number
          player_id: string
          red_cards?: number
          total_points?: number
          yellow_cards?: number
        }
        Update: {
          assists?: number
          bonus_points?: number
          clean_sheets?: number
          created_at?: string
          gameweek?: number
          goals?: number
          goals_conceded?: number
          id?: string
          minutes_played?: number
          player_id?: string
          red_cards?: number
          total_points?: number
          yellow_cards?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      standings: {
        Row: {
          created_at: string
          draws: number
          form: string[] | null
          goal_difference: number
          goals_against: number
          goals_for: number
          id: string
          losses: number
          played: number
          points: number
          position: number
          season: string | null
          team_name: string
          updated_at: string
          wins: number
        }
        Insert: {
          created_at?: string
          draws?: number
          form?: string[] | null
          goal_difference?: number
          goals_against?: number
          goals_for?: number
          id?: string
          losses?: number
          played?: number
          points?: number
          position?: number
          season?: string | null
          team_name: string
          updated_at?: string
          wins?: number
        }
        Update: {
          created_at?: string
          draws?: number
          form?: string[] | null
          goal_difference?: number
          goals_against?: number
          goals_for?: number
          id?: string
          losses?: number
          played?: number
          points?: number
          position?: number
          season?: string | null
          team_name?: string
          updated_at?: string
          wins?: number
        }
        Relationships: []
      }
      teams: {
        Row: {
          created_at: string
          id: string
          logo_url: string | null
          name: string
          short_name: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          logo_url?: string | null
          name: string
          short_name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          logo_url?: string | null
          name?: string
          short_name?: string | null
        }
        Relationships: []
      }
      user_team_selections: {
        Row: {
          id: string
          is_captain: boolean
          is_starter: boolean
          player_id: string
          selected_at: string
          user_id: string
        }
        Insert: {
          id?: string
          is_captain?: boolean
          is_starter?: boolean
          player_id: string
          selected_at?: string
          user_id: string
        }
        Update: {
          id?: string
          is_captain?: boolean
          is_starter?: boolean
          player_id?: string
          selected_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
