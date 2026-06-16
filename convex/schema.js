import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { add } from "date-fns";

export default defineSchema({
  // user table
  users: defineTable({
    name: v.string(),
    tokenIdentifier: v.string(), // clerk userid
    email: v.string(),
    imageUrl: v.optional(v.string()),

    // onboarding
    hasCompletedOnBoarding: v.boolean(),

    location: v.optional(
      v.object({
        city: v.string(),
        state: v.optional(v.string()),
        country: v.string(),
      })
    ),

    // min 3 categories
    interests: v.optional(v.array(v.string())),

    // organizer tracking (user subscription)
    freeEventCreated: v.number(),

    // timestamps
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_token",["tokenIdentifier"]),



  events: defineTable({
    title: v.string(),
    description: v.string(),
    slug: v.string(),



    //organizer details
    organizerId: v.id("users"),
    organizerName: v.string(),


    //event details
    category: v.string(),
    tags: v.array(v.string()),


    //date and time
    startDate: v.number(),
    endDate: v.number(),
    timezone: v.string(),

    //location
    locationType: v.union(v.literal("physical"),v.literal("online")),
    venue: v.optional(v.string()),
    address: v.optional(v.string()),
    city:v.string(),
    state:v.optional(v.string()),
    country:v.string(),


    //capacity and ticketing
    capacity: v.number(),
    ticketType:v.union(v.literal("free"),v.literal("paid")),
    ticketPrice: v.optional(v.number()),
    registrationCount: v.number(),



    //customization
    coverImageUrl: v.optional(v.string()),
    themeColor: v.optional(v.string()),

    //timestamps
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_organizer",["organizerId"])
  .index("by_category",["category"])
  .index("by_start_date",["startDate"])
  .index("by_slug",["slug"])
  .searchIndex("search_title", {searchField:"title"}),


  registrations: defineTable({
    eventId: v.id("events"),
    userId: v.id("users"),


    //attendee info 
    attendeeName: v.string(),
    attendeeEmail: v.string(),

    //qr code for check-in
    qrCode: v.string(), //unique id for qr code generation

    //check-in status
    checkedIn: v.boolean(),
    checkedInAt: v.optional(v.number()),


    //status
    status: v.union(v.literal("registered"),v.literal("cancelled")),

    registeredAt: v.number(),
  }).index("by_event",["eventId"])
  .index("by_user",["userId"])
  .index("by_event_user",["eventId","userId"])
  .index("by_qr_code",["qrCode"]), 
});