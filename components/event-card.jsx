"use client";

import {
  Calendar,
  MapPin,
  Users,
  Trash2,
  X,
  QrCode,
  Eye,
} from "lucide-react";

import { format } from "date-fns";
import Image from "next/image";

import { getCategoryImage } from "@/lib/data";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function EventCard({
  event,
  onClick,
  onDelete,
  variant = "grid",
  action = null,
  className = "",
}) {
  // LIST VARIANT
  if (variant === "list") {
    return (
      <Card
        className={`py-0 group cursor-pointer hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 hover:border-purple-500/50 ${className}`}
        onClick={onClick}
      >
        <CardContent className="p-3 flex gap-3">
          <div className="w-20 h-20 rounded-lg shrink-0 overflow-hidden relative">
            <Image
              src={
                event.coverImage ||
                getCategoryImage(event.category)
              }
              alt={event.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm mb-1 group-hover:text-purple-400 transition-colors line-clamp-2">
              {event.title}
            </h3>

            <p className="text-xs text-muted-foreground mb-1">
              {format(event.startDate, "EEE, dd MMM, HH:mm")}
            </p>

            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
              <MapPin className="w-3 h-3" />
              <span className="line-clamp-1">
                {event.locationType === "online"
                  ? "Online Event"
                  : event.city}
              </span>
            </div>

            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="w-3 h-3" />
              <span>
                {event.registrationCount} attending
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // GRID VARIANT
  return (
    <Card
      className={`overflow-hidden py-0 bg-gradient-to-b from-zinc-900 to-black border border-white/10 rounded-3xl group transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] hover:border-purple-500/50 hover:shadow-[0_20px_50px_rgba(168,85,247,0.25)] ${onClick ? "cursor-pointer" : ""
        } ${className}`}
      onClick={onClick}
    >
      {/* IMAGE SECTION */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={
            event.coverImage ||
            getCategoryImage(event.category)
          }
          alt={event.title}
          fill
          priority
          className="object-cover group-hover:scale-125 transition-transform duration-1000"
        />

        {/* OVERLAYS */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* CATEGORY */}
        <div className="absolute top-4 left-4">
          <Badge className="bg-purple-600/80 backdrop-blur-md border-none text-white">
            {event.category}
          </Badge>
        </div>

        {/* FREE / PAID */}
        <div className="absolute top-4 right-4">
          <Badge className="bg-black/60 backdrop-blur-xl border border-white/10 text-white">
            {event.ticketType === "free"
              ? "Free"
              : "Paid"}
          </Badge>
        </div>

        {/* DATE RIBBON */}
        <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-xl px-4 py-2 rounded-xl border border-white/10">
          <p className="text-xs text-zinc-400">
            {format(event.startDate, "MMM")}
          </p>

          <p className="font-bold text-xl leading-none text-white">
            {format(event.startDate, "dd")}
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <CardContent className="p-5 space-y-4">
        {/* TITLE */}
        <div>
          <h3 className="font-bold text-2xl leading-snug line-clamp-2 bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-pink-300 transition-all duration-500">
            {event.title}
          </h3>
        </div>

        {/* DETAILS */}
        <div className="space-y-3 text-sm text-muted-foreground bg-white/5 border border-white/5 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-purple-400" />
            <span>
              {format(
                event.startDate,
                "EEE, dd MMM, HH:mm"
              )}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-pink-400" />
            <span className="line-clamp-1">
              {event.locationType === "online"
                ? "Online Event"
                : event.city}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Users className="w-4 h-4 text-blue-400" />
            <span>
              {event.registrationCount} attending
            </span>
          </div>
        </div>

        {/* ACTIONS */}
        {action && (
          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              className="flex-1 gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 border-0"
              onClick={(e) => {
                e.stopPropagation();
                onClick?.(e);
              }}
            >
              {action === "event" ? (
                <>
                  <Eye className="w-4 h-4" />
                  View Event
                </>
              ) : (
                <>
                  <QrCode className="w-4 h-4" />
                  Show Ticket
                </>
              )}
            </Button>

            {onDelete && (
              <Button
                variant="outline"
                size="sm"
                className="rounded-xl border-red-500/30 text-red-400 hover:bg-red-500/10"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(event._id);
                }}
              >
                {action === "event" ? (
                  <Trash2 className="w-4 h-4" />
                ) : (
                  <X className="w-4 h-4" />
                )}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}