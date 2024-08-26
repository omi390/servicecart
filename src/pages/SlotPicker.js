import React, { useState, useEffect } from 'react';

const generateTimeSlots = (startHour, endHour) => {
  const slots = [];
  const date = new Date();

  for (let hour = startHour; hour < endHour; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const slotTime = new Date(date.setHours(hour, minute, 0, 0));
      slots.push(slotTime);
    }
  }
  return slots;
};

const getAdjustedSlotsForToday = (slots) => {
  const now = new Date();
  return slots.filter(slot => slot > now);
};

const SlotPicker = () => {
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [activeTab, setActiveTab] = useState(0);
  
    const startHour = 10;
    const endHour = 17;
  
    const generateSlotsForDays = () => {
      const allSlots = [];
      for (let i = 0; i < 3; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);
        let slots = generateTimeSlots(startHour, endHour).map(slot => {
          const newSlot = new Date(slot);
          newSlot.setDate(date.getDate());
          return newSlot;
        });
        if (i === 0) {
          slots = getAdjustedSlotsForToday(slots);
        }
        allSlots.push({ date, slots });
      }
      return allSlots;
    };
  
    const [timeSlots, setTimeSlots] = useState(generateSlotsForDays());
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setTimeSlots(generateSlotsForDays());
      }, 60 * 1000); // Recalculate every minute
      return () => clearInterval(intervalId);
    }, []);
  
    const handleSlotSelect = (slot) => {
      setSelectedSlot(slot);
      alert(`You have selected ${slot}`);
    };
  
    const formatDate = (date) => {
      return date ? date.toLocaleDateString([], { weekday: 'short', day: 'numeric' }) : '';
    };
  
    return (
      <div>
        <div>
        {timeSlots.map((daySlots, index) => (
       
          <button
          
            className={`slotDayBtn ${activeTab === index ? 'active' : ''}`}
            key={index}
            
            onClick={() => setActiveTab(index)}
          >
            {index === 0 ? 'Today' : formatDate(daySlots.date)}
          </button>
          
        ))}
        </div>
        <div>
          {timeSlots[activeTab]?.slots.map(slot => (
            <button
              key={slot.toISOString()}
              onClick={() => handleSlotSelect(slot)}
              className={`slotTimeBtn ${selectedSlot === slot ? 'active' : ''}`}
              disabled={slot < new Date()} // Disable past time slots
              style={{
                margin: '5px',
                // backgroundColsor: selectedSlot === slot ? 'lightgreen' : ''
              }}
            >
              {slot.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  export default SlotPicker;
  