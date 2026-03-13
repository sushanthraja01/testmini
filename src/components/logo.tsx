import { Leaf } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return <Leaf className={cn('h-6 w-6', className)} />;
}
