import { useParams, useNavigate, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, User, FileText, ArrowLeft } from 'lucide-react';
import { mockAppointments } from '../data/mockData';
import { page, pageTitle, card, button, buttonSecondary, badgeSuccess, badgePending, badgeCancelled } from '../styles/shared';

const backLink = "inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-medium";

const detailRow = "flex items-start gap-3 py-3 border-b border-gray-100 last:border-0";

const detailIcon = "text-gray-400 mt-1";

const detailContent = "flex-1";

const detailLabel = "text-sm text-gray-500 mb-1";

const detailValue = "text-gray-900 font-medium";

const buttonGroup = "flex gap-4 mt-6";

const notFoundContainer = "text-center py-12";

const notFoundTitle = "text-2xl font-semibold text-gray-900 mb-4";

function AppointmentDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const appointment = mockAppointments.find(apt => apt.id === id);

  if (!appointment) {
    return (
      <div className={page}>
        <div className={card}>
          <div className={notFoundContainer}>
            <h2 className={notFoundTitle}>Appointment not found</h2>
            <Link to="/appointments">
              <button className={button}>Back to Appointments</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <span className={badgeSuccess}>Confirmed</span>;
      case 'pending':
        return <span className={badgePending}>Pending</span>;
      case 'cancelled':
        return <span className={badgeCancelled}>Cancelled</span>;
      default:
        return null;
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      alert('Appointment cancelled successfully');
      navigate('/appointments');
    }
  };

  return (
    <div className={page}>
      <Link to="/appointments" className={backLink}>
        <ArrowLeft size={20} />
        Back to Appointments
      </Link>

      <div className="flex items-center justify-between mb-6">
        <h1 className={pageTitle}>Appointment Details</h1>
        {getStatusBadge(appointment.status)}
      </div>

      <div className={card}>
        <div className={detailRow}>
          <User size={20} className={detailIcon} />
          <div className={detailContent}>
            <div className={detailLabel}>Customer Name</div>
            <div className={detailValue}>{appointment.customerName}</div>
          </div>
        </div>

        <div className={detailRow}>
          <FileText size={20} className={detailIcon} />
          <div className={detailContent}>
            <div className={detailLabel}>Appointment Type</div>
            <div className={detailValue}>{appointment.type}</div>
          </div>
        </div>

        <div className={detailRow}>
          <MapPin size={20} className={detailIcon} />
          <div className={detailContent}>
            <div className={detailLabel}>Branch Location</div>
            <div className={detailValue}>{appointment.branch}</div>
          </div>
        </div>

        <div className={detailRow}>
          <Calendar size={20} className={detailIcon} />
          <div className={detailContent}>
            <div className={detailLabel}>Date</div>
            <div className={detailValue}>{appointment.date}</div>
          </div>
        </div>

        <div className={detailRow}>
          <Clock size={20} className={detailIcon} />
          <div className={detailContent}>
            <div className={detailLabel}>Time</div>
            <div className={detailValue}>{appointment.time}</div>
          </div>
        </div>

        {appointment.notes && (
          <div className={detailRow}>
            <FileText size={20} className={detailIcon} />
            <div className={detailContent}>
              <div className={detailLabel}>Notes</div>
              <div className={detailValue}>{appointment.notes}</div>
            </div>
          </div>
        )}

        {appointment.status !== 'cancelled' && (
          <div className={buttonGroup}>
            <button className={button}>
              Reschedule
            </button>
            <button onClick={handleCancel} className={buttonSecondary}>
              Cancel Appointment
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AppointmentDetail;
