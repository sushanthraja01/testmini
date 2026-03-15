import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getFarmById } from "@/lib/data.js";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card.jsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.jsx";
import {
  MapPin,
  LandPlot,
  Layers,
  Wind,
  Droplets,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import { RecommendationSection } from "@/components/recommendation-section.jsx";

export default function FarmDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [farm, setFarm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFarm = async () => {
      setLoading(true);

      const data = await getFarmById(id);

      if (!data) {
        navigate("/dashboard");
        return;
      }

      setFarm(data);
      setLoading(false);
    };

    loadFarm();
  }, [id, navigate]);

  if (loading || !farm) {
    return (
      <div className="flex w-full flex-col items-center justify-center py-20 bg-gray-950 text-gray-300">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
        <p className="mt-4 text-gray-400">Loading farm details...</p>
      </div>
    );
  }

  const details = [
    { icon: MapPin, label: "Location", value: farm.location },
    { icon: LandPlot, label: "Land Area", value: `${farm.landAreaAcres} acres` },
    { icon: Layers, label: "Soil Type", value: farm.soilType },
    { icon: Wind, label: "Climate", value: farm.climate },
    { icon: Droplets, label: "Water Availability", value: farm.waterAvailability },
  ];

  return (
    <div className="space-y-8 bg-gray-950 text-gray-200 min-h-screen p-4">

      <div>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="mb-4 text-gray-300 hover:bg-gray-800"
        >
          <Link to="/dashboard">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Dashboard
          </Link>
        </Button>

        <h1 className="text-3xl font-bold text-white">{farm.name}</h1>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

        <div className="lg:col-span-2 space-y-8">

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Farm Details</CardTitle>
            </CardHeader>

            <CardContent>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                {details.map((detail) => {
                  const IconComponent = detail.icon;

                  return (
                    <div key={detail.label} className="flex items-start">
                      <IconComponent className="h-5 w-5 text-green-400 mr-3 mt-1 flex-shrink-0" />

                      <div>
                        <dt className="font-medium text-white">
                          {detail.label}
                        </dt>

                        <dd className="text-gray-400">
                          {detail.value}
                        </dd>
                      </div>
                    </div>
                  );
                })}
              </dl>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Crop History</CardTitle>
              <CardDescription className="text-gray-400">
                Crops cultivated in previous years.
              </CardDescription>
            </CardHeader>

            <CardContent>
              {farm.previousCrops.length > 0 ? (
                <Table>

                  <TableHeader>
                    <TableRow className="border-gray-800">
                      <TableHead className="text-gray-300">
                        Crop Name
                      </TableHead>

                      <TableHead className="text-right text-gray-300">
                        Year
                      </TableHead>
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {farm.previousCrops.map((crop) => (
                      <TableRow
                        key={crop.id}
                        className="border-gray-800 hover:bg-gray-800"
                      >
                        <TableCell className="font-medium text-white">
                          {crop.name}
                        </TableCell>

                        <TableCell className="text-right text-gray-300">
                          {crop.year}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>

                </Table>
              ) : (
                <div className="text-center text-gray-400 py-8">
                  <p>No crop history available for this farm.</p>
                </div>
              )}
            </CardContent>
          </Card>

        </div>

        <div className="lg:col-span-1">
          <RecommendationSection farm={farm} />
        </div>

      </div>
    </div>
  );
}