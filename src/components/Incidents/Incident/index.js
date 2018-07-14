import React, {Component} from 'react';
import {lookup} from 'country-data';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import humanDuration from '../../../utils/humanDuration';
import './Incident.css';

dayjs.extend(relativeTime);

class Incident extends Component {
    getSampleIp() {
        const incident = this.props.incident;
        if (incident.sample_ip) {
            let flag = '';
            const country = lookup.countries({
                alpha3: incident.sample_ip.geo.code
            });
            if (country && country.length) {
                flag = (
                    <span role="img" aria-label={country[0].name}>
                        {country[0].emoji}
                    </span>
                );
            }

            return (
                <span title={incident.humanized_geos}>
                    {flag}
                    <code>{incident.sample_ip.address}</code>
                </span>
            );
        } else {
            return null;
        }
    }

    getFormattedStartDate() {
        const incident = this.props.incident;
        return dayjs(incident.date_started).fromNow();
    }

    getFormattedDuration() {
        const incident = this.props.incident;
        if (incident.date_started && incident.date_ended) {
            const diff = dayjs(incident.date_ended).diff(
                incident.date_started,
                'seconds',
                false
            );
            if (diff > 0) {
                return `(${humanDuration(diff)} long)`;
            }
        }
        return null;
    }

    render() {
        const incident = this.props.incident;
        return (
            <tr className="Incident">
                <td className="Incident__main">
                    <span className="Incident__kind">
                        {incident.humanized_kind}
                    </span>
                    <span className="Incident__title">{incident.title}</span>
                </td>
                <td>{this.getSampleIp()}</td>
                <td>
                    {this.getFormattedStartDate()}{' '}
                    <span className="Incident__duration">
                        {this.getFormattedDuration()}
                    </span>
                </td>
            </tr>
        );
    }
}

export default Incident;
