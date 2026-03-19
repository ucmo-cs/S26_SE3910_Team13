import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { appointmentTypes, branches, timeSlots } from '../data/mockData';
import { page, pageTitle, card, button, buttonSecondary, input, label } from '../styles/shared';

const form = "space-y-6";

const formGroup = "space-y-2";

const select = input;

const textarea = input + " min-h-24 resize-none";

const buttonGroup = "flex gap-4 pt-4";

function AppointmentCreate() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerName: '',
    type: '',
    branch: '',
    date: '',
    time: '',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Appointment booked successfully!');
    navigate('/appointments');
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className={page}>
      <h1 className={pageTitle}>Book New Appointment</h1>

      <div className={card}>
        <form onSubmit={handleSubmit} className={form}>
          <div className={formGroup}>
            <label htmlFor="customerName" className={label}>
              Full Name *
            </label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className={input}
              required
            />
          </div>

          <div className={formGroup}>
            <label htmlFor="type" className={label}>
              Appointment Type *
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={select}
              required
            >
              <option value="">Select a service</option>
              {appointmentTypes.map((type) => (
                <option key={type.id} value={type.name}>
                  {type.name} ({type.duration} min)
                </option>
              ))}
            </select>
            {formData.type && (
              <p className="text-sm text-gray-500">
                {appointmentTypes.find(t => t.name === formData.type)?.description}
              </p>
            )}
          </div>

          <div className={formGroup}>
            <label htmlFor="branch" className={label}>
              Branch Location *
            </label>
            <select
              id="branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              className={select}
              required
            >
              <option value="">Select a branch</option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.name}>
                  {branch.name}
                </option>
              ))}
            </select>
            {formData.branch && (
              <p className="text-sm text-gray-500">
                {branches.find(b => b.name === formData.branch)?.address}
              </p>
            )}
          </div>

          <div className={formGroup}>
            <label htmlFor="date" className={label}>
              Appointment Date *
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={today}
              className={input}
              required
            />
          </div>

          <div className={formGroup}>
            <label htmlFor="time" className={label}>
              Preferred Time *
            </label>
            <select
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className={select}
              required
            >
              <option value="">Select a time</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>

          <div className={formGroup}>
            <label htmlFor="notes" className={label}>
              Additional Notes (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className={textarea}
              placeholder="Any specific requirements or questions..."
            />
          </div>

          <div className={buttonGroup}>
            <button type="submit" className={button}>
              Book Appointment
            </button>
            <button
              type="button"
              onClick={() => navigate('/appointments')}
              className={buttonSecondary}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AppointmentCreate;
