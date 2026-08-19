import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaChevronLeft, FaChevronRight, FaPlus, FaPhoneAlt 
} from 'react-icons/fa';
import useMahalData from '../../hooks/useMahalData';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const AdminCalendar = () => {
  const { bookings } = useMahalData();
  const [currentDate, setCurrentDate] = useState(new Date(2026, 8, 1)); // September 2026 default
  const [selectedDay, setSelectedDay] = useState(null);

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Navigation handlers
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    setSelectedDay(null);
  };

  // Calendar calculations
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const calendarDays = [];
  for (let i = 0; i < firstDayIndex; i++) {
    calendarDays.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const formattedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const dayBookings = bookings.filter(b => b.eventDate === formattedDate && b.status !== 'Cancelled');
    calendarDays.push({ day: d, dateStr: formattedDate, bookings: dayBookings });
  }

  return (
    <div className="space-y-8 text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#8B6508]">
            Muhurtham & Slot Availability Matrix
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-stone-900 mt-1">
            Visual Event Calendar
          </h1>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center gap-3 bg-white p-1.5 rounded-full border border-stone-200 shadow-sm">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-full hover:bg-stone-100 text-stone-700 transition-colors cursor-pointer"
          >
            <FaChevronLeft className="text-xs" />
          </button>

          <span className="font-serif font-bold text-sm px-3 text-stone-900 min-w-[140px] text-center">
            {MONTH_NAMES[currentMonth]} {currentYear}
          </span>

          <button
            onClick={handleNextMonth}
            className="p-2 rounded-full hover:bg-stone-100 text-stone-700 transition-colors cursor-pointer"
          >
            <FaChevronRight className="text-xs" />
          </button>
        </div>
      </div>

      {/* Calendar Grid & Inspector View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: 7-Day Grid (Col 8) */}
        <div className="lg:col-span-8 glass-card rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-md bg-white">
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-2 mb-3 text-center">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
              <div
                key={day}
                className={`text-xs font-bold uppercase tracking-wider py-1.5 ${
                  idx === 0 || idx === 6 ? 'text-[#8B6508]' : 'text-stone-500'
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((dayObj, idx) => {
              if (!dayObj) {
                return <div key={`empty-${idx}`} className="h-24 sm:h-28 rounded-2xl bg-stone-50/50 border border-stone-100" />;
              }

              const isSelected = selectedDay?.dateStr === dayObj.dateStr;
              const hasConfirmed = dayObj.bookings.some(b => b.status === 'Confirmed');

              return (
                <div
                  key={dayObj.dateStr}
                  onClick={() => setSelectedDay(dayObj)}
                  className={`h-24 sm:h-28 rounded-2xl p-2.5 flex flex-col justify-between text-left transition-all cursor-pointer border ${
                    isSelected
                      ? 'border-2 border-[#B8860B] bg-amber-50 shadow-md scale-102 z-10'
                      : dayObj.bookings.length > 0
                      ? 'border-amber-200 bg-amber-50/40 hover:border-[#B8860B]'
                      : 'border-stone-200 bg-white hover:border-stone-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-mono font-bold ${
                      dayObj.bookings.length > 0 ? 'text-[#8B6508]' : 'text-stone-700'
                    }`}>
                      {dayObj.day}
                    </span>

                    {dayObj.bookings.length > 0 && (
                      <span className={`w-2 h-2 rounded-full ${
                        hasConfirmed ? 'bg-emerald-600' : 'bg-amber-500'
                      }`} />
                    )}
                  </div>

                  {/* Badges preview */}
                  <div className="space-y-1 overflow-hidden">
                    {dayObj.bookings.slice(0, 2).map((b, bIdx) => (
                      <div
                        key={bIdx}
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded truncate ${
                          b.status === 'Confirmed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {b.customerName.split(' ')[0]} ({b.eventType.split(' ')[0]})
                      </div>
                    ))}
                    {dayObj.bookings.length > 2 && (
                      <span className="text-[9px] text-stone-500 font-mono">
                        +{dayObj.bookings.length - 2} more
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Date Inspector (Col 4) */}
        <div className="lg:col-span-4 glass-card rounded-3xl p-6 border border-stone-200 shadow-md space-y-5 bg-white">
          <div className="border-b border-stone-100 pb-3">
            <span className="text-xs uppercase font-bold text-[#8B6508] tracking-wider">
              Date Inspector
            </span>
            <h3 className="text-xl font-serif font-bold text-stone-900 mt-0.5">
              {selectedDay ? selectedDay.dateStr : 'Select a date on calendar'}
            </h3>
          </div>

          {selectedDay ? (
            <div className="space-y-4 text-xs">
              {selectedDay.bookings.length > 0 ? (
                <div className="space-y-3">
                  <span className="font-bold text-stone-700 block">
                    Booked Sessions ({selectedDay.bookings.length}):
                  </span>

                  {selectedDay.bookings.map((b) => (
                    <div
                      key={b.id}
                      className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200 space-y-2 shadow-2xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-[#8B6508]">{b.id}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          b.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {b.status}
                        </span>
                      </div>

                      <div>
                        <div className="font-serif font-bold text-stone-900 text-sm">{b.customerName}</div>
                        <div className="text-stone-600">{b.eventType}</div>
                        <div className="text-stone-500 font-mono text-[11px]">{b.timeSlot}</div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-stone-200">
                        <span className="font-mono font-bold text-stone-900">₹{Number(b.totalAmount || 0).toLocaleString('en-IN')}</span>
                        <a href={`tel:${b.phone}`} className="flex items-center gap-1 text-[#8B6508] font-bold hover:underline">
                          <FaPhoneAlt className="text-[10px]" /> Call Client
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-2">
                  <span className="text-emerald-800 font-bold block text-sm">
                    ★ All Slots Available on this Date!
                  </span>
                  <p className="text-[11px] text-stone-600">
                    Morning (5 AM - 2 PM), Evening (3 PM - 11 PM), and Full 24 Hours are completely open.
                  </p>
                </div>
              )}

              <div className="pt-2">
                <NavLink
                  to="/admin/bookings"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white font-bold text-xs shadow-md"
                >
                  <FaPlus /> Create Booking for this Date
                </NavLink>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-stone-500 text-xs">
              Click any calendar day to inspect booked muhurthams, client contacts, and slot availability.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminCalendar;
