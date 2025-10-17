import React, { useState } from "react";

export default function ItineraryForm({ initialData, onChange, onGeneratePdf, downloading }) {
  // Default templates for quick add
  const flightTpls = [
    { label: "DEL → SIN (AI-123)", value: { date: "Thu 10 Jan'24", info: "Fly Air India (AI-123) From Delhi (DEL) To Singapore (SIN)." } },
    { label: "SIN → DEL (AI-124)", value: { date: "Wed 15 Jan'24", info: "Fly Air India (AI-124) From Singapore (SIN) To Delhi (DEL)." } },
  ];
  const hotelTpls = [
    { label: "Singapore | 2N | Marina Bay", value: { city: "Singapore", checkIn: "24/02/2025", checkOut: "26/02/2025", nights: "2", hotelName: "Marina Bay Sands" } },
    { label: "Singapore | 2N | Orchard", value: { city: "Singapore", checkIn: "26/02/2025", checkOut: "28/02/2025", nights: "2", hotelName: "Orchard Hotel" } },
  ];
  const noteTpls = [
    { label: "Visa Policy", value: { point: "Visa Policy", details: "Visa fees and non-cancellable components are non-refundable." } },
    { label: "Check-in/out", value: { point: "Hotel Check-In & Check-Out", details: "Standard hotel check-in 2 PM, check-out 11 AM." } },
  ];
  const serviceTpls = [
    { label: "Tickets & Vouchers", value: { service: "Flight Tickets And Hotel Vouchers", details: "Delivered 3 days post full payment." } },
    { label: "Trip Support", value: { service: "Trip Support", details: "Response time: 5 minutes." } },
  ];
  const dayTpls = [
    {
      label: "Arrival & City Walk",
      value: {
        dateText: "Day X",
        title: "Arrival & City Walk",
        imageUrl: "",
        activities: {
          morning: ["Arrive and transfer to hotel"],
          afternoon: ["Check-in and rest"],
          evening: ["Leisure walk at city center"],
        },
      },
    },
    {
      label: "City Tour",
      value: {
        dateText: "Day X",
        title: "Guided City Tour",
        imageUrl: "",
        activities: {
          morning: ["City landmarks tour"],
          afternoon: ["Museum/Attraction visit"],
          evening: ["Local market and dinner"],
        },
      },
    },
    {
      label: "Beach Day",
      value: {
        dateText: "Day X",
        title: "Beach & Relax",
        imageUrl: "",
        activities: {
          morning: ["Beach time"],
          afternoon: ["Water sports (optional)"],
          evening: ["Sunset by the shore"],
        },
      },
    },
    {
      label: "Theme Park Day",
      value: {
        dateText: "Day X",
        title: "Theme Park Adventure",
        imageUrl: "",
        activities: {
          morning: ["Arrive at theme park"],
          afternoon: ["Rides and shows"],
          evening: ["Parade / Night show"],
        },
      },
    },
    {
      label: "Shopping Day",
      value: {
        dateText: "Day X",
        title: "Shopping & Souvenirs",
        imageUrl: "",
        activities: {
          morning: ["Visit mall / market"],
          afternoon: ["Local crafts & souvenirs"],
          evening: ["Dinner at food court"],
        },
      },
    },
  ];

  const [selFlight, setSelFlight] = useState(0);
  const [selHotel, setSelHotel] = useState(0);
  const [selNote, setSelNote] = useState(0);
  const [selService, setSelService] = useState(0);
  const [selDay, setSelDay] = useState(0);
  const [form, setForm] = useState(
    initialData || {
      travelerName: "",
      originCity: "",
      destinationCity: "",
      departureDate: "",
      arrivalDate: "",
      numNights: "",
      numTravelers: "",
      days: [],
      flights: [],
      bookings: [],
      notes: [],
      services: [],
      paymentPlan: { totalAmount: "", tcsNote: "", installments: [] },
    }
  );

  function handleChange(e) {
    const { name, value } = e.target;
    const updated = { ...form, [name]: value };
    setForm(updated);
    onChange && onChange(updated);
  }

  function up(next) {
    setForm(next);
    onChange && onChange(next);
  }

  function moveInArray(arr, from, to) {
    const copy = arr.slice();
    if (to < 0 || to >= copy.length) return copy;
    const item = copy.splice(from, 1)[0];
    copy.splice(to, 0, item);
    return copy;
  }

  function moveRow(key, index, direction) {
    const to = direction === 'up' ? index - 1 : index + 1;
    if (key === 'days') {
      const nextDays = moveInArray(form.days, index, to).map((d, i) => ({ ...d, dayNumber: i + 1 }));
      up({ ...form, days: nextDays });
      return;
    }
    const next = moveInArray(form[key], index, to);
    up({ ...form, [key]: next });
  }

  function clearAll(key) {
    if (key === 'paymentPlan.installments') {
      up({ ...form, paymentPlan: { ...form.paymentPlan, installments: [] } });
    } else {
      up({ ...form, [key]: [] });
    }
  }

  // Days handlers
  function addDay() {
    const next = {
      ...form,
      days: [
        ...form.days,
        { dayNumber: form.days.length + 1, dateText: "", title: "", imageUrl: "", activities: { morning: [], afternoon: [], evening: [] } },
      ],
    };
    up(next);
  }
  function removeDay(index) {
    const nextDays = form.days.filter((_, i) => i !== index).map((d, i) => ({ ...d, dayNumber: i + 1 }));
    up({ ...form, days: nextDays });
  }
  function updateDay(index, field, value) {
    const next = form.days.map((d, i) => (i === index ? { ...d, [field]: value } : d));
    up({ ...form, days: next });
  }
  function updateDayActivity(index, part, value) {
    const next = form.days.map((d, i) => (i === index ? { ...d, activities: { ...d.activities, [part]: value.split("\n").filter(Boolean) } } : d));
    up({ ...form, days: next });
  }

  // Simple list helpers
  const addTo = (key, item) => up({ ...form, [key]: [...form[key], item] });
  const removeFrom = (key, idx) => up({ ...form, [key]: form[key].filter((_, i) => i !== idx) });
  const updateAt = (key, idx, item) => up({ ...form, [key]: form[key].map((x, i) => (i === idx ? { ...x, ...item } : x)) });

  return (
    <div style={{ background: "#ffffff", padding: 20, borderRadius: 12, border: "1px solid #e5e7eb", boxShadow: "0 6px 18px rgba(0,0,0,0.06)", maxWidth: 980, margin: "0 auto" }}>
      <h2 style={{ marginBottom: 12, fontWeight: 700 }}>Trip Details</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: 12 }}>
        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span>Traveler name</span>
          <input name="travelerName" value={form.travelerName} onChange={handleChange} placeholder="e.g., Rahul" style={{ padding: 10, border: "1px solid #ddd", borderRadius: 8 }} />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span>Origin city</span>
          <input name="originCity" value={form.originCity} onChange={handleChange} placeholder="e.g., Mumbai" style={{ padding: 10, border: "1px solid #ddd", borderRadius: 8 }} />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span>Destination city</span>
          <input name="destinationCity" value={form.destinationCity} onChange={handleChange} placeholder="e.g., Singapore" style={{ padding: 10, border: "1px solid #ddd", borderRadius: 8 }} />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span>Departure date</span>
          <input type="date" name="departureDate" value={form.departureDate} onChange={handleChange} style={{ padding: 10, border: "1px solid #ddd", borderRadius: 8 }} />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span>Arrival date</span>
          <input type="date" name="arrivalDate" value={form.arrivalDate} onChange={handleChange} style={{ padding: 10, border: "1px solid #ddd", borderRadius: 8 }} />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span>Nights</span>
          <input name="numNights" value={form.numNights} onChange={handleChange} placeholder="e.g., 4" style={{ padding: 10, border: "1px solid #ddd", borderRadius: 8 }} />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span>No. of travelers</span>
          <input name="numTravelers" value={form.numTravelers} onChange={handleChange} placeholder="e.g., 4" style={{ padding: 10, border: "1px solid #ddd", borderRadius: 8 }} />
        </label>
      </div>
      <div style={{ marginTop: 16 }}>
        <h3 style={{ fontWeight: 700 }}>Itinerary Days</h3>
        <div style={{ display: "flex", gap: 8, alignItems: "center", margin: "8px 0" }}>
          <button onClick={addDay} style={{ padding: "6px 10px" }}>Add Day</button>
          <select value={selDay} onChange={(e) => setSelDay(Number(e.target.value))}>
            {dayTpls.map((t, i) => (
              <option key={i} value={i}>{t.label}</option>
            ))}
          </select>
          <button onClick={() => {
            const tpl = dayTpls[selDay].value;
            const idx = form.days.length;
            const newDay = {
              dayNumber: idx + 1,
              dateText: tpl.dateText,
              title: tpl.title,
              imageUrl: tpl.imageUrl,
              activities: tpl.activities,
            };
            up({ ...form, days: [...form.days, newDay] });
          }} style={{ padding: "6px 10px" }}>Add Default Day</button>
          <button onClick={() => clearAll('days')} style={{ padding: "6px 10px", color: "#b91c1c" }}>Clear All Days</button>
          <button onClick={() => {
            const sample = {
              travelerName: "Rahul",
              originCity: "Mumbai",
              destinationCity: "Singapore",
              departureDate: "2025-10-31",
              arrivalDate: "2025-11-04",
              numNights: "4",
              numTravelers: "4",
              days: [
                { dayNumber: 1, dateText: "31 Oct", title: "Arrival & City Walk", imageUrl: "", activities: { morning: ["Arrive in Singapore"], afternoon: ["Check-in hotel"], evening: ["City walk by Marina Bay"] } },
                { dayNumber: 2, dateText: "01 Nov", title: "Gardens & Bay", imageUrl: "", activities: { morning: ["Gardens by the Bay"], afternoon: ["Cloud Forest"], evening: ["Supertree Grove Light Show"] } },
              ],
              flights: [ { date: "Thu 31 Oct'25", info: "DEL → SIN (AI-123)" } ],
              bookings: [ { city: "Singapore", checkIn: "31/10/2025", checkOut: "04/11/2025", nights: "4", hotelName: "Marina Bay Sands" } ],
              notes: [ { point: "Visa Policy", details: "Visa fees non-refundable." } ],
              services: [ { service: "Trip Support", details: "5 min response." } ],
              paymentPlan: { totalAmount: "₹ 9,00,000 For 3 Pax (Incl. GST)", tcsNote: "Not Collected", installments: [ { installment: "Installment 1", amount: "₹3,50,000", dueDate: "Initial Payment" } ] },
            };
            up({ ...form, ...sample });
          }} style={{ padding: "6px 10px" }}>Prefill sample itinerary</button>
        </div>
        {form.days.map((d, i) => (
          <div key={i} style={{ border: "1px solid #e5e7eb", padding: 12, borderRadius: 6, marginBottom: 8 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
              <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span>Date</span>
                <input value={d.dateText} onChange={(e) => updateDay(i, "dateText", e.target.value)} placeholder="e.g., 27 Nov 2025" />
              </label>
              <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span>Title</span>
                <input value={d.title} onChange={(e) => updateDay(i, "title", e.target.value)} placeholder="Day title" />
              </label>
              <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span>Image URL</span>
                <input value={d.imageUrl} onChange={(e) => updateDay(i, "imageUrl", e.target.value)} placeholder="https://..." />
              </label>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginTop: 8 }}>
              <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span>Morning (one per line)</span>
                <textarea rows={3} value={(d.activities.morning || []).join("\n")} onChange={(e) => updateDayActivity(i, "morning", e.target.value)} />
              </label>
              <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span>Afternoon</span>
                <textarea rows={3} value={(d.activities.afternoon || []).join("\n")} onChange={(e) => updateDayActivity(i, "afternoon", e.target.value)} />
              </label>
              <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <span>Evening</span>
                <textarea rows={3} value={(d.activities.evening || []).join("\n")} onChange={(e) => updateDayActivity(i, "evening", e.target.value)} />
              </label>
            </div>
            <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
              <button onClick={() => removeDay(i)} style={{ color: "#b91c1c" }}>Remove Day</button>
              <button onClick={() => {
                const copy = { ...d, dayNumber: form.days.length + 1 };
                const next = [...form.days, copy].map((x, idx) => ({ ...x, dayNumber: idx + 1 }));
                up({ ...form, days: next });
              }}>Duplicate Day</button>
              <button onClick={() => moveRow('days', i, 'up')}>Move Up</button>
              <button onClick={() => moveRow('days', i, 'down')}>Move Down</button>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 16 }}>
        <h3 style={{ fontWeight: 700 }}>Flights</h3>
        <div style={{ display: "flex", gap: 8, alignItems: "center", margin: "8px 0" }}>
          <select value={selFlight} onChange={(e) => setSelFlight(Number(e.target.value))}>
            {flightTpls.map((t, i) => (
              <option key={i} value={i}>{t.label}</option>
            ))}
          </select>
          <button onClick={() => addTo("flights", flightTpls[selFlight].value)} style={{ padding: "6px 10px" }}>Add Default Flight</button>
          <button onClick={() => addTo("flights", { date: "", info: "" })} style={{ padding: "6px 10px" }}>Add Flight</button>
          <button onClick={() => clearAll('flights')} style={{ padding: "6px 10px", color: "#b91c1c" }}>Clear All Flights</button>
        </div>
        {form.flights.map((f, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "200px 1fr auto auto auto", gap: 8, marginBottom: 8 }}>
            <input placeholder="Date" value={f.date} onChange={(e) => updateAt("flights", i, { date: e.target.value })} />
            <input placeholder="Info" value={f.info} onChange={(e) => updateAt("flights", i, { info: e.target.value })} />
            <button onClick={() => removeFrom("flights", i)} style={{ color: "#b91c1c" }}>Remove</button>
            <button onClick={() => addTo("flights", { ...f })}>Duplicate</button>
            <button onClick={() => moveRow('flights', i, 'up')}>Up</button>
            <button onClick={() => moveRow('flights', i, 'down')}>Down</button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 16 }}>
        <h3 style={{ fontWeight: 700 }}>Hotel Bookings</h3>
        <div style={{ display: "flex", gap: 8, alignItems: "center", margin: "8px 0" }}>
          <select value={selHotel} onChange={(e) => setSelHotel(Number(e.target.value))}>
            {hotelTpls.map((t, i) => (
              <option key={i} value={i}>{t.label}</option>
            ))}
          </select>
          <button onClick={() => addTo("bookings", hotelTpls[selHotel].value)} style={{ padding: "6px 10px" }}>Add Default Hotel</button>
          <button onClick={() => addTo("bookings", { city: "", checkIn: "", checkOut: "", nights: "", hotelName: "" })} style={{ padding: "6px 10px" }}>Add Hotel</button>
          <button onClick={() => clearAll('bookings')} style={{ padding: "6px 10px", color: "#b91c1c" }}>Clear All Hotels</button>
        </div>
        {form.bookings.map((b, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr) auto auto auto", gap: 8, marginBottom: 8 }}>
            <input placeholder="City" value={b.city} onChange={(e) => updateAt("bookings", i, { city: e.target.value })} />
            <input placeholder="Check In" value={b.checkIn} onChange={(e) => updateAt("bookings", i, { checkIn: e.target.value })} />
            <input placeholder="Check Out" value={b.checkOut} onChange={(e) => updateAt("bookings", i, { checkOut: e.target.value })} />
            <input placeholder="Nights" value={b.nights} onChange={(e) => updateAt("bookings", i, { nights: e.target.value })} />
            <input placeholder="Hotel Name" value={b.hotelName} onChange={(e) => updateAt("bookings", i, { hotelName: e.target.value })} />
            <button onClick={() => removeFrom("bookings", i)} style={{ color: "#b91c1c" }}>Remove</button>
            <button onClick={() => addTo("bookings", { ...b })}>Duplicate</button>
            <button onClick={() => moveRow('bookings', i, 'up')}>Up</button>
            <button onClick={() => moveRow('bookings', i, 'down')}>Down</button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 16 }}>
        <h3 style={{ fontWeight: 700 }}>Important Notes</h3>
        <div style={{ display: "flex", gap: 8, alignItems: "center", margin: "8px 0" }}>
          <select value={selNote} onChange={(e) => setSelNote(Number(e.target.value))}>
            {noteTpls.map((t, i) => (
              <option key={i} value={i}>{t.label}</option>
            ))}
          </select>
          <button onClick={() => addTo("notes", noteTpls[selNote].value)} style={{ padding: "6px 10px" }}>Add Default Note</button>
          <button onClick={() => addTo("notes", { point: "", details: "" })} style={{ padding: "6px 10px" }}>Add Note</button>
          <button onClick={() => clearAll('notes')} style={{ padding: "6px 10px", color: "#b91c1c" }}>Clear All Notes</button>
        </div>
        {form.notes.map((n, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "200px 1fr auto auto auto", gap: 8, marginBottom: 8 }}>
            <input placeholder="Point" value={n.point} onChange={(e) => updateAt("notes", i, { point: e.target.value })} />
            <input placeholder="Details" value={n.details} onChange={(e) => updateAt("notes", i, { details: e.target.value })} />
            <button onClick={() => removeFrom("notes", i)} style={{ color: "#b91c1c" }}>Remove</button>
            <button onClick={() => addTo("notes", { ...n })}>Duplicate</button>
            <button onClick={() => moveRow('notes', i, 'up')}>Up</button>
            <button onClick={() => moveRow('notes', i, 'down')}>Down</button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 16 }}>
        <h3 style={{ fontWeight: 700 }}>Scope of Service</h3>
        <div style={{ display: "flex", gap: 8, alignItems: "center", margin: "8px 0" }}>
          <select value={selService} onChange={(e) => setSelService(Number(e.target.value))}>
            {serviceTpls.map((t, i) => (
              <option key={i} value={i}>{t.label}</option>
            ))}
          </select>
          <button onClick={() => addTo("services", serviceTpls[selService].value)} style={{ padding: "6px 10px" }}>Add Default Service</button>
          <button onClick={() => addTo("services", { service: "", details: "" })} style={{ padding: "6px 10px" }}>Add Service</button>
          <button onClick={() => clearAll('services')} style={{ padding: "6px 10px", color: "#b91c1c" }}>Clear All Services</button>
        </div>
        {form.services.map((s, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "200px 1fr auto auto auto", gap: 8, marginBottom: 8 }}>
            <input placeholder="Service" value={s.service} onChange={(e) => updateAt("services", i, { service: e.target.value })} />
            <input placeholder="Details" value={s.details} onChange={(e) => updateAt("services", i, { details: e.target.value })} />
            <button onClick={() => removeFrom("services", i)} style={{ color: "#b91c1c" }}>Remove</button>
            <button onClick={() => addTo("services", { ...s })}>Duplicate</button>
            <button onClick={() => moveRow('services', i, 'up')}>Up</button>
            <button onClick={() => moveRow('services', i, 'down')}>Down</button>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 16 }}>
        <h3 style={{ fontWeight: 700 }}>Payment Plan</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 8 }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span>Total Amount</span>
            <input value={form.paymentPlan.totalAmount} onChange={(e) => up({ ...form, paymentPlan: { ...form.paymentPlan, totalAmount: e.target.value } })} />
          </label>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span>TCS Note</span>
            <input value={form.paymentPlan.tcsNote} onChange={(e) => up({ ...form, paymentPlan: { ...form.paymentPlan, tcsNote: e.target.value } })} />
          </label>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center", margin: "8px 0" }}>
          <button onClick={() => up({ ...form, paymentPlan: { ...form.paymentPlan, installments: [...form.paymentPlan.installments, { installment: "", amount: "", dueDate: "" }] } })} style={{ padding: "6px 10px" }}>Add Installment</button>
          <button onClick={() => clearAll('paymentPlan.installments')} style={{ padding: "6px 10px", color: "#b91c1c" }}>Clear All Installments</button>
        </div>
        {form.paymentPlan.installments.map((p, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr) auto auto auto", gap: 8, marginBottom: 8 }}>
            <input placeholder="Installment" value={p.installment} onChange={(e) => {
              const arr = form.paymentPlan.installments.map((x, idx) => (idx === i ? { ...x, installment: e.target.value } : x));
              up({ ...form, paymentPlan: { ...form.paymentPlan, installments: arr } });
            }} />
            <input placeholder="Amount" value={p.amount} onChange={(e) => {
              const arr = form.paymentPlan.installments.map((x, idx) => (idx === i ? { ...x, amount: e.target.value } : x));
              up({ ...form, paymentPlan: { ...form.paymentPlan, installments: arr } });
            }} />
            <input placeholder="Due Date" value={p.dueDate} onChange={(e) => {
              const arr = form.paymentPlan.installments.map((x, idx) => (idx === i ? { ...x, dueDate: e.target.value } : x));
              up({ ...form, paymentPlan: { ...form.paymentPlan, installments: arr } });
            }} />
            <button onClick={() => {
              const arr = form.paymentPlan.installments.filter((_, idx) => idx !== i);
              up({ ...form, paymentPlan: { ...form.paymentPlan, installments: arr } });
            }} style={{ color: "#b91c1c" }}>Remove</button>
            <button onClick={() => {
              const arr = [...form.paymentPlan.installments, { ...p }];
              up({ ...form, paymentPlan: { ...form.paymentPlan, installments: arr } });
            }}>Duplicate</button>
            <button onClick={() => {
              const arr = moveInArray(form.paymentPlan.installments, i, i - 1);
              up({ ...form, paymentPlan: { ...form.paymentPlan, installments: arr } });
            }}>Up</button>
            <button onClick={() => {
              const arr = moveInArray(form.paymentPlan.installments, i, i + 1);
              up({ ...form, paymentPlan: { ...form.paymentPlan, installments: arr } });
            }}>Down</button>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16, display: "flex", gap: 12, alignItems: "center" }}>
        <button onClick={onGeneratePdf} disabled={downloading} style={{ background: downloading ? "#8c77bd" : "#5C3596", color: "#fff", border: 0, padding: "10px 16px", borderRadius: 9999, cursor: downloading ? "not-allowed" : "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}>
          {downloading ? (
            <span className="spinner" style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid #fff", borderTopColor: "transparent", display: "inline-block", animation: "spin 1s linear infinite" }} />
          ) : null}
          {downloading ? "Preparing..." : "Download PDF"}
        </button>
        <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
      </div>
    </div>
  );
}


