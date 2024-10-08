const xlsx = require("xlsx");
const axios = require("axios");
const Event = require("../../domain/entities/event");
const db = require("../../infrastructure/database/db");

const EventRepository = require("../../domain/repositories/event-repository");

const eventRepository = new EventRepository(db);

const excelDateToJSDate = (excelDate) => {
  // Fecha base de Excel (30 de diciembre de 1899)
  const excelBaseDate = new Date(Date.UTC(1899, 11, 30));

  const days = Math.floor(excelDate);
  const fractionOfDay = excelDate - days;
  //fraccionamos la fecha en días.
  const jsDate = new Date(excelBaseDate.getTime() + days * 86400000);
  const timeInMillis = fractionOfDay * 86400000;
  //obtenemos la fecha final.
  const finalDate = new Date(jsDate.getTime() + timeInMillis);

  const year = finalDate.getUTCFullYear();
  const month = String(finalDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(finalDate.getUTCDate()).padStart(2, "0");
  const hours = String(finalDate.getUTCHours()).padStart(2, "0");
  const minutes = String(finalDate.getUTCMinutes()).padStart(2, "0");
  const seconds = String(finalDate.getUTCSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const formattedDate = (dateEvent) => {
  const date = new Date(dateEvent);

  const formattedDate =
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2) +
    " " +
    ("0" + date.getHours()).slice(-2) +
    ":" +
    ("0" + date.getMinutes()).slice(-2) +
    ":" +
    ("0" + date.getSeconds()).slice(-2);
  return formattedDate;
};

const attendanceByDay = {
  Monday: 0,
  Tuesday: 0,
  Wednesday: 0,
  Thursday: 0,
  Friday: 0,
  Saturday: 0,
  Sunday: 0,
};

const eventUseCases = {
  async createEvent(eventData) {
    const event = new Event(
      eventData?.title,
      eventData?.description,
      eventData?.date,
      eventData?.location
    );
    return await eventRepository.create(event);
  },
  async updateEvent(id, eventData) {
    const existingEvent = await this.getEventById(id);
    const updateEvent = new Event(
      eventData.title || existingEvent.title,
      eventData.description || existingEvent.description,
      eventData.date || existingEvent.date,
      eventData.location || existingEvent.location
    );
    return await eventRepository.update(id, updateEvent);
  },
  async deleteEvent(id) {
    return await eventRepository.delete(id);
  },
  async getEventById(id) {
    return await eventRepository.findById(id);
  },
  async getEventByDate(date) {
    return await eventRepository.findByDate(date);
  },
  async getEventExists(date) {
    return await eventRepository.findExists(date);
  },
  async getAllEvents() {
    return await eventRepository.getAll();
  },
  async processExcel(filePath) {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    for (let row of data) {
      const date = row.date ? excelDateToJSDate(row.date) : null;
      const event = {
        title: row.title,
        description: row.description,
        date,
        location: row.location,
      };
      if (
        event?.title &&
        event?.description &&
        event?.date &&
        event?.location
      ) {
        const data = {
          date,
          title: row.title,
        };
        const existingEvent = await eventRepository.findExists(data);
        if (existingEvent) {
          await eventRepository.update(existingEvent.id, event);
        } else {
          await eventRepository.create(event);
        }
      }
    }
  },
  async getAttendeesEvents() {
    const rows = await eventRepository.getAttendees();
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const attendanceByDay = daysOfWeek.reduce(
      (acc, day) => ({ ...acc, [day]: 0 }),
      {}
    );
    rows.forEach((row) => {
      const date = new Date(row.date);
      const getDayName = daysOfWeek[date.getDay()];
      attendanceByDay[getDayName] += row.attendance;
    });
    return JSON.stringify(attendanceByDay, null, 2);
  },
  async getNearbyLocations() {
    const mapboxToken = process.env.MAPBOX_ACCESS_TOKEN;
    const events = await eventUseCases.getAllEvents();
    const nearbyLocations = [];
    for (const event of events) {
      const geocodingResponse = await axios.get(
        `https://api.mapbox.com/search/geocode/v6/forward?`,
        {
          params: {
            country: "CO",
            q: event?.location,
            limit: 1,
            access_token: mapboxToken,
          },
        }
      );
      const features = geocodingResponse.data.features[0];
      const latitude = features.properties.coordinates.latitude;
      const longitude = features.properties.coordinates.longitude;

      const response = await axios.get(
        `https://api.mapbox.com/search/geocode/v6/reverse?`,
        {
          params: {
            longitude: longitude,
            latitude: latitude,
            limit: 2,
            types: "address",
            access_token: mapboxToken,
          },
        }
      );
      const nearbyLocation = response.data.features.map((feature) => ({
        name: feature?.properties?.context.street.name,
        address: feature?.properties?.context.address.name,
      }));
      const eventInfo = {
        event_name: event?.title,
        event_date: formattedDate(event?.date),
        event_description: event?.description,
        event_location: event?.location,
        event_nearby_locations: nearbyLocation,
      };
      nearbyLocations.push(eventInfo);
    }
    return nearbyLocations;
  },
};
module.exports = eventUseCases;
