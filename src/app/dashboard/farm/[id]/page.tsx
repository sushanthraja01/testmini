import { notFound } from 'next/navigation';
import { getFarmById } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MapPin, LandPlot, Layers, Wind, Droplets, ChevronLeft, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { RecommendationSection } from '@/components/recommendation-section';
import type { Farm } from '@/lib/types';

export default async function FarmDetailPage({ params }: { params: { id: string } }) {
  const farm = await getFarmById(params.id);

  if (!farm) {
    notFound();
  }

  const details = [
    { icon: MapPin, label: 'Location', value: farm.location },
    { icon: LandPlot, label: 'Land Area', value: `${farm.landAreaAcres} acres` },
    { icon: Layers, label: 'Soil Type', value: farm.soilType },
    { icon: Wind, label: 'Climate', value: farm.climate },
    { icon: Droplets, label: 'Water Availability', value: farm.waterAvailability },
  ];

  return (
    <div className="space-y-8">
      <div>
        <Button asChild variant="ghost" size="sm" className="mb-4">
          <Link href="/dashboard">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
        </Button>
        <h1 className="text-3xl font-bold font-headline">{farm.name}</h1>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Farm Details</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                {details.map((detail) => (
                  <div key={detail.label} className="flex items-start">
                    <detail.icon className="h-5 w-5 text-muted-foreground mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <dt className="font-medium">{detail.label}</dt>
                      <dd className="text-muted-foreground">{detail.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Crop History</CardTitle>
              <CardDescription>Crops cultivated in previous years.</CardDescription>
            </CardHeader>
            <CardContent>
              {farm.previousCrops.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Crop Name</TableHead>
                      <TableHead className="text-right">Year</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {farm.previousCrops.map((crop) => (
                      <TableRow key={crop.id}>
                        <TableCell className="font-medium">{crop.name}</TableCell>
                        <TableCell className="text-right">{crop.year}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center text-muted-foreground py-8">
                  <p>No crop history available for this farm.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <RecommendationSection farm={farm as Farm} />
        </div>
      </div>
    </div>
  );
}
