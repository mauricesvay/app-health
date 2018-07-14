import axios from 'axios';

const BASE_URL = 'https://bff.sqreen.io/dashboard/v0';
const APPLICATIONS_ENDPOINT = 'applications/';
const USER_ENDPOINT = 'current_user';
const INCIDENTS_ENDPOINT = appid => `applications/${appid}/pulses`;
const HOSTS_ENDPOINT = appid => `applications/${appid}/hosts/`;
const TIMELINE_ENDPOINT = appid => `applications/${appid}/viz/app_monitoring_timeline`;

class Api {
    constructor(user) {
        this.user = user;
        this.instance = axios.create({
            baseURL: BASE_URL,
            headers: {'x-user': this.user}
        });
    }

    getApplications() {
        return this.instance
            .get(APPLICATIONS_ENDPOINT)
            .then((response) => response.data);
    }

    getCurrentUser() {
        return this.instance
            .get(USER_ENDPOINT)
            .then((response) => response.data);
    }

    getAppIncidents(appid) {
        return this.instance
            .get(INCIDENTS_ENDPOINT(appid))
            .then((response) => response.data);
    }

    getAppHosts(appid) {
        return this.instance
            .get(HOSTS_ENDPOINT(appid))
            .then((response) => response.data);
    }

    getAppTimeline(appid) {
        return this.instance
            .get(TIMELINE_ENDPOINT(appid))
            .then((response) => response.data);
    }
}

export default Api;
