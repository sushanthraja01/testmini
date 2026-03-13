'use client';

import { useEffect, useRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PlusCircle } from 'lucide-react';
import { addFarmAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from './ui/textarea';

const initialState = {
  message: '',
  errors: {},
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Adding Farm...' : 'Add Farm'}
    </Button>
  );
}

export function AddFarmDialog() {
  const [state, formAction] = useFormState(addFarmAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (state.message === 'success') {
      toast({
        title: 'Success!',
        description: 'Your farm has been added.',
      });
      formRef.current?.reset();
      closeButtonRef.current?.click();
    } else if (state.message && state.message !== 'Validation Error') {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.message,
      });
    }
  }, [state, toast]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Farm</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a New Farm</DialogTitle>
          <DialogDescription>Fill in the details about your new farm.</DialogDescription>
        </DialogHeader>
        <form action={formAction} ref={formRef} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Farm Name
            </Label>
            <Input id="name" name="name" className="col-span-3" />
            {state.errors?.name && <p className="col-span-4 text-xs text-red-500 text-right">{state.errors.name}</p>}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">
              Location
            </Label>
            <Input id="location" name="location" className="col-span-3" />
            {state.errors?.location && <p className="col-span-4 text-xs text-red-500 text-right">{state.errors.location}</p>}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="landAreaAcres" className="text-right">
              Area (Acres)
            </Label>
            <Input id="landAreaAcres" name="landAreaAcres" type="number" className="col-span-3" />
            {state.errors?.landAreaAcres && <p className="col-span-4 text-xs text-red-500 text-right">{state.errors.landAreaAcres}</p>}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="soilType" className="text-right">
              Soil Type
            </Label>
            <Textarea id="soilType" name="soilType" className="col-span-3" />
            {state.errors?.soilType && <p className="col-span-4 text-xs text-red-500 text-right">{state.errors.soilType}</p>}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="climate" className="text-right">
              Climate
            </Label>
            <Textarea id="climate" name="climate" className="col-span-3" />
            {state.errors?.climate && <p className="col-span-4 text-xs text-red-500 text-right">{state.errors.climate}</p>}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="waterAvailability" className="text-right">
              Water
            </Label>
            <Textarea id="waterAvailability" name="waterAvailability" className="col-span-3" />
            {state.errors?.waterAvailability && (
              <p className="col-span-4 text-xs text-red-500 text-right">{state.errors.waterAvailability}</p>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary" ref={closeButtonRef}>
                Cancel
              </Button>
            </DialogClose>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
