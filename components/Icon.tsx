import React from 'react';
import { 
  Calendar, 
  ShieldAlert, 
  Users, 
  Layers, 
  MessageSquare, 
  RefreshCw, 
  DollarSign, 
  Activity, 
  CheckCircle, 
  Smile,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Sparkles,
  Rocket,
  Zap,
  BarChart3,
  Lock
} from 'lucide-react';

const icons: Record<string, React.FC<any>> = {
  Calendar,
  ShieldAlert,
  Users,
  Layers,
  MessageSquare,
  RefreshCw,
  DollarSign,
  Activity,
  CheckCircle,
  Smile,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Sparkles,
  Rocket,
  Zap,
  BarChart3,
  Lock
};

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({ name, className, size = 24 }) => {
  const IconComponent = icons[name];
  if (!IconComponent) return null;
  return <IconComponent className={className} size={size} />;
};