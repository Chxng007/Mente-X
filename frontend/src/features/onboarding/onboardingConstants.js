import {
    Sparkles, Heart, Droplet, Music2, Zap, Waves, Mic2, PersonStanding,
    Footprints, TrendingUp, Star,
} from 'lucide-react'

export const DANCE_STYLES = [
    { value: 'SALSA', label: 'Salsa', icon: Sparkles },
    { value: 'BACHATA', label: 'Bachata', icon: Heart },
    { value: 'CHAMPETA', label: 'Champeta', icon: Droplet },
    { value: 'HIP_HOP', label: 'Hip Hop', icon: Music2 },
    { value: 'BREAKDANCE', label: 'Breakdance', icon: Zap },
    { value: 'MERENGUE', label: 'Merengue', icon: Waves },
    { value: 'REGGAETON', label: 'Reggaetón', icon: Mic2 },
    { value: 'FOLKLORE', label: 'Folklore', icon: PersonStanding },
]

export const LEVEL_OPTIONS = [
    { value: 'BEGINNER', label: 'Principiante', icon: Footprints },
    { value: 'INTERMEDIATE', label: 'Intermedio', icon: TrendingUp },
    { value: 'ADVANCED', label: 'Avanzado', icon: Star },
]