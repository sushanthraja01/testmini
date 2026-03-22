import { useState } from "react";
import {
  Dialog, DialogTrigger, DialogContent, DialogHeader,
  DialogTitle, DialogDescription, DialogFooter, DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";

function RightSection() {
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [n, setN] = useState(250);
  const [p, setP] = useState(30);
  const [k, setK] = useState(200);

  return (
    <div className="lg:col-span-1">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 shadow-lg space-y-6">

        {/* Heading */}
        <div>
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            🌱 Crop Recommendation
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Get ML-powered suggestions for the best crops to plant on this farm.
          </p>
        </div>

        {/* BUTTON (Initial View) */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="w-full bg-green-600 hover:bg-green-700 transition duration-200 
                       text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2"
          >
            Start Recommendation
          </button>
        )}

        {/* FORM (After Click) */}
        {showForm && (
          <form className="space-y-4">

            <div>
                          <Label>Nitrogen</Label>
                          <div className="flex gap-2">
                            <Input type="range" min="0" max="700" value={n}
                              onChange={(e) => setN(Number(e.target.value))} />
                            <input type="textbox" value={n} className="flex h-10 w-15 text-center rounded-md border border-input bg-background text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                              onChange={(e) => setN(Number(e.target.value))} />
                          </div>
                        </div>
            
                        <div>
                          <Label>Phosphorus</Label>
                          <div className="flex gap-2">
                            <Input type="range" min="0" max="80" value={p}
                              onChange={(e) => setP(Number(e.target.value))} />
                            <input type="textbox" value={p} className="flex h-10 w-15 text-center rounded-md border border-input bg-background text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                              onChange={(e) => setP(Number(e.target.value))} />
                          </div>
                        </div>
            
                        <div>
                          <Label>Potassium</Label>
                          <div className="flex gap-2">
                            <Input type="range" min="0" max="900" value={k}
                              onChange={(e) => setK(Number(e.target.value))} />
                            <input type="textbox" value={k} className="flex h-10 w-15 text-center rounded-md border border-input bg-background text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                              onChange={(e) => setK(Number(e.target.value))} />
                          </div>
                        </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              onClick={()=>setLoading(true)}
              className="w-full bg-green-600 hover:bg-green-700 transition duration-200 
                         text-white font-medium py-2.5 rounded-lg flex items-center justify-center gap-2"
            >
              {loading ? "Analyzing..." : "Get Recommendation"}
            </button>

          </form>
        )}

      </div>
    </div>
  );
}

export default RightSection;