import { useState, useCallback } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, InfoWindow, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import { MapPin, Info } from 'lucide-react';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

interface Location {
  id: number;
  name: string;
  lat: number;
  lng: number;
  dist: string;
  temp: string;
  type: 'hub' | 'fridge' | 'collection';
}

interface RealTimeMapProps {
  region: 'Kodikulam' | 'Othakadai';
  locations: Location[];
}

interface MarkerProps {
  loc: Location;
  key?: string | number;
}

function MarkerWithInfoWindow({ loc }: MarkerProps) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoWindowShown, setInfoWindowShown] = useState(false);

  const handleMarkerClick = useCallback(() => setInfoWindowShown(isShown => !isShown), []);
  const handleCloseClick = useCallback(() => setInfoWindowShown(false), []);

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={{ lat: loc.lat, lng: loc.lng }}
        onClick={handleMarkerClick}
        title={loc.name}
      >
        <div className="relative group">
          <div className="absolute -inset-1 bg-primary-500 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-500 animate-pulse" />
          <div className="relative w-10 h-10 bg-white rounded-2xl flex items-center justify-center border-2 border-primary-500 shadow-xl transform transition-transform group-hover:scale-110">
            <MapPin size={20} className="text-primary-600" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-secondary-500 rounded-full border-2 border-white" />
          </div>
        </div>
      </AdvancedMarker>

      {infoWindowShown && (
        <InfoWindow anchor={marker} onCloseClick={handleCloseClick}>
          <div className="p-2 min-w-[180px]">
             <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
                  <Refrigerator size={16} />
                </div>
                <h3 className="font-black text-slate-900 text-xs uppercase tracking-tight">{loc.name}</h3>
             </div>
             <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Status</p>
                  <p className="text-[10px] font-black text-primary-600">ACTIVE</p>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Vitals</p>
                  <p className="text-[10px] font-black text-slate-900">{loc.temp}</p>
                </div>
             </div>
             <p className="mt-3 text-[9px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1">
                <Info size={10} /> Distance: {loc.dist}
             </p>
          </div>
        </InfoWindow>
      )}
    </>
  );
}

import { Refrigerator } from 'lucide-react';

export default function RealTimeMap({ region, locations }: RealTimeMapProps) {
  const center = region === 'Kodikulam' ? { lat: 9.9405, lng: 78.1485 } : { lat: 9.9572, lng: 78.1728 };

  if (!hasValidKey) {
    return (
      <div className="w-full h-full bg-slate-900 flex items-center justify-center p-8 text-center rounded-[32px] overflow-hidden border border-white/10 shadow-inner group">
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#22c55e 0.5px, transparent 0.5px)', backgroundSize: '20px 20px' }}></div>
        <div className="max-w-md space-y-6 relative z-10">
          <div className="w-20 h-20 bg-primary-600/20 rounded-3xl flex items-center justify-center text-primary-500 mx-auto shadow-2xl shadow-primary-950">
            <MapPin size={40} />
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight uppercase tracking-[0.05em]">Google Maps Required</h2>
          <p className="text-slate-400 text-sm font-medium leading-relaxed">
            To view the real-time redistribution network, please add your Google Maps API Key in the settings.
          </p>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-left space-y-4">
             <div className="flex gap-3">
                <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0">1</div>
                <p className="text-[11px] text-slate-400 font-bold leading-snug">Open <span className="text-white">Settings</span> (⚙️) → <span className="text-white">Secrets</span></p>
             </div>
             <div className="flex gap-3">
                <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0">2</div>
                <p className="text-[11px] text-slate-400 font-bold leading-snug">Add <span className="text-primary-500">GOOGLE_MAPS_PLATFORM_KEY</span></p>
             </div>
             <div className="flex gap-3">
                <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-[10px] font-black text-white shrink-0">3</div>
                <p className="text-[11px] text-slate-400 font-bold leading-snug">Paste your key and press Enter. App will rebuild.</p>
             </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full rounded-[32px] overflow-hidden border border-slate-200 shadow-2xl">
      <APIProvider apiKey={API_KEY} version="weekly">
        <Map
          defaultCenter={center}
          center={center}
          defaultZoom={13}
          mapId="e8e3c4e3e3e3e3e3" // Example map ID
          className="w-full h-full"
          gestureHandling="greedy"
          disableDefaultUI={false}
          colorScheme="DARK"
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
        >
          {locations.map(loc => (
            <MarkerWithInfoWindow key={loc.id} loc={loc} />
          ))}
        </Map>
      </APIProvider>
    </div>
  );
}
