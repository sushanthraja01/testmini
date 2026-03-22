import { useState, useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

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
import RightSection from "./RightSection";

export default function FarmDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [farm, setFarm] = useState(null);
  const [loading, setLoading] = useState(true);
  const url = import.meta.env.VITE_API_URL;

  
  useEffect(() => {
    const loadFarm = async () => {
      try {
        setLoading(true);

        const response = await fetch(`${url}/farm/getsinglefarm/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            token: localStorage.getItem("token"), 
          },
        });

        const data = await response.json();
        console.log(data)

        if (!data || data.status !== "success") {
          navigate("/dashboard");
          return;
        }

        const farmData = data.data;

        
        const formattedFarm = {
          ...farmData,
          location: farmData.locname || "Unknown",
          landAreaAcres: farmData.size || 0,
          soilType: "N/A",
          climate: "N/A",
          waterAvailability: farmData.humidity || "N/A",

          previousCrops:
            farmData.crops?.map((c) => ({
              id: c._id,
              name: c.name,
              year: new Date(c.recordedAt || Date.now()).getFullYear(),
            })) || [],
        };

        setFarm(formattedFarm);

      } catch (error) {
        console.error("Fetch error:", error);
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    loadFarm();
  }, [id, navigate]);

  // ✅ Memoized details
  const details = useMemo(() => {
    if (!farm) return [];

    return [
      { icon: MapPin, label: "Location", value: farm.location },
      { icon: LandPlot, label: "Land Area", value: `${farm.landAreaAcres} acres` },
      { icon: Layers, label: "Soil Type", value: farm.soilType },
      { icon: Wind, label: "Climate", value: farm.climate },
      { icon: Droplets, label: "Water Availability", value: farm.waterAvailability },
    ];
  }, [farm]);

  // ✅ Loading UI
  if (loading || !farm) {
    return (
      <div className="flex w-full flex-col items-center justify-center py-20 bg-gray-950 text-gray-300">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
        <p className="mt-4 text-gray-400">Loading farm details...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 bg-gray-950 text-gray-200 min-h-screen p-4">

      {/* 🔙 Back Button */}
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

        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-8">

          {/* 🌾 Farm Details */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Farm Details</CardTitle>
            </CardHeader>

            <CardContent>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                {details.map((detail) => {
                  const Icon = detail.icon;

                  return (
                    <div key={detail.label} className="flex items-start">
                      <Icon className="h-5 w-5 text-green-400 mr-3 mt-1" />

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

          {/* 🌱 Crop History */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">Crop History</CardTitle>
              <CardDescription className="text-gray-400">
                Crops cultivated in previous years.
              </CardDescription>
            </CardHeader>

            <CardContent>
              {(farm.previousCrops?.length ?? 0) > 0 ? (
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
                        <TableCell className="text-white font-medium">
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
                  No crop history available for this farm.
                </div>
              )}
            </CardContent>
          </Card>

        </div>

        {/* RIGHT SIDE */}
        <div className="lg:col-span-1">
          <RightSection />
        </div>

      </div>
    </div>
  );
}