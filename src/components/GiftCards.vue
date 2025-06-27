function handler({
  method,
  userId,
  bookingData,
  bookingId,
  pnr,
  filters = {},
  search,
}) {
  if (method === "POST" && bookingData) {
    return createBooking({ userId, bookingData });
  }

  if (method === "GET" && userId) {
    return getUserBookings({ userId, filters, search });
  }

  if (method === "PUT" && bookingId) {
    return updateBookingStatus({ bookingId, status: bookingData?.status });
  }

  if (method === "DELETE" && (bookingId || pnr)) {
    return cancelBooking({ bookingId, pnr, userId });
  }

  if (method === "GET" && pnr) {
    return getBookingByPnr({ pnr });
  }

  return { error: "Invalid request parameters" };
}

async function createBooking({ userId, bookingData }) {
  try {
    const pnr = generatePNR();

    const booking = await sql`
      INSERT INTO bookings (
        user_id, pnr, train_name, train_number, from_station, from_code,
        to_station, to_code, journey_date, departure_time, arrival_time,
        duration, class, seat_numbers, coach, passenger_count, total_fare,
        booking_status
      ) VALUES (
        ${userId}, ${pnr}, ${bookingData.trainName}, ${bookingData.trainNumber},
        ${bookingData.fromStation}, ${bookingData.fromCode}, ${bookingData.toStation},
        ${bookingData.toCode}, ${bookingData.journeyDate}, ${bookingData.departureTime},
        ${bookingData.arrivalTime}, ${bookingData.duration}, ${bookingData.class},
        ${bookingData.seatNumbers}, ${bookingData.coach}, ${bookingData.passengerCount},
        ${bookingData.totalFare}, 'confirmed'
      )
      RETURNING *
    `;

    await updateTravelStats(userId, bookingData.totalFare);

    return { success: true, booking: booking[0] };
  } catch (error) {
    return { error: "Failed to create booking" };
  }
}

async function getUserBookings({ userId, filters, search }) {
  try {
    let queryString = `
      SELECT * FROM bookings 
      WHERE user_id = $1
    `;
    let values = [userId];
    let paramCount = 1;

    if (search) {
      paramCount++;
      queryString += ` AND (
        LOWER(train_name) LIKE LOWER($${paramCount}) 
        OR LOWER(from_station) LIKE LOWER($${paramCount})
        OR LOWER(to_station) LIKE LOWER($${paramCount})
        OR pnr LIKE $${paramCount}
      )`;
      values.push(`%${search}%`);
    }

    if (filters.status) {
      paramCount++;
      queryString += ` AND booking_status = $${paramCount}`;
      values.push(filters.status);
    }

    if (filters.dateFrom) {
      paramCount++;
      queryString += ` AND journey_date >= $${paramCount}`;
      values.push(filters.dateFrom);
    }

    if (filters.dateTo) {
      paramCount++;
      queryString += ` AND journey_date <= $${paramCount}`;
      values.push(filters.dateTo);
    }

    if (filters.class) {
      paramCount++;
      queryString += ` AND class = $${paramCount}`;
      values.push(filters.class);
    }

    queryString += ` ORDER BY booking_date DESC`;

    const bookings = await sql(queryString, values);

    return { success: true, bookings };
  } catch (error) {
    return { error: "Failed to fetch bookings" };
  }
}

async function updateBookingStatus({ bookingId, status }) {
  try {
    const validStatuses = ["confirmed", "cancelled", "completed", "pending"];
    if (!validStatuses.includes(status)) {
      return { error: "Invalid booking status" };
    }

    const booking = await sql`
      UPDATE bookings 
      SET booking_status = ${status}
      WHERE id = ${bookingId}
      RETURNING *
    `;

    if (booking.length === 0) {
      return { error: "Booking not found" };
    }

    return { success: true, booking: booking[0] };
  } catch (error) {
    return { error: "Failed to update booking status" };
  }
}

async function cancelBooking({ bookingId, pnr, userId }) {
  try {
    let queryString = `
      UPDATE bookings 
      SET booking_status = 'cancelled', cancellation_date = CURRENT_TIMESTAMP
      WHERE 1=1
    `;
    let values = [];
    let paramCount = 0;

    if (bookingId) {
      paramCount++;
      queryString += ` AND id = $${paramCount}`;
      values.push(bookingId);
    }

    if (pnr) {
      paramCount++;
      queryString += ` AND pnr = $${paramCount}`;
      values.push(pnr);
    }

    if (userId) {
      paramCount++;
      queryString += ` AND user_id = $${paramCount}`;
      values.push(userId);
    }

    queryString += ` RETURNING *`;

    const booking = await sql(queryString, values);

    if (booking.length === 0) {
      return { error: "Booking not found or already cancelled" };
    }

    return { success: true, booking: booking[0] };
  } catch (error) {
    return { error: "Failed to cancel booking" };
  }
}

async function getBookingByPnr({ pnr }) {
  try {
    const booking = await sql`
      SELECT * FROM bookings 
      WHERE pnr = ${pnr}
    `;

    if (booking.length === 0) {
      return { error: "Booking not found" };
    }

    return { success: true, booking: booking[0] };
  } catch (error) {
    return { error: "Failed to fetch booking" };
  }
}

async function updateTravelStats(userId, fare) {
  try {
    const existingStats = await sql`
      SELECT * FROM travel_stats WHERE user_id = ${userId}
    `;

    if (existingStats.length === 0) {
      await sql`
        INSERT INTO travel_stats (user_id, total_trips, total_spent)
        VALUES (${userId}, 1, ${fare})
      `;
    } else {
      await sql`
        UPDATE travel_stats 
        SET total_trips = total_trips + 1,
            total_spent = total_spent + ${fare},
            last_updated = CURRENT_TIMESTAMP
        WHERE user_id = ${userId}
      `;
    }
  } catch (error) {
    console.error("Failed to update travel stats:", error);
  }
}

function generatePNR() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let pnr = "";
  for (let i = 0; i < 10; i++) {
    pnr += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pnr;
}