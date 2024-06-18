const fs = require("fs");
const path = require("path");
const express = require("express");
const { appointments } = require("../controllers/indexController");

const credentialsPath = path.join(__dirname, "../config/credentials.json");
const credentials = JSON.parse(fs.readFileSync(credentialsPath, "utf8"));

let accessToken = "";

const calendlyService = {
  // Get code
  getCode: async function (req, res) {
    const REDIRECT_URL = "http://localhost:3000/auth";
    const CLIENT_ID = credentials.CLIENT_ID;
    const AUTH_URL = `https://auth.calendly.com/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URL}`;
    if(res.locals.user && res.locals.user.role == "admin"){
      res.redirect(AUTH_URL);
    } else {
      res.redirect("/");
    }
    
  },

  // Get access token
  getAccessToken: async (req, res) => {
    let code = req.query.code;
    const url = "https://auth.calendly.com/oauth/token";
    const REDIRECT_URL = "http://localhost:3000/auth";

    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("client_id", credentials.CLIENT_ID);
    params.append("client_secret", credentials.CLIENT_SECRET);
    params.append("code", code);
    params.append("redirect_uri", REDIRECT_URL);

    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (data.access_token) {
        accessToken = data.access_token;
        // return data.acces_token;
        // res.send(`Access Token saved.`);
        res.redirect("/");
      } else {
        res.send(`Error: ${data.error_description || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Error fetching token:", err);
      res.send("Error fetching token");
    }
  },

  // Get events
  getEvents: async (req, res) => {
    if (!accessToken) {
      return res
        .status(400)
        .send("Access token is not set. Please authenticate first.");
    }
    // let today = new Date();

    let start_time_query =
      req.query.min_start_time && req.query.min_start_time !== "null"
        ? req.query.min_start_time
        : new Date();
    let max_time_query =
      req.query.max_start_time && req.query.max_start_time !== "null"
        ? req.query.max_start_time
        : new Date();

    let start_time_Date = new Date(start_time_query);
    let start_time = start_time_Date.toISOString().split("T")[0];

    let max_time = new Date(max_time_query).toISOString().split("T")[0];

    const {
      count,
      page_token,
      sort,
      status,
      min_start_time,
      max_start_time,
      organization,
      user,
    } = req.query;

    // Crear los encabezados con el token de acceso
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    // Crear los parámetros de query
    const queryParams = new URLSearchParams({
      organization: credentials.ORGANIZATION,
      user: credentials.USER,
      min_start_time: start_time,
      max_start_time: max_time,
    });

    // Filtrar los parámetros indefinidos
    Object.keys(queryParams).forEach(
      (key) => queryParams[key] === undefined && delete queryParams[key]
    );

    // Construir la URL con los parámetros de query
    const url = `https://api.calendly.com/scheduled_events?${queryParams.toString()}`;

    try {
      // Hacer la solicitud HTTP GET
      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });

      const data = await response.json();

      return data;
    } catch (err) {
      console.log(err);
      res.send(err);
    }
  },

  // Get events invitees
  getInvitees: async (req, res) => {
    if (!accessToken) {
      return res
        .status(400)
        .send("Access token is not set. Please authenticate first.");
    }
    // Crear los encabezados con el token de acceso
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    const events = await calendlyService.showEvents(req, res);

    const getEventIds = (events) => {
      return events.map((event) => {
        const uriParts = event.uri.split("/");
        return uriParts[uriParts.length - 1];
      });
    };

    let eventIds = [];

    eventIds = getEventIds(events);

    const eventsWithInvitees = [];

    for (let i = 0; i < eventIds.length; i++) {
      url = `https://api.calendly.com/scheduled_events/${eventIds[i]}/invitees`;
      let eventdata = await fetch(url, {
        method: "GET",
        headers: headers,
      });

      eventURL = await eventdata.json();

      let phoneAnswer =
        eventURL.collection[0].questions_and_answers.length > 0
          ? eventURL.collection[0].questions_and_answers[0].answer
          : null;
      function cleanPhoneNumber(phoneNumber) {
        // Eliminar espacios y guion medio usando expresiones regulares
        return phoneNumber.replace(/\s/g, "").replace(/-/g, "");
      }

      let phone = phoneAnswer ? cleanPhoneNumber(phoneAnswer) : null;

      // clean date
      originalDate = new Date(events[i].start_time);
      year = originalDate.getFullYear();
      month = originalDate.getMonth() + 1;
      day = originalDate.getDate();
      date = year + "-" + month + "-" + day;
      hour = originalDate.getHours();
      minute = originalDate.getMinutes();
      if (minute < 10) {
        minute = "0" + minute;
      }
      time = hour + ":" + minute;

      let eventWithInvitees = {
        name: events[i].name,
        date: date,
        time: time,
        invitee: eventURL.collection[0].name,
        phone,
        email: eventURL.collection[0].email,
      };
      eventsWithInvitees.push(eventWithInvitees);
    }

    res.render("calendar", { appointments: eventsWithInvitees });
  },

  showEvents: async (req, res) => {
    if (!accessToken) {
      return res
        .status(400)
        .send("Access token is not set. Please authenticate first.");
    }
    try {
      const data = await calendlyService.getEvents(req, res);
      if (!data || !data.collection) {
        res.send("Error al intentar recuperar los eventos. Intente nuevamente");
        return [];
      }
      const events = data.collection.map((event) => ({
        name: event.name,
        uri: event.uri,
        start_time: event.start_time,
      }));
      return events;
    } catch (err) {
      console.log(err);
      return [];
    }
  },
};

module.exports = calendlyService;
