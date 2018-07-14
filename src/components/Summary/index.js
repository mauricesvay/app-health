import React, {Component} from 'react';
import humanFormat from 'human-format';
import './Summary.css';

class Summary extends Component {
    getHostsCount() {
        return this.props.hosts ? this.props.hosts.length : undefined;
    }

    getAttacksBlockedCount() {
        if (
            this.props.timeline &&
            this.props.timeline.series &&
            this.props.timeline.series.attacks_blocked
        ) {
            return this.props.timeline.series.attacks_blocked.sum;
        } else {
            return undefined;
        }
    }

    getMaliciousRequestsCount() {
        if (
            this.props.timeline &&
            this.props.timeline.series &&
            this.props.timeline.series.event
        ) {
            return this.props.timeline.series.event.sum;
        } else {
            return undefined;
        }
    }

    getMonitoredRequestsCount() {
        if (
            this.props.timeline &&
            this.props.timeline.series &&
            this.props.timeline.series.http_code
        ) {
            return this.props.timeline.series.http_code.sum;
        } else {
            return undefined;
        }
    }

    renderCount(value) {
        if (value === undefined || typeof value !== 'number') {
            return '-';
        }

        return humanFormat(value);
    }

    render() {
        const hostsCount = this.getHostsCount();
        const monitoredRequestsCount = this.getMonitoredRequestsCount();
        const maliciousRequestsCount = this.getMaliciousRequestsCount();
        const attacksBlockedCount = this.getAttacksBlockedCount();

        return (
            <div className="Summary block">
                <h1 className="block__title">Summary</h1>
                <ul className="Summary__stats">
                    <li className="Summary__stat">
                        <span className="Summary__figure" title={hostsCount}>
                            {this.renderCount(hostsCount)}
                        </span>
                        <span className="Summary__label">Protected hosts</span>
                    </li>
                    <li className="Summary__stat">
                        <span
                            className="Summary__figure"
                            title={monitoredRequestsCount}
                        >
                            {this.renderCount(monitoredRequestsCount)}
                        </span>
                        <span className="Summary__label">
                            Monitored requests
                        </span>
                    </li>
                    <li className="Summary__stat">
                        <span
                            className="Summary__figure"
                            title={maliciousRequestsCount}
                        >
                            {this.renderCount(maliciousRequestsCount)}
                        </span>
                        <span className="Summary__label">
                            Malicious requests
                        </span>
                    </li>
                    <li className="Summary__stat">
                        <span
                            className="Summary__figure"
                            title={attacksBlockedCount}
                        >
                            {this.renderCount(attacksBlockedCount)}
                        </span>
                        <span className="Summary__label">Attacks blocked</span>
                    </li>
                </ul>
            </div>
        );
    }
}

export default Summary;
