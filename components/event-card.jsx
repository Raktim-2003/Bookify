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
      className={`overflow-hidden py-0 bg-gradient-to-b from-zinc-900 to-black border border-white/10 rounded-2xl group transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/10 ${onClick ? "cursor-pointer" : ""
        } ${className}`}
      onClick={onClick}
    >
      {/* IMAGE SECTION */}
      <div className="relative h-40 overflow-hidden">
        <Image
          src={
            event.coverImage ||
            getCategoryImage(event.category)
          }
          alt={event.title}
          fill
          priority
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {/* CATEGORY */}
        <div className="absolute top-3 left-3">
          <Badge className="bg-purple-600/90 text-white border-0 text-xs px-2 py-0">
            {event.category}
          </Badge>
        </div>

        {/* FREE / PAID */}
        <div className="absolute top-3 right-3">
          <Badge className="bg-black/70 text-white border border-white/10 text-xs">
            {event.ticketType === "free" ? "Free" : "Paid"}
          </Badge>
        </div>

        {/* DATE */}
        <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10">
          <p className="text-[10px] text-zinc-400">
            {format(event.startDate, "MMM")}
          </p>

          <p className="font-bold text-lg leading-none text-white">
            {format(event.startDate, "dd")}
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <CardContent className="p-4 space-y-3">
        {/* TITLE */}
        <h3 className="font-bold text-lg leading-tight line-clamp-2 text-white group-hover:text-purple-300 transition-colors">
          {event.title}
        </h3>

        {/* DETAILS */}
        <div className="space-y-2 text-xs text-muted-foreground bg-white/5 border border-white/5 rounded-xl p-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-3.5 h-3.5 text-purple-400" />
            <span>
              {format(event.startDate, "EEE, dd MMM, HH:mm")}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-pink-400" />
            <span className="line-clamp-1">
              {event.locationType === "online"
                ? "Online Event"
                : event.city}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Users className="w-3.5 h-3.5 text-blue-400" />
            <span>{event.registrationCount} attending</span>
          </div>
        </div>

        {/* ACTIONS */}
        {action && (
          <div className="flex gap-2 pt-1">
            <Button
              size="sm"
              className="h-9 flex-1 gap-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500"
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
                className="h-9 rounded-lg border-red-500/30 text-red-400 hover:bg-red-500/10"
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