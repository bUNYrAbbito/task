import React from "react";
import "./intro.css";
import { AiFillAlert } from "react-icons/ai";

import imgint from "../assets/Group 1618874046.png";

import ItineraryDay from "./itineraryCard.jsx";
import FlightSummaryCard from "./flightSummaryCard.jsx";
import BookingsTable from "./bookingsTable.jsx";
import NotesTable from "./notesTable.jsx";
import ServiceTable from "./ServiceTable.jsx";
import TripSummary from "./summaryTable.jsx";
import ScheduleTable from "./scheduleTable.jsx";
import PaymentPlan from "./paymentPlan.jsx";
import DetailsBlock from "./detailsBlock.jsx";

export default function Intro({ data }) {
  const travelerName = data?.travelerName || "Guest";
  const originCity = data?.originCity || "Mumbai";
  const destinationCity = data?.destinationCity || "Singapore";
  const departureDate = data?.departureDate || "";
  const arrivalDate = data?.arrivalDate || "";
  const numNights = data?.numNights || "4";
  const numTravelers = data?.numTravelers || "4";
  const days = Array.isArray(data?.days) ? data.days : [];
  const flights = Array.isArray(data?.flights) ? data.flights : [];
  const bookings = Array.isArray(data?.bookings) ? data.bookings : [];
  const notes = Array.isArray(data?.notes) ? data.notes : [];
  const services = Array.isArray(data?.services) ? data.services : [];
  const paymentPlan = data?.paymentPlan || {};

  return (
  <>
      {/* Header Section */}
      <div className="m-4 flex flex-col items-center main_div">
        <div className="mb-8 w-50 h-16 object-cover rounded-full">
          <img src={imgint} alt="image" className="logo image" />
        </div>

        <div className="p-4 text-center space-y-3 intro-bg">
          <h1>Hi {travelerName}</h1>
          <h1>{destinationCity}</h1>
          <h1>{numNights} Days {numNights} Nights</h1>

          <div className="flex justify-center space-x-2">
            <AiFillAlert />
            <AiFillAlert />
            <AiFillAlert />
            <AiFillAlert />
            <AiFillAlert />
          </div>
        </div>
      </div>

      {/* Travel Details Section */}
      <div className="travalcont flex justify-between">
        <div classname="travaldiv">
          <h4 className="font-bold">Departure From :</h4>
          <h2>{originCity}</h2>
        </div>
        <div>
          <h4 className="font-bold">Departure :</h4>
          <h2>{departureDate}</h2>
        </div>
        <div>
          <h4 className="font-bold">Arrival :</h4>
          <h2>{arrivalDate}</h2>
        </div>
        <div>
          <h4 className="font-bold">Destination :</h4>
          <h2>{destinationCity}</h2>
        </div>
        <div>
          <h4 className="font-bold">No. of Travellers :</h4>
          <h2>{numTravelers}</h2>
        </div>
      </div>

      {/* Itinerary Days */}
      {days.length > 0 && (
        <div className="mx-4 my-6">
          {days.map((d, idx) => (
            <ItineraryDay
              key={idx}
              dayNumber={d.dayNumber || idx + 1}
              dateText={d.dateText}
              title={d.title}
              imageUrl={d.imageUrl}
              activities={d.activities}
            />
          ))}
        </div>
      )}

      {/* Flight Summary */}
      <FlightSummaryCard flights={flights} />
      <h3 className="mx-8 mt-0 text-sm opacity-80">
        Note: All flights include meals, seat choice (excluding XL), and 20kg/25kg checked baggage.
      </h3>

      <hr className="my-4 flex-grow border-t border-gray-900 mx-8" />

      {/* Bookings */}
      <BookingsTable bookings={bookings} />
      <h3 className="mx-8 mt-0 text-sm opacity-80">
        1. All hotels are tentative and can be replaced with similar.
      </h3>
      <h3 className="mx-8 mt-0 text-sm opacity-80">
        2. Breakfast included for all hotel stays.
      </h3>
      <h3 className="mx-8 mt-0 text-sm opacity-80">
        3. All Hotels will be 4★ and above category.
      </h3>
      <h3 className="mx-8 mt-0 text-sm opacity-80">
        4. A maximum occupancy of 2 people/room is allowed in most hotels.
      </h3>

      <hr className="my-8 flex-grow border-t border-gray-900 mx-8" />

      {/* Notes & Services */}
      <NotesTable notes={notes} />
      <hr className="my-4 flex-grow border-t border-gray-900 mx-8" />

      <ServiceTable services={services} />
      <hr className="my-4 flex-grow border-t border-gray-900 mx-8" />
      <TripSummary/>
      <h3 className="
      mx-8 text-sm">
       Transfer Policy(Refundable Upon Claim)
      </h3>
      <h3 class="mx-8 mt-0 text-sm opacity-80 text-bold">
        If any transfer is delayed beyond 15 minutes, customers may book an app-based or  radio taxi and claim a refund for that specific leg.
      </h3>
      <hr className="my-4 flex-grow border-t border-gray-900 mx-8" />
      <ScheduleTable/>

      <div classname="toc">
        <h2 className="tac-title"><spam class="text-black">Terms and  </spam>Conditions</h2>
        <a class="ta" href="">View all terms and conditions </a>
      </div>

      <PaymentPlan totalAmount={paymentPlan.totalAmount} tcsNote={paymentPlan.tcsNote} installments={paymentPlan.installments} />
      <DetailsBlock/>  

       <hr className="my-4 flex-grow border-t border-gray-900 mx-8" />

    <div className="flex flex-col items-center justify-center p-5 bg-white font-sans">
      
      {/* Title */}
      <h1 className=" ppg
        text-black 
        text-5xl 
        font-black 
        mb-5
        text-center 
        tracking-wide
        uppercase
      ">
        PLAN.PACK.GO!
      </h1>
      
      {/* Button */}
      <button className="
        bg-[#5C3596] hover:bg-[#7443B8] 
        text-white 
        text-2xl 
        font-semibold 
        py-4 
        px-12 
        border-none 
        rounded-full 
        cursor-pointer 
        transition-colors 
        min-w-[300px] 
        shadow-lg
      ">
        Book Now
      </button>
    </div>

    <div>
      
    </div>
      
      

    </>
  );
}
