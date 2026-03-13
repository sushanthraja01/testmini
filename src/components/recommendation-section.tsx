'use client';

import { getRecommendationAction } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Farm } from '@/lib/types';
import { Bot, Loader2, Sprout, TestTube, Thermometer, Droplets, BookOpen, Lightbulb } from 'lucide-react';
import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';

const initialState = {
  status: 'idle',
  data: null,
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
      {pending ? 'Analyzing...' : 'Get Recommendation'}
    </Button>
  );
}

export function RecommendationSection({ farm }: { farm: Farm }) {
  const [showForm, setShowForm] = useState(false);
  const [state, formAction] = useFormState(getRecommendationAction, initialState);

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Crop Recommendation</CardTitle>
        <CardDescription>
          Get AI-powered suggestions for the best crops to plant on this farm.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!showForm && (
          <Button onClick={() => setShowForm(true)} className="w-full">
            <Bot className="mr-2 h-4 w-4" /> Start Recommendation
          </Button>
        )}

        {showForm && (
          <form action={formAction} className="space-y-6">
            <p className="text-sm text-muted-foreground">Confirm or edit the farm details below for the most accurate recommendation.</p>
            <input type="hidden" name="farmName" value={farm.name} />
            <input type="hidden" name="location" value={farm.location} />
            <input type="hidden" name="landAreaAcres" value={farm.landAreaAcres} />
            
            <div className="grid gap-2">
              <Label htmlFor="soilType">Soil Type</Label>
              <Textarea id="soilType" name="soilType" defaultValue={farm.soilType} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="climateData">Climate Data</Label>
              <Textarea id="climateData" name="climateData" defaultValue={farm.climate} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="waterAvailability">Water Availability</Label>
              <Textarea id="waterAvailability" name="waterAvailability" defaultValue={farm.waterAvailability} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="previousCrops">Previous Crops (comma-separated)</Label>
              <Input id="previousCrops" name="previousCrops" defaultValue={farm.previousCrops.map(c => c.name).join(', ')} />
            </div>

            <SubmitButton />
          </form>
        )}

        {state.status === 'error' && <p className="mt-4 text-red-500">{state.message}</p>}

        {state.status === 'success' && state.data && (
          <div className="mt-6 space-y-6">
            <h3 className="text-xl font-semibold font-headline">Recommendation Results</h3>
            <div className="space-y-4">
              {state.data.recommendedCrops.map((crop) => (
                <Card key={crop.cropName} className="bg-background/50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-primary">
                      <Sprout /> {crop.cropName}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div>
                      <h4 className="font-semibold flex items-center gap-2"><Lightbulb className="h-4 w-4 text-accent-foreground" />Reason</h4>
                      <p className="text-muted-foreground">{crop.reason}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold flex items-center gap-2"><TestTube className="h-4 w-4 text-accent-foreground" />Optimal Conditions</h4>
                      <p className="text-muted-foreground">{crop.optimalConditions}</p>
                    </div>
                     <div>
                      <h4 className="font-semibold flex items-center gap-2"><Thermometer className="h-4 w-4 text-accent-foreground" />Estimated Yield Potential</h4>
                      <p className="text-muted-foreground">{crop.estimatedYieldPotential}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
             <Card className="mt-6 border-accent">
               <CardHeader>
                 <CardTitle className="flex items-center gap-2">
                   <BookOpen className="h-5 w-5"/> General Advice
                 </CardTitle>
               </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{state.data.generalAdvice}</p>
                </CardContent>
             </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
