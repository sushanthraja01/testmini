import Link from 'next/link';
import { getFarms } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LandPlot, MapPin } from 'lucide-react';
import { AddFarmDialog } from '@/components/add-farm-dialog';

export default async function Dashboard() {
  const farms = await getFarms();

  return (
    <div className="flex w-full flex-col">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl font-headline">Your Farms</h1>
        <div className="ml-auto flex items-center gap-2">
          <AddFarmDialog />
        </div>
      </div>

      {farms.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4 mt-4">
          {farms.map((farm) => (
            <Link href={`/dashboard/farm/${farm.id}`} key={farm.id}>
              <Card className="hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-xl font-medium font-headline">{farm.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="flex items-center text-sm text-muted-foreground mt-2">
                    <MapPin className="mr-2 h-4 w-4" />
                    <span>{farm.location}</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mt-2">
                    <LandPlot className="mr-2 h-4 w-4" />
                    <span>{farm.landAreaAcres} acres</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm mt-4" x-chunk="dashboard-02-chunk-1">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">You have no farms yet</h3>
            <p className="text-sm text-muted-foreground">Get started by adding your first farm.</p>
            <div className="mt-4">
              <AddFarmDialog />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
