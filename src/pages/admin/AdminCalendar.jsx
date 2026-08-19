import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaChevronLeft, FaChevronRight, FaPlus, FaPhoneAlt 
} from 'react-icons/fa';
import useMahalData from '../../hooks/useMahalData';

const AdminCalendar = () => {
  const { bookings, info } = useMahalData();
  const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 1)); // September 2026 default
  const [selectedDateStr, setSelectedDateStr] = useState('2026-09-12');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const setToday = () => {
    setCurrentDate(new Date());
  };

  // Build calendar days
  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const formattedDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayBookings = bookings.filter(b => b.eventDate === formattedDate && b.status !== 'Cancelled');
    calendarDays.push({
      dayNumber: day,
      dateString: formattedDate,
      bookings: dayBookings,
      hasFullDay: dayBookings.some(b => b.timeSlot.includes('24') || b.timeSlot.includes('Full')),
      hasMorning: dayBookings.some(b => b.timeSlot.includes('Morning') || b.timeSlot.includes('Full')),
      hasEvening: dayBookings.some(b => b.timeSlot.includes('Evening') || b.timeSlot.includes('Full')),
      isBooked: dayBookings.length > 0
    });
  }

  const selectedDayData = calendarDays.find(d => d && d.dateString === selectedDateStr) || {
    dateString: selectedDateStr,
    bookings: bookings.filter(b => b.eventDate === selectedDateStr && b.status !== 'Cancelled')
  };

  return (
    <div className="space-y-6 text-left max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-serif font-bold text-stone-100">
            Hall Availability & Booking Calendar
          </h2>
          <p className="text-xs text-stone-400 mt-1">
            Visual inspection for morning, evening, and 24-hour wedding slots.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-[11px] text-stone-300">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-500/30 border border-emerald-500 inline-block" /> Confirmed
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-500/30 border border-amber-500 inline-block" /> Pending
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-stone-800 border border-stone-700 inline-block" /> Available
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Calendar Grid Container (Col 8) */}
        <div className="lg:col-span-8 glass-card rounded-3xl p-6 border border-stone-800 shadow-2xl">
          {/* Month Header Navigation */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-800">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-serif font-bold text-stone-100">
                {monthNames[month]} <span className="text-[#C9A227]">{year}</span>
              </h3>
              <button
                onClick={setToday}
                className="text-[10px] uppercase font-bold text-[#C9A227] bg-[#C9A227]/15 border border-[#C9A227]/30 px-2.5 py-1 rounded-md hover:bg-[#C9A227] hover:text-stone-950 transition-colors cursor-pointer"
              >
                Today
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevMonth}
                className="p-2 rounded-xl bg-stone-900 border border-stone-800 hover:border-[#C9A227] text-stone-300 hover:text-white transition-colors cursor-pointer"
              >
                <FaChevronLeft className="text-xs" />
              </button>
              <button
                onClick={nextMonth}
                className="p-2 rounded-xl bg-stone-900 border border-stone-800 hover:border-[#C9A227] text-stone-300 hover:text-white transition-colors cursor-pointer"
              >
                <FaChevronRight className="text-xs" />
              </button>
            </div>
          </div>

          {/* Days of Week Header */}
          <div className="grid grid-cols-7 gap-2 text-center text-[11px] font-bold uppercase text-stone-400 mb-2">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          {/* Calendar Day Grid */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((dayObj, idx) => {
              if (!dayObj) {
                return <div key={`empty-${idx}`} className="h-20 sm:h-24 rounded-2xl bg-stone-950/20" />;
              }

              const isSelected = selectedDateStr === dayObj.dateString;
              const hasConfirmed = dayObj.bookings.some(b => b.status === 'Confirmed');
              const hasPending = dayObj.bookings.some(b => b.status === 'Pending');

              return (
                <button
                  key={dayObj.dateString}
                  onClick={() => setSelectedDateStr(dayObj.dateString)}
                  className={`h-20 sm:h-24 rounded-2xl p-2 text-left flex flex-col justify-between transition-all cursor-pointer border ${
                    isSelected
                      ? 'border-[#C9A227] bg-stone-900/90 shadow-[0_0_15px_rgba(201,162,39,0.3)]'
                      : dayObj.isBooked
                      ? hasConfirmed
                        ? 'border-emerald-500/40 bg-emerald-950/20 hover:border-emerald-400'
                        : 'border-amber-500/40 bg-amber-950/20 hover:border-amber-400'
                      : 'border-stone-800/80 bg-stone-950/60 hover:border-stone-700 hover:bg-stone-900'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span className={`text-xs sm:text-sm font-bold ${
                      isSelected ? 'text-[#C9A227]' : dayObj.isBooked ? 'text-stone-100' : 'text-stone-400'
                    }`}>
                      {dayObj.dayNumber}
                    </span>
                    {dayObj.isBooked && (
                      <span className={`w-2 h-2 rounded-full ${hasConfirmed ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                    )}
                  </div>

                  {/* Slot Indicators */}
                  <div className="space-y-1 w-full overflow-hidden">
                    {dayObj.bookings.map((b) => (
                      <div
                        key={b.id}
                        className={`text-[9px] truncate px-1.5 py-0.5 rounded font-medium ${
                          b.status === 'Confirmed'
                            ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-500/40'
                            : 'bg-amber-500/30 text-amber-200 border border-amber-500/40'
                        }`}
                      >
                        {b.customerName.split(' ')[0]}
                      </div>
                    ))}
                    {!dayObj.isBooked && (
                      <span className="text-[9px] text-stone-600 italic hidden sm:block">Available</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Date Details Drawer (Col 4) */}
        <div className="lg:col-span-4 glass-card rounded-3xl p-6 border border-[#C9A227]/30 shadow-2xl space-y-6">
          <div className="border-b border-stone-800 pb-4">
            <span className="text-xs uppercase font-semibold text-[#C9A227] tracking-wider">
              Slot Inspector
            </span>
            <h3 className="text-2xl font-serif font-bold text-stone-100 mt-1">
              {selectedDateStr}
            </h3>
            <p className="text-xs text-stone-400 mt-0.5">
              {selectedDayData.bookings.length} reservation(s) on this date
            </p>
          </div>

          {/* Slot Breakdown */}
          <div className="space-y-3 text-xs">
            {/* Morning Slot */}
            <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-between">
              <div>
                <span className="font-semibold text-stone-200 block">Morning Slot (5 AM - 2 PM)</span>
                <span className="text-[10px] text-stone-500">Muhurtham & Breakfast</span>
              </div>
              {selectedDayData.bookings.some(b => b.timeSlot.includes('Morning') || b.timeSlot.includes('24') || b.timeSlot.includes('Full')) ? (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                  Booked
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Available
                </span>
              )}
            </div>

            {/* Evening Slot */}
            <div className="p-3 rounded-xl bg-stone-900 border border-stone-800 flex items-center justify-between">
              <div>
                <span className="font-semibold text-stone-200 block">Evening Slot (3 PM - 11 PM)</span>
                <span className="text-[10px] text-stone-500">Reception & Gala Dinner</span>
              </div>
              {selectedDayData.bookings.some(b => b.timeSlot.includes('Evening') || b.timeSlot.includes('24') || b.timeSlot.includes('Full')) ? (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                  Booked
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Available
                </span>
              )}
            </div>
          </div>

          {/* Bookings on this date */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase font-semibold text-stone-400 tracking-wider">
              Booked Events ({selectedDayData.bookings.length})
            </h4>

            {selectedDayData.bookings.length === 0 ? (
              <div className="p-4 rounded-xl bg-stone-900/50 border border-dashed border-stone-800 text-center text-xs text-stone-400">
                This date has zero bookings. Both morning and evening slots are free for reservation!
              </div>
            ) : (
              selectedDayData.bookings.map(b => (
                <div key={b.id} className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-2 text-xs">
                  <div className="flex justify-between items-start">
                    <span className="font-mono font-bold text-[#C9A227]">{b.id}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      b.status === 'Confirmed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {b.status}
                    </span>
                  </div>

                  <div className="font-bold text-stone-100 text-sm">{b.customerName}</div>
                  <div className="text-stone-300">{b.eventType} ({b.timeSlot})</div>
                  <div className="text-stone-400 flex items-center gap-1 font-mono">
                    <FaPhoneAlt className="text-[10px] text-[#C9A227]" /> {b.phone}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Quick Book This Date Button */}
          <NavLink
            to={`/admin/bookings?action=new`}
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#DFBA51] to-[#C9A227] text-stone-950 font-bold text-xs shadow-lg hover:scale-[1.02] transition-transform"
          >
            <FaPlus /> Book This Date ({selectedDateStr})
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AdminCalendar;
