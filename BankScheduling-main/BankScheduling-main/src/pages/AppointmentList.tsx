import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import AppointmentCard from '../components/ui/AppointmentCard';
import { mockAppointments } from '../data/mockData';
import { page, pageTitle, button, grid2 } from '../styles/shared';

const header = "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6";

const emptyState = "text-center py-12 bg-white rounded-lg shadow-md";

const emptyTitle = "text-2xl font-semibold text-gray-900 mb-2";

const emptyText = "text-gray-600 mb-6";

function AppointmentList() {
  return (
    <div className={page}>
      <div className={header}>
        <h1 className={pageTitle}>My Appointments</h1>
        <Link to="/appointments/create">
          <button className={button}>
            <Plus size={20} className="inline mr-2" />
            Book New Appointment
          </button>
        </Link>
      </div>

      {mockAppointments.length === 0 ? (
        <div className={emptyState}>
          <h2 className={emptyTitle}>No appointments yet</h2>
          <p className={emptyText}>
            Start by booking your first appointment
          </p>
          <Link to="/appointments/create">
            <button className={button}>Book Appointment</button>
          </Link>
        </div>
      ) : (
        <div className={grid2}>
          {mockAppointments.map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
      )}
    </div>
  );
}

export default AppointmentList;
