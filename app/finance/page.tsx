import { Card, CardContent } from '@/components/ui/card';
import { LineChart, Sparkles } from 'lucide-react';

export default function FinancePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12 sm:px-6">
      <div className="flex items-center gap-3">
        <LineChart className="size-6 text-muted-foreground" />
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          <span className="gradient-text">Finance</span>
        </h1>
      </div>

      <Card className="mt-8">
        <CardContent className="flex flex-col items-center gap-3 p-10 text-center">
          <Sparkles className="size-10 text-muted-foreground" />
          <p className="text-lg font-medium">Coming soon.</p>
          <p className="max-w-md text-sm text-muted-foreground">
            A growing playground for personal finance experiments, market notes, and small tools.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
