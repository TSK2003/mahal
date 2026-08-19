import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaChevronLeft, FaChevronRight, FaPlus, FaPhoneAlt, FaCheck, FaTimes 
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

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    setSelectedDay(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    setSelectedDay(null);
  };

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
    <div className="space-y-6 text-left font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div>
          <span className="text-[11px] uppercase font-bold tracking-wider text-[#8B6508]">
            Date & Slot Matrix
          </span>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 mt-0.5">
            Availability Calendar
          </h1>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-stone-300 shadow-xs">
          <button
            onClick={handlePrevMonth}
            className="p-1.5 rounded-md hover:bg-stone-100 text-stone-700 transition-colors cursor-pointer"
          >
            <FaChevronLeft className="text-xs" />
          </button>

          <span className="font-semibold text-xs px-2 text-stone-900 min-w-[130px] text-center">
            {MONTH_NAMES[currentMonth]} {currentYear}
          </span>

          <button
            onClick={handleNextMonth}
            className="p-1.5 rounded-md hover:bg-stone-100 text-stone-700 transition-colors cursor-pointer"
          >
            <FaChevronRight className="text-xs" />
          </button>
        </div>
      </div>

      {/* Calendar Grid & Inspector View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: 7-Day Grid (Col 8) */}
        <div className="lg:col-span-8 glass-card rounded-lg p-4 sm:p-5 border border-stone-200 shadow-xs bg-white">
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1.5 mb-2 text-center">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => (
              <div
                key={day}
                className={`text-[11px] font-bold uppercase tracking-wider py-1 ${
                  idx === 0 || idx === 6 ? 'text-[#8B6508]' : 'text-stone-500'
                }`}
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1.5">
            {calendarDays.map((dayObj, idx) => {
              if (!dayObj) {
                return <div key={`empty-${idx}`} className="h-20 sm:h-24 rounded-lg bg-stone-50 border border-stone-100" />;
              }

              const isSelected = selectedDay?.dateStr === dayObj.dateStr;
              const hasConfirmed = dayObj.bookings.some(b => b.status === 'Confirmed');

              return (
                <div
                  key={dayObj.dateStr}
                  onClick={() => setSelectedDay(dayObj)}
                  className={`h-20 sm:h-24 rounded-lg p-2 flex flex-col justify-between text-left transition-all cursor-pointer border ${
                    isSelected
                      ? 'border-2 border-[#B8860B] bg-amber-50 shadow-xs'
                      : dayObj.bookings.length > 0
                      ? 'border-amber-200 bg-amber-50/40 hover:border-amber-300'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-mono font-bold ${
                      dayObj.bookings.length > 0 ? 'text-[#8B6508]' : 'text-stone-700'
                    }`}>
                      {dayObj.day}
                    </span>

                    {dayObj.bookings.length > 0 && (
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        hasConfirmed ? 'bg-emerald-600' : 'bg-amber-500'
                      }`} />
                    )}
                  </div>

                  {/* Badges preview */}
                  <div className="space-y-0.5 overflow-hidden">
                    {dayObj.bookings.slice(0, 2).map((b, bIdx) => (
                      <div
                        key={bIdx}
                        className={`text-[9px] font-semibold px-1 py-0.5 rounded truncate ${
                          b.status === 'Confirmed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {b.customerName.split(' ')[0]} ({b.eventType.split(' ')[0]})
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Date Inspector (Col 4) */}
        <div className="lg:col-span-4 glass-card rounded-lg p-5 border border-stone-200 shadow-xs space-y-4 bg-white">
          <div className="border-b border-stone-100 pb-2.5">
            <span className="text-[10px] uppercase font-bold text-[#8B6508] tracking-wider">
              Date Details
            </span>
            <h3 className="text-base font-bold text-stone-900 mt-0.5">
              {selectedDay ? selectedDay.dateStr : 'Select date on calendar'}
            </h3>
          </div>

          {selectedDay ? (
            <div className="space-y-3 text-xs">
              {selectedDay.bookings.length > 0 ? (
                <div className="space-y-2.5">
                  <span className="font-semibold text-stone-700 block">
                    Booked Events ({selectedDay.bookings.length}):
                  </span>

                  {selectedDay.bookings.map((b) => (
                    <div
                      key={b.id}
                      className="p-3 rounded-lg bg-stone-50 border border-stone-200 space-y-1.5"
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
                        <div className="font-bold text-stone-900 text-xs">{b.customerName}</div>
                        <div className="text-stone-600 text-[11px]">{b.eventType}</div>
                        <div className="text-stone-500 font-mono text-[10px]">{b.timeSlot}</div>
                      </div>

                      <div className="flex items-center justify-between pt-1.5 border-t border-stone-200">
                        <span className="font-mono font-bold text-stone-900">₹{Number(b.totalAmount || 0).toLocaleString('en-IN')}</span>
                        <a href={`tel:${b.phone}`} className="flex items-center gap-1 text-[#8B6508] font-semibold hover:underline text-[11px]">
                          <FaPhoneAlt className="text-[9px]" /> Call
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-center space-y-1">
                  <span className="text-emerald-800 font-semibold block text-xs">
                    All Slots Available
                  </span>
                  <p className="text-[11px] text-stone-600">
                    Morning, Evening, and 24-Hour slots are open.
                  </p>
                </div>
              )}

              <div className="pt-1">
                <NavLink
                  to="/admin/bookings"
                  className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-lg bg-[#B8860B] hover:bg-[#9A7009] text-white font-semibold text-xs shadow-xs transition-colors"
                >
                  <FaPlus className="text-[10px]" /> Create Booking for Date
                </NavLink>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center text-stone-400 text-xs">
              Click a date on the calendar to view reserved slots and customer details.
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminCalendar;
